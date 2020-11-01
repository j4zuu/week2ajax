'use strict';
const form = document.querySelector('#search-form')
var tiedot = document.getElementById('info');
var hakunappi = document.getElementById('hakunappi');


form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    doFetch();
});


const doFetch = async () => {
    clearcontent();
    const response = await fetch('http://api.tvmaze.com/search/shows?q=' + document.getElementById('hakuteksti').value);
    const data = await response.json();
    renderHTML(data);
};

function renderHTML(data) {
    var i;
    for (i = 0; typeof (data[i]) != "undefined"; i++) {
        var htmlString =
            '<ul>' +
            '<li>' + 'Nimi: ' + data[i].show.name + '</li>' +
            '<li>' + 'Kotisivut: ' + '<a href="' + data[i].show.officialSite + '"target="_blank">' + data[i].show.officialSite + '</a>' + '</li>' +
            '<li>' + 'Yhteenveto: ' + data[i].show.summary + '</li>';
        try {
            htmlString = htmlString + '<img src=" ' + data[i].show.image.medium + '">'
        } catch (e) {
        }
        if (typeof (data[i].show.genres[0]) != 'undefined') {
            htmlString = htmlString + '<li>' + 'Genre: ';
            var j;
            for (j = 0; typeof (data[i].show.genres[j]) != 'undefined'; j++) {
                var gen = data[i].show.genres[j];
                htmlString = htmlString + gen;
                htmlString = htmlString + ', ';
            }
            htmlString = htmlString.slice(0, -2);
            htmlString = htmlString + '</li>';
        }
        htmlString = htmlString + '</ul>';

        tiedot.insertAdjacentHTML("beforeend", htmlString)
    }
}

function clearcontent() {
    document.getElementById('info').innerHTML = "";
}