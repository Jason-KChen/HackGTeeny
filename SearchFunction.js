function SearchItem(targetItem) {
    console.log("The item to be searched is " + targetItem)
    var message = {
        "method": "GET",
        "purpose": "Search",
        "givenURL": "https://thepiratebay.org/search/",
        "keyword": targetItem
    }

    chrome.runtime.sendMessage(message, function(response) {
        var resultHTML = $.parseHTML(response.result)
        int score = 0
        //might be only one 1 item
        var array = $(resultHTML).find("tbody").find("tr")

        for (i = 0; i < array.length; i++) {
            var seedCountString = $(array[i]).find("td:eq(2)").getText()
            var leechCountString = $(array[i]).find("td:eq(3)").getText()
            var seedScore = 1.5 * (parseInt(seedCountString)/100.0)
            var leechScore = (parseInt(leechCountString)/100.0)
            score = Math.ceil(seedScore) + Math.ceil(leechScore)
        }
        console.log("The score is " + score)
        updateScore()
    })
}
