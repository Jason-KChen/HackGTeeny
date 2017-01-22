function setup() {
    var message = {
        "method": "GET",
        "purpose": "top25",
        "givenURL": "https://thepiratebay.org/top/101"
    }

    chrome.runtime.sendMessage(message, function(response) {
        console.log(response.result)
    })
}

function updateTable() {

}

$(document).ready(setup())
