function SearchItem(targetItem) {
    console.log("The item to be searched is " + targetItem)
    var message = {
        "method": "GET",
        "purpose": "Search",
        "givenURL": "https://thepiratebay.org/search/",
        "keyword": targetItem
    }
    console.log("Calling chrome api")
    chrome.runtime.sendMessage(message, function(response) {
        var resultHTML = $.parseHTML(response.result)
        var score = 0
        //might be only one 1 item
        var array = $(resultHTML).find("tbody").find("tr")
        console.log(array)
        for (i = 0; i < array.length; i++) {
            var seedCountString = $(array[i]).find("td:eq(2)").text()
            var leechCountString = $(array[i]).find("td:eq(3)").text()
            var seedScore = 1.5 * (parseInt(seedCountString)/100.0)
            var leechScore = (parseInt(leechCountString)/100.0)
            console.log("The score is " + seedScore + leechScore);
            score = score + Math.ceil(seedScore) + Math.ceil(leechScore)
        }
        console.log("The score is " + score)
        updateScore(score)
    })
}
