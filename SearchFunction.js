function SearchItem(songName, artistName) {
    console.log("The item to be searched is " + songName + " " + artistName)
    var message = {
        "method": "GET",
        "purpose": "Search",
        "givenURL": "https://thepiratebay.org/search/",
        "keyword1": songName,
        "keyword2": artistName
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

        var message = {
            "method": "GET",
            "purpose": "Date",
            "givenURL": "https://musicbrainz.org/search?query=HERE&type=release&method=indexed",
            "keyword1": response.key1,
            "keyword2": response.key2,
            "score": score
        }
        console.log("Get Month")
        chrome.runtime.sendMessage(message, function(response) {
            console.log(1);
            var resultHTML = $.parseHTML(response.result)
            var targetArtist = response.artistName.toLowerCase()
            console.log(targetArtist)
            var array = $(resultHTML).find(".tbl").find("tbody").find("tr")
            console.log(array)
            var date = ""
            var index = 0
            for (index = 0; index < array.length; index++) {
                if ($(array[index]).find("td:eq(2)").text().toLowerCase() == targetArtist) {
                    date = date + $(array[index]).find("td:eq(5)").text()
                    console.log("In loop " + $(array[index]).find("td:eq(5)").text())
                    index = array.length + 5
                }
            }

            if (index == array.length) {
                console.log(5)
                updateScore(score)
            } else {
                console.log(2);
                console.log(date);
                console.log("Divider");
                var todayDate = new Date()
                var oldDate = new Date(date)
                var diffDate =  Math.floor((todayDate - oldDate) * 3.8052e-10)
                console.log(diffDate)
                updateScore(Math.ceil(score * (Math.log(diffDate) / Math.log(12)) * 100 / 60))
                console.log(3);
            }
        })
    })
}
