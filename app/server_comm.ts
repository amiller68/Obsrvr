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

export async function server_request(page_name: string, data: Object): Promise<string> {
    try {
        console.log("Submitting Request From: ", page_name)
        console.log("Collected: ", data)

        // Try making a request
        let response = await fetch(server_address, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const response_data = response.json()
        console.log(JSON.stringify(response));
        return 'welcome'

    } catch (err) {
        console.log(err);
        return ERROR_PAGE_ID
    }
}
