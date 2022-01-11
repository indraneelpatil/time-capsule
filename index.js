/** Objects from DOM */
const send_message_btn = document.querySelector('#send-btn')
const name_input = document.querySelector('#name-input')
const email_input = document.querySelector('#email-input')
const response_input = document.querySelector('#response-input')
const message_output = document.querySelector('#message-prompt')
const obj_prompts_input = document.querySelector('#obj-prompts')

/** Variables */
class FormInfo {
    constructor(name,email,response) {
        this.name = name;
        this.email = email;
        this.response = response;
    }
}

let formResponses = []

const objQuestions = [
    'Robots have replaced humans in any kind of physical manual labour in the workforce',
    'You have atleast one friend who is a robot',
    'You own a tesla bot (or an equivalent humanoid) at home who cooks and cleans for you',
    'You own a fully self driving car (maybe without a steering wheel) and dont remember the last time you actually drove a car',
    'Your brain has a human computer interface which gives you enhanced cognitive capabilities',
    'You have artificially intelligent digital twins who can attend online meetings for you',
    'Robots are allies not enemies',
    'Super soldiers in the defense forces are robots',
    'Amazon delivers packages in 15 mins using robots',
    'Robots play sports and are on TV playing world championships in rugby and football',
    'Nanobots capable of entering the bloodstream to ‘feed’ cells and extract waste will exist. They will make the normal mode of human food consumption obsolete',
    'Sports no longer have human referes',
    'A few of your friends wanted a change and just shifted to mars for a new life'
]

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

function displayObjectivePrompts() {
    
    let listItems = ''
    for(const question of objQuestions)
    {
        listItems += `<li>${question}</li>`
        listItems += `<li><br></li>`
    }

    obj_prompts_input.innerHTML = listItems
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
    displayObjectivePrompts()

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

