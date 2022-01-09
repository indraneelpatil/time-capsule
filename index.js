/** Objects from DOM */
const send_message_btn = document.querySelector('#send-btn')
const name_input = document.querySelector('#name-input')
const email_input = document.querySelector('#email-input')
const response_input = document.querySelector('#response-input')
const message_output = document.querySelector('#message-prompt')

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

function addToArray(new_response){
    
    let duplicateResponse = false
    for (let it=0;it<formResponses.length;it++)
    {
        if(new_response.email === formResponses[it].email)
        {
            formResponses[it] = new_response
            duplicateResponse = true
            break
        }
    }

    if(!duplicateResponse)
        formResponses.push(new_response);

    console.log('Size of the response array is :',formResponses.length);
}

function formSubmit() {

    console.log("Button clicked!")

    
    const name = name_input.value
    const email = email_input.value
    const response = response_input.value
    
    console.log('Received '+name +' '+email+ ' '+response)

    // Create response object
    const new_response = new FormInfo(name,email,response);
    addToArray(new_response)

    // Save array to local storage
    //localStorage.setItem("timeCapsule", JSON.stringify(formResponses) )
    addDataToJSONBin()

    // clear the fields
    name_input.value = ''
    email_input.value = ''
    response_input.value = ''

    // display thank you message
    message_output.innerHTML = 'Thank you for using the time capsule!'
    
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

const addDataToJSONBin = async () => {
    const response = await fetch('https://api.jsonbin.io/v3/b/61da19852675917a628cab48', {
      method: 'PUT',
      body: JSON.stringify(formResponses), // string or object
      headers: {
        'Content-Type': 'application/json',
        'X-Master-key': '$2b$10$vP8xehgCIvkDiE1XzRLqAeG..q2EPllOys3nZBMw63ypTj5gsSDwO'
      }
    });
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    console.log(myJson)
  }

async function main() {
    let responsesFromJSONBin = await getDataFromJSONbin();
    //let responsesFromLocalStorage = JSON.parse( localStorage.getItem("timeCapsule") )
    
    if(responsesFromJSONBin)
    {
        console.log(responsesFromJSONBin)
        formResponses = responsesFromJSONBin
    }

    console.log('Size of the response array is :',formResponses.length);
}


/** CODE BEGINS HERE */
main().catch(console.log)

