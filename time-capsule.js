/** Objects from DOM */
const response_list = document.querySelector('#ul-responses')

/** Variables */
class FormInfo {
    constructor(name,email,response) {
        this.name = name;
        this.email = email;
        this.response = response;
    }
}

let formResponses = []

/** Functions */
function addDummyData() {

    // Create response object
    const new_response = new FormInfo('Neel Patil','Patil','Drift bottles');
    formResponses.push(new_response)

}

function renderResponses() {

    let listItems = ''
    for(const response of formResponses)
    {
        listItems += `<li>${response.response}</li>`
        listItems += `<li>${response.name}</li>`
        listItems += `<li><br></li>`
    }

    response_list.innerHTML = listItems
}

const getDataFromJSONbin = async () => {
    const response = await fetch('https://api.jsonbin.io/v3/b/61da19852675917a628cab48/latest',{
        headers: {
            'X-Master-key': '$2b$10$vP8xehgCIvkDiE1XzRLqAeG..q2EPllOys3nZBMw63ypTj5gsSDwO',
            'X-Bin-Meta' : false
        }
    });
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    return myJson
  }

async function main() {
    let responsesFromJSONBin = await getDataFromJSONbin();
    //let responsesFromLocalStorage = JSON.parse( localStorage.getItem("timeCapsule") )
    
    if(responsesFromJSONBin)
    {
        console.log(responsesFromJSONBin)
        formResponses = responsesFromJSONBin
        renderResponses()
    }

    console.log('Size of the response array is :',formResponses.length);
}

/** CODE BEGINS HERE */
//addDummyData()
main().catch(console.log)



