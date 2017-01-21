function doSomething() {
    var songName = document.getElementById('song').value;
    var artistName = document.getElementById('artist').value;
    document.getElementById('songTitle').innerHTML = songName + " - " + artistName;

    document.getElementsByClassName('secondPage')[0].style.display = "inline";
    document.getElementsByClassName('firstPage')[0].style.display = "none";

    return false;

}

