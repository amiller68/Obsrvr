const server_address = "https://obsrvr.loca.lt"

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
