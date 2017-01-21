function SearchItem(targetItem) {
    console.log("The item to be searched is " + targetItem)
    var message = {
        "method": "GET",
        "purpose": "Search",
        "givenURL": "https://thepiratebay.org/search/"
    }

    chrome.runtime.sendMessage(message, function(response) {
        
    })
}
