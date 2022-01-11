/** Objects from DOM */
const response_list = document.querySelector('#ul-responses')

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

let formResponses = []
let formVotes = []
// Initialise array
for(let i=0;i<objQuestions.length;i++)
    formVotes.push(0);

/** Functions */
function addDummyData() {

    // Create response object
    const new_response = new FormInfo('Neel Patil','Patil','Drift bottles');
    formResponses.push(new_response)

}

function renderResponses() {

    let listObj = { listvotes : ''}
    let listItems = ''
    for(const response of formResponses)
    {
        listItems += `<li>${response.response}</li>`
        listItems += `<li>${response.name}</li>`
        listItems += `<li><br></li>`

        // Sanity check
        console.assert(response.votes.length === objQuestions.length)

        // Update votes
        for(let i=0;i<response.votes.length;i++)
            formVotes[i] += parseInt(response.votes[i]); 
    }

    console.log(formVotes)

    // Add bar graphs based on votes
    for(let i=0;i<objQuestions.length;i++)
    {
        listObj.listvotes += `<li> <p>${objQuestions[i]}</p>`
        addBarGraph(100*(formVotes[i]/formResponses.length),listObj)
        listObj.listvotes += '</li>'
        listItems += `<li><br></li>`
    }

    response_list.innerHTML = listObj.listvotes + `<li><br></li>` + `<li><br></li>` + listItems
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

function addBarGraph(percentage,listObj)
{
    listObj.listvotes += `<div class="bar-container">
                            <div class="skills" style="width:${percentage}%">${percentage}%</div>
                        </div> `
}

/** CODE BEGINS HERE */
//addDummyData()
main().catch(console.log)



