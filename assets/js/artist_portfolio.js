
let section = document.createElement('section');
document.body.childNodes[1].appendChild(section)


window.onload = function () {

    let url = window.location.href
    console.log(url);
    let urlS = url.split("q=")
    console.log(urlS);
    let res = urlS[1]
    console.log(res);

    getAllImageIds(res)
}


function getAllImageIds(artistId) {

    fetch(`https://api.artic.edu/api/v1/artists/${artistId}?fields=title,birth_date,death_date,description,artwork_ids`)
        .then(response => response.json())
        .then(json => {
            console.log(json.data.artwork_ids);

            for (let i = 0; i < json.data.artwork_ids.length; i++) {
                fetch(`https://api.artic.edu/api/v1/artworks/${json.data.artwork_ids[i]}?fields=image_id,title,date_start,id`)
                    .then(response => response.json())
                    .then(json => {
                        if (json.data.image_id != null) {
                            section.innerHTML += `
                                 <article>
                                    <img id="${json.data.id}" src="https://www.artic.edu/iiif/2/${json.data.image_id}/full/843,/0/default.jpg" alt=""></img>
                                    <h2>${json.data.title} (${json.data.date_start})</h2> 
                                 </article>
                                <div><img src="../assets/img/sun-g63e0398ce_1280.png" alt="sales sticker"></div>`

                            // Durch klick auf Bild wir die Artist-ID ermittelt und diese dann an die Seite Artwork-Portfolio übergeben.
                            let b = document.querySelectorAll('img');
                            b.forEach(btn => btn.addEventListener('click', (e) => {

                                // window.location.href = `artwork_detail.html?q=${e.target.id}`

                                window.open(`artwork_detail.html?q=${e.target.id}`, '_blank')

                            }));
                        }
                    });
            }
        });
};


