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
    localStorage.setItem("timeCapsule", JSON.stringify(formResponses) )

    // clear the fields
    name_input.value = ''
    email_input.value = ''
    response_input.value = ''

    // display thank you message
    message_output.innerHTML = 'Thank you for using the time capsule!'
    
}

/** CODE BEGINS HERE */

let responsesFromLocalStorage = JSON.parse( localStorage.getItem("timeCapsule") )
if(responsesFromLocalStorage)
{
    console.log(responsesFromLocalStorage)
    formResponses = responsesFromLocalStorage
}
console.log('Size of the response array is :',formResponses.length);

