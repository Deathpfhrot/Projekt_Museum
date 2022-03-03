var images = ['https://www.artic.edu/iiif/2/1adf2696-8489-499b-cad2-821d7fde4b33/full/843,/0/default.jpg', 'https://www.artic.edu/iiif/2/25c31d8d-21a4-9ea1-1d73-6a2eca4dda7e/full/843,/0/default.jpg', 'https://www.artic.edu/iiif/2/c995765d-84d0-3ea9-be25-9700852b51a5/full/843,/0/default.jpg', 'https://www.artic.edu/iiif/2/61d45e6c-3a89-4c1d-e1a1-7b19af9ba558/full/843,/0/default.jpg', 'https://www.artic.edu/iiif/2/f9932dea-7999-ea96-fcab-965e027051c2/full/843,/0/default.jpg'];




var img = document.querySelector('header');
var index = 0;
var iterations = 0;

// var updateImage = function() {
//     if (index >= images.length) {
//         console.log(index);
//         clearInterval(interval);
//     }
//     console.log('hi');
//     img.style.backgroundImage = 'url(' + images[index] + ')';

//     index++;

//     // if (iterations >= 4) {
//     //     clearInterval(interval);
//     // } else {
//     //     /* increment current index in order to get next image
//     //      * when this function gets called again.
//     //      */
//     //     index++;
//     // }
// }
var updateImage = function () {

    if (index >= images.length) {
        index = 0;
        iterations++;
    }

    img.style.backgroundImage = 'url(' + images[index] + ')';

    if (iterations >= 20) {
        clearInterval(interval);
    } else {
        index++;
    }
}

updateImage();


var interval = setInterval(updateImage, 15000);

fetch('https://api.artic.edu/api/v1/artworks?ids')
    .then(response => response.json())
    .then(json => console.log(json))



//---------CodingFrank-------JS

// ------------------- Daten für die erste Seite ----------------------------------------
let section = document.createElement('section');
document.body.childNodes[3].appendChild(section)

let artWorkId;
let artistId;

fetch(`https://api.artic.edu/api/v1/artists`)
    .then(response => response.json())
    .then(json => {
        json.data.forEach(e => {
            console.log("KünstlerId: " + e.id);
            console.log("Künstler-Name: " + e.title);
            console.log("Erstes Bild - ArtworkId: " + e.artwork_ids[0]);
            artistId = e.id;
            artWorkId = e.artwork_ids[0];
            console.log(artWorkId);

            fetch(`https://api.artic.edu/api/v1/artworks/${artWorkId}?fields=image_id`)
                .then(response => response.json())
                .then(json => {
                    if (json.data.image_id != null) {
                        section.innerHTML += `
                        <article>
                            <h1>Künstler Name: ${e.title}</h1>
                            <p>Künstler ID: ${e.id}</p>
                            <img id="${e.artwork_ids[0]}" src="https://www.artic.edu/iiif/2/${json.data.image_id}/full/843,/0/default.jpg" alt=""></img>
                        </article>`
                        // ---------- Backup -----------------
                        // let b = document.querySelectorAll('button');
                        // b.forEach(btn => btn.addEventListener('click', (e) => {

                        //     console.log(e.target.id);
                        //     window.location.pathname = `ebene2.html/${e.target.id}`

                        //     window.open(`https://www.artic.edu/artworks/${e.target.id}`);

                        // }));
                        // ------------------------------------
                        let b = document.querySelectorAll('img');
                        b.forEach(btn => btn.addEventListener('click', (e) => {

                            let artwId = e.target.id;
                            console.log(e.target.id);
                            console.log(typeof (artwId));


                            window.location.href = `assets/pages/artwork_detail.html?q=${artwId}`

                            // let t = encodeURIComponent(`assets/pages/artwork_detail.html?q=${artwId}`)
                            // console.log(t);
                            // window.location.pathname = t;


                            // http://127.0.0.1:5500

                            // window.location.pathname = `assets/pages/artwork_detail.html/${e.target.id}`
                            // window.open(`https://www.artic.edu/artworks/${e.target.id}`);

                        }));



                    }

                });
        });
    });


//--------------------------- Neue zweite Seite ----------------------------

//Wenn Button Details gedrückt wird, muss die artWorkId an Fetch übertragen werden, eine neue Seite erstellen.

// let b = document.querySelectorAll('button');
// b.forEach(btn => btn.addEventListener('click', (e) => {

//     console.log(e.target);
// }));

// let btn = document.getElementById(`${e.artwork_ids[0]}`);

// btn.addEventListener('click', () => {

//     console.log("hallo");

// })




//---------------------- Daten für die zweite Seite --------------------------------------
// Liefert alle artwork_ids für den ausgewählten Künstler abhängig von der KünstlerID
// Don A. DuBroff
// let kuenstlerId = 30979;

// let newArtist = artists.data.filter(e => e.id == kuenstlerId)

// console.log(newArtist[0].artwork_ids);

// let newArrArtworkIds = newArtist[0].artwork_ids.slice(0,4);
// console.log(newArrArtworkIds);

// newArtist[0].artwork_ids.forEach(f => {
//     console.log(f);


//     fetch(`https://api.artic.edu/api/v1/artworks/${f}?fields=image_id,title,id`)
//             .then(response => response.json())
//             .then(json => { 
//                 if (json.data.image_id != null) {
//                     console.log(json.data.image_id);
//                     section.innerHTML += `
//                         <article>
//                             <h1>Künstler Name: ${json.data.title}</h1>
//                             <p>Künstler ID: ${json.data.id}</p>
//                             <img src="https://www.artic.edu/iiif/2/${json.data.image_id}/full/843,/0/default.jpg" alt=""></img>
//                         </article>`
//                 }
//             });

// });


// -----------------------------------------------------------------------------------------------