

function Werteliste(querystring) {
    console.log(querystring);
    if (querystring == '') return;
    var wertestring = querystring.slice(1);
    var paare = wertestring.split("&");
    var paar, name, wert;
    for (var i = 0; i < paare.length; i++) {
        paar = paare[i].split("=");
        name = paar[0];
        wert = paar[1];
        name = unescape(name).replace("+", " ");
        wert = unescape(wert).replace("+", " ");
        this[name] = wert;
    }
}


function getUrlParam(name) {
    var url_string = window.location;
    var url = new URL(url_string);
    var c = url.searchParams.get("name");
    return c;
}

let section = document.createElement('section');
document.body.appendChild(section)

window.onload = function () {

    console.log("hallo");
    // var liste = new Werteliste(location.search);

    // getUrlParam(window.location.search)

    let url = window.location.href
    console.log(url);
    let urlS = url.split("q=")
    console.log(urlS);
    let res = urlS[1]
    console.log(res);


    fetch(`https://api.artic.edu/api/v1/artworks/${res}?fields=image_id,artist_display,title`)
        .then(response => response.json())
        .then(json => {
            section.innerHTML = `
            <a href="../../index.html">
                <div class="heading">
                    <p>Back<p>
                    <p>to<p>
                    <p>Auction<p>
                </div>
            </a>
            <article>
                <img src="https://www.artic.edu/iiif/2/${json.data.image_id}/full/843,/0/default.jpg" alt=""></img>
                <h1>Künstler Name: ${json.data.title}</h1>
                <p>Künstler ID: ${json.data.artist_display}</p>
            </article>`
        });

}
