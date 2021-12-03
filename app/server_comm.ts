const server_address = "https://obsrvr.loca.lt/"

export async function test_request() {
    try {
        console.log("testing: ", server_address)
        let response = await fetch( server_address);
        console.log("TestID5")
        console.log(JSON.stringify(response));
    } catch (err) {
        console.log(err);
    }
}
