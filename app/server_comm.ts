const server_address = "https://obsrvr.loca.lt/"

export const ERROR_PAGE_ID = 'error'

export async function test_request() {
    try {
        console.log("testing: ", server_address)
        let response = await fetch( server_address);
        console.log("TestID6")
        console.log(JSON.stringify(response));
    } catch (err) {
        console.log(err);
    }
}

export async function init_server_request(photo: any) {
    // ImagePicker saves the taken photo to disk and returns a local URI to it
    let localUri: string = photo.uri;
    let filename: any = localUri.split('/').pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    // Upload the image using the fetch and FormData APIs
    let formData = new FormData();
    // Assume "photo" is the name of the form field the server expects
    //@ts-ignore
    formData.append('photo', { uri: localUri, name: filename, type });
    let next_page = ERROR_PAGE_ID
    try {
        await fetch(server_address + 'init/', {
            method: 'POST',
            body: formData,
            headers: {
                'content-type': 'multipart/form-data',
            },
        }).then(
            (response) =>
                response.json()
        ).then((responseData) =>
            next_page = responseData.next_page
        );
        return next_page
    } catch (err) {
        console.log(err);
        return ERROR_PAGE_ID
    }
}

export async function server_request(page_name: string, data: any): Promise<string> {
    try {

        console.log("Submitting Request From: ", page_name)
        console.log("Collected data: ", data)

        // Try making a request
        let next_page = 'error'
        await fetch(server_address, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                page_name: page_name,
                data: data
            })
        }).then(
            (response) =>
                response.json()
        ).then((responseData) =>
            next_page = responseData.next_page
        );
        return next_page;
    } catch (err) {
        console.log(err);
        return ERROR_PAGE_ID
    }
}
