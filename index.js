/** Objects from DOM */
const send_message_btn = document.querySelector('#send-btn')
const name_input = document.querySelector('#name-input')
const email_input = document.querySelector('#email-input')
const response_input = document.querySelector('#response-input')
const message_output = document.querySelector('#message-prompt')
const message_output_1 = document.querySelector('#msg-op-1')
const message_output_2 = document.querySelector('#msg-op-2')
const obj_prompts_input = document.querySelector('#obj-prompts')

/** Variables */
class FormInfo {
    constructor(name,email,response,votes) {
        this.name = name;
        this.email = email;
        this.response = response;
        this.votes = votes;
    }
}


const objQuestions = [
    'Artificial General Intelligence is a reality',
    'Robots can do any kind of physical manual labour in the workforce',
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
    'A few of your friends wanted a change and just shifted to mars for a new life'
]

let formResponses = []

const delayInMilliseconds = 3000; //3 second

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
        formResponses.unshift(new_response);

    console.log('Size of the response array is :',formResponses.length);
}

function formSubmit() {

    console.log("Button clicked!")
    main().catch(console.log)
    
}

function displayObjectivePrompts() {
    
    let listObj = { listItems : ''}
    let radio_it = 1
    for(let i=0;i<objQuestions.length;i++)
    {
        listObj.listItems += `<li>${objQuestions[i]}`
        addRadioButton(`question_${i}`,`radio_${radio_it}`,`radio_${radio_it+1}`,listObj)
        listObj.listItems += '</li>'
        listObj.listItems += `<li><br></li>`
        radio_it += 2
    }

    obj_prompts_input.innerHTML = listObj.listItems
}

function addRadioButton(ques_label,radio_label_1,radio_label_2,listObj) {

    listObj.listItems += `<div class="question">
                            <div class="question-answer">
                                <input type="radio" value="1" id="${radio_label_1}" name="${ques_label}" required/>
                                <label for="${radio_label_1}" class="radio"><span>Yes</span></label>
                                <input type="radio" value="0" id="${radio_label_2}" name="${ques_label}" required/>
                                <label for="${radio_label_2}" class="radio"><span>No</span></label>
                            </div>
                        </div>`
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

    const name = name_input.value
    const email = email_input.value
    const response = response_input.value

    if(!(name && email))
    {
        console.log('Name or email empty aborting!')
        return;
    }

    let responsesFromJSONBin = await getDataFromJSONbin();
    //let responsesFromLocalStorage = JSON.parse( localStorage.getItem("timeCapsule") )
    
    if(responsesFromJSONBin)
    {
        console.log(responsesFromJSONBin)
        formResponses = responsesFromJSONBin
    

        console.log('Size of the response array is :',formResponses.length);

        // Get all objective responses
        let formVotes = []
        for(let i=0;i<objQuestions.length;i++)
        {
            formVotes.push(document.querySelector(`input[name="question_${i}"]:checked`).value)
        }
        
        console.log('Received '+name +' '+email+ ' '+response+ ' '+formVotes)

        // Create response object
        const new_response = new FormInfo(name,email,response,formVotes);
        addToArray(new_response)

        // Save array to db
        //localStorage.setItem("timeCapsule", JSON.stringify(formResponses) )
        addDataToJSONBin()

        // clear the fields
        name_input.value = ''
        email_input.value = ''
        response_input.value = ''

        // display thank you message
        message_output.innerHTML = 'Thank you for using the time capsule!'
        message_output_1.innerHTML = 'Objective Predictions submitted!'
        message_output_2.innerHTML = 'Subjective Predictions submitted!'
        send_message_btn.innerHTML = 'SUBMITTED!'
        
        // Redirect to time capsule because why not
        setTimeout(function() {
            //your code to be executed after 3 second
            window.location.href = "time-capsule.html"
        }, delayInMilliseconds);
    }
    else
        alert('Could not connect to DB, please try again?')
}


/** CODE BEGINS HERE */
displayObjectivePrompts()

