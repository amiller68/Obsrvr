// Create our app
const express = require("express");
const fs = require('fs');
const https = require('https');
const app = express();
app.use(express.json())
const deepai = require('deepai');
const Jimp = require("jimp");
const check = require("check-types");


//The string ID of the thing we want
const DEEP_AI_API = 'neural-style';
// Our Deep AI API key
const DEEP_API_KEY = 'cbb00837-e779-46c5-8ec3-bd1090b832b7'
deepai.setApiKey(DEEP_API_KEY);

const deep_ai_call = async function(style_uri, gen_img_uri) {
    await deepai.callStandardApi(
        DEEP_AI_API,
        {
            style: fs.createReadStream(style_uri),
            content: fs.createReadStream(GEN_IMAGE_URI),
    }).then((response) => {
        console.log("Recieved response from API: ", response);
        let output_url = response.output_url;
        https.get(output_url, (res) => {
          res.pipe(fs.createWriteStream(gen_img_uri)).on('close', () => {
              console.log("Saved new content to disk!")
          })
        })
    });
}

// Get our server's path
const path = require('path');
const dir = path.join(__dirname, 'public');

app.use(express.static(dir));

// Set some environment variables
const args = process.argv.slice(2);
const server_port = Number(args[0]);

const BASE_IMAGE_URI = './collected_data/base.jpg'
const def_GEN_IMAGE_URI = './gen.png'
let GEN_IMAGE_URI = def_GEN_IMAGE_URI


STYLIZER_DIR = './stylizers/'
// A interface to pull stylizer images from our test set
const STYLES = {
    test: 'test.png',
    food: {
        doughnut: 'doughnut.png',
        dumpling: 'dumpling.png',
        hamburger: 'hamburger.png',
        meat_spaghetti: 'meat_spaghetti.png',
        pizza: 'pizza.png',
        ramen_meat: 'ramen_meat.png',
        ramen_vegetable: 'ramen_vegetable.png',
        seafood_spaghetti: 'seafood_spaghetti.png',
        taco: 'taco.png'
    },
    social_media: {
        facebook: 'facebook.png',
        instagram: 'instagram.png',
        snapchat: 'snapchat.png',
        twitter: 'twitter.png',
        uber: 'uber.png',
        uber_eats: 'uber_eats.png'
    }
}

const getStyle = (page_name, style_name) => {
    if (STYLES[page_name][style_name]) return STYLIZER_DIR + page_name + "/" + style_name + '.png'//STYLES[page_name][style_name]
    else return undefined
}



// Takes a URI as input, instantiates a new data subject to render
const NEW_DATA_SUBJECT = (new_base_img_uri) => {
    // When we take base images from the ipad, make sure to download the file
    GEN_IMAGE_URI = def_GEN_IMAGE_URI
    // Copy  our base image to the image we are starting to generate
    fs.copyFile(new_base_img_uri, GEN_IMAGE_URI, (error) => {
        if (error) {
            console.log("Something went wrong copying from our base image...")
            throw error
        }
    })

    return {
        base_img_uri: new_base_img_uri
    };
}

// This tracks who is being observed
let data_subject = {}

const getPageData = (data) => {
    //Data is a list of objects of form { tag: 'var_name', value: 'var_value }
    let data_obj = {}
    data.forEach((element) => {
        if (element.tag) { data_obj[element.tag] = element.value }
    })
    return data_obj
}

// Updates our data obj and returns any updated fields
const handleDataUpdate = (data_obj) => {
    let diff_obj = {}

    //Update our data subject
    for (const [key, value] of Object.entries(data_obj)) {
        if (data_subject[key] !== data_obj[key]) {
            diff_obj[key] = value
        }
        data_subject[key] = value
    }

    return diff_obj
}

const handleRender = async (page_name, diff) => {
    console.log("Rendering!");
    for (const [key, value] of Object.entries(diff)) {
        //True for stylizers
        if (value === true) {
            console.log("Calling deep dream on test...")
            let stylizer = getStyle(page_name, key)
            deep_ai_call(stylizer, GEN_IMAGE_URI).then(() =>
                console.log("A success!")
            )
        }
        else if (check.string(value)) {
            // Reading image
            console.log("reading")
            const image = await Jimp.read(GEN_IMAGE_URI);
            // Defining the text font
            console.log("getting fonts")

            const font = await Jimp.loadFont(Jimp.FONT_SANS_128_BLACK);
            console.log("printing fonts")

            image.print(font, 10, 350, value);
            // Writing image after processing
            console.log("saving img")
            await image.resize(1000, Jimp.AUTO).quality(75);
            await image.writeAsync(GEN_IMAGE_URI);
        }
    }
}


//Register Pages here
const INIT_PAGE = 'init'
const WELCOME_PAGE = 'welcome'
const FOOD_PAGE = 'food'
const SOCIAL_MEDIA_PAGE = 'social_media'
const TEST_PAGE = 'test'
const ERROR_PAGE = 'error'

const handlePageChange =  (page_name, data_obj) => {
    // This page is responsible for collecting base images from subjects
    // This is where we will handle session creation and whatnot
    if (page_name === INIT_PAGE) {
        let _base_img_uri = BASE_IMAGE_URI
        // This will always be false until we implement picture taking
        if (data_obj.base_img_uri) {
            _base_img_uri = data_obj.base_img_uri
        }
        data_subject = NEW_DATA_SUBJECT(_base_img_uri)
        return WELCOME_PAGE
    }
    // Right now, this page collects a data subjects name
    if (page_name === WELCOME_PAGE) {
        return FOOD_PAGE
    }
    if (page_name === FOOD_PAGE) {
        return SOCIAL_MEDIA_PAGE
    }
    if (page_name === SOCIAL_MEDIA_PAGE) {
        return INIT_PAGE
    }
    else if (page_name === ERROR_PAGE) {
        return INIT_PAGE
    }// Log the error
    else {
        console.log("No such page")
        return ERROR_PAGE
    }
}

app.get("/", (req, res) => {
    console.log("Image Request...")
    res.setHeader('Refresh', '5')
    res.setHeader('Content-Type', 'image/png')
    fs.createReadStream(GEN_IMAGE_URI).pipe(res);
});

app.post('/', (req, res) => {
    console.log("Got something: ", req.body);
    let page_name = req.body.page_name
    let data = req.body.data
    let data_obj = getPageData(data)
    //Let's just render on the difference
    let data_diff = handleDataUpdate(data_obj)
    handleRender(page_name, data_diff)

    let response = {
        next_page: handlePageChange(page_name, data_obj)
    }
    console.log("Response: ", response)
    res.json(response);
});


// Listen on all interfaces
app.listen(server_port, '0.0.0.0', () => console.log("Server listening on port", server_port, "!"));
