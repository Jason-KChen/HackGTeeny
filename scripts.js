function doSomething() {
    var songName = document.getElementById('song').value;
    var artistName = document.getElementById('artist').value;
    document.getElementById('songTitle').innerHTML = songName;
    document.getElementById('artistName').innerHTML = artistName;

    document.getElementsByClassName('secondPage')[0].style.display = "inline";
    document.getElementsByClassName('firstPage')[0].style.display = "none";
    console.log('clicked');

    var p = songName + " " + artistName;
    SearchItem(p);
}

window.onload = function() {
    console.log("loaded");
    document.getElementById("enter").addEventListener('click', doSomething);
}
