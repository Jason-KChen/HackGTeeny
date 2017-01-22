function updateScore(score) {
    $(document).find(".number").text(score)

    if (score <= 33) {
        $(document).find(".number").css('color', 'red')
    } else {
        if (score <= 67) {
            $(document).find(".number").css('color', 'white')
        } else {
            $(document).find(".number").css('color', 'blue')
        }
    }
}
