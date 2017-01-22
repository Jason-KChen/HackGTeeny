function setup() {
    var message = {
        "method": "GET",
        "purpose": "top25",
        "givenURL": "https://thepiratebay.org/top/101"
    }

    chrome.runtime.sendMessage(message, function(response) {
        //console.log(response.result)
        var array = top25(response.result)

        for (i = 0; i < array.length; i++) {
            array[i] = array[i].trim();
        }
        //console.log(array)
        updateTable(array)
    })
}

function updateTable(array) {
    var arrayOfDest = $(document).find("tbody").find("td:odd")
    //var arrayOfDest = $(document).find("tbody").find("tr")
    for (i = 0; i < arrayOfDest.length; i++) {
        $(arrayOfDest[i]).text(array[i])
    }
    console.log(array.length - arrayOfDest.length)
}

$(document).ready(setup())
