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
    const new_response = new FormInfo('Neel Patil','Patil','Hi there');
    formResponses.push(new_response)
    formResponses.push(new_response)
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

/** CODE BEGINS HERE */
//addDummyData()
let responsesFromLocalStorage = JSON.parse( localStorage.getItem("timeCapsule") )
if(responsesFromLocalStorage)
{
    console.log(responsesFromLocalStorage)
    formResponses = responsesFromLocalStorage
    renderResponses()
}
console.log('Size of the response array is :',formResponses.length);

