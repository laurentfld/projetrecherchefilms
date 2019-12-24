var ajaxRequete = new XMLHttpRequest();
var titre = document.getElementById('titreR'); //récupére le contenu saisie dans le champ 
var key = 'dadf78cb5a9858c438f5c1f7ab08854a'; //clé authentification


var btn = document.getElementById('btnEnvoyer'); // récupère le bouton envoyer
btn.addEventListener('click', function () { // ajoute un événement sur le click du bouton

    //----------------onreadystatechange vérification de bonne réception (totale)

    ajaxRequete.onreadystatechange = function () {
        if (ajaxRequete.readyState === 4 && ajaxRequete.status === 200) { //controle du chargement complet des infos

            //console.log(ajaxRequete.response);
            var films = JSON.parse(ajaxRequete.response); // transforme le fichier reçu JSON en objet
            console.log(films);

            var tabResult = films.results
            console.log(tabResult);
            console.log(tabResult[0].poster_path);

            for (let d = 0; d < tabResult.length; d++) {
                let affiche = tabResult[d].poster_path;
                console.log(affiche);

                // -------------------------------------------- fonction creationCard-------------------------------------------------------
                function creationCard() {
                    var card = document.createElement("article");//crée balise <article>
                    card.className = "flip-card";

                    var section = document.createElement("section");//crée balise <section>
                    section.className = "flip-card-inner";
                    section.style.width = "18rem";
                                     
                    var divDevant = document.createElement("div");//crée balise <div>
                    divDevant.className = "flip-card-front"; 
                    
                    var imgAffiche = document.createElement("img");//crée balise <img>
                    imgAffiche.className = "card-img-top";
                    // imgAffiche.height = "450";
                    imgAffiche.height = "400";
                    if (tabResult[d].poster_path == null) {
                        return null;
                    }
                    imgAffiche.src = "https://image.tmdb.org/t/p/w342/" + tabResult[d].poster_path;

                    var divDerriere = document.createElement("div");//crée balise <div>
                    divDerriere.className = "flip-card-back"; 
                    
                    var titreFilm = document.createElement("h5");//crée balise <h5>
                    titreFilm.className = "card-title";
                    titreFilm.innerText = tabResult[d].title;
                    
                    var synoptis = document.createElement("p");//crée balise <p>
                    synoptis.className = "card-text";
                    if (tabResult[d].overview.length <=0){// si pas de resumé,pas d'affichage
                        card.className ="flip-card-vide";
                    }
                    if (tabResult[d].overview.length >= 550) {
                        synoptis.className += " contenuText";
                    }
                    synoptis.innerText = tabResult[d].overview

                    infosRecu.className = "row";
    
                    divDevant.appendChild(imgAffiche);
                    divDerriere.appendChild(titreFilm);
                    divDerriere.appendChild(synoptis);
                    section.appendChild(divDevant);
                    section.appendChild(divDerriere);
                    card.appendChild (section);
                    infosRecu.appendChild(card);
                }
                creationCard();
            }
        }
    };
    //----------------requête ajax open recherche
    ajaxRequete.open("GET", "https://api.themoviedb.org/3/search/movie?api_key=" + key + "&query=" + titre.value + "&language=fr-FR", true);
    // ajaxRequete.open("GET", "https://api.themoviedb.org/3/search/collection?api_key=" + key + "&language=fr-FR" + "&query=" + titre.value, true);
    //----------------requête ajax send récupère
    ajaxRequete.send();
});



// ajaxRequete.open("GET", "https://api.themoviedb.org/3/search/movie?api_key=" + key + "&query=" + titre.value + "&language=fr-FR", true);
    // ajaxRequete.open("GET", "https://api.themoviedb.org/3/movie/290859?api_key=" + key + "&language=fr-FR", true);
    // ajaxRequete.open("GET", "https://api.themoviedb.org/3/search/collection?api_key=" + key + "&language=fr-FR" + "&query=" + titre.value, true);
