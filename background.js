chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("In background page")
    if (request.purpose == "Search") {
        console.log("The purpose is Search")
        var searchURL = request.givenURL + request.keyword
        $.ajax({
            url: searchURL,
            async: true,
            crossDomain: true,
            crossOrigin: true,
            beforeSend: function(xhrObj) {
                xhrObj.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                xhrObj.setRequestHeader("Accept", "application/json")
                xhrObj.setRequestHeader("cache-control", "no-cache")
            },
            type: request.method
        })
        .done(function(data, status, xhr) {
            sendResponse({
                result: data
            })
        })
        .fail(function() {
            console.log("Background page broke")
        })
    }
    return true;
})
