(function () {
    console.log("rest API")
    // URL de l'API REST de WordPress
    let numero_categorie = 3;
  
    //let url = `https://gftnth00.mywhc.ca/tim16/wp-json/wp/v2/posts?categories=${numero_categorie}`;
    let lien__categorie = document.querySelectorAll('.lien__categorie')
    console.log(" lien__categorie " + lien__categorie.lenght);
    for (const elm of lien__categorie) {
        console.log(elm.id);
        elm.addEventListener("mousedown", function() {
            const id =elm.id.split("_")[1];
            console.log(id);
            let url = `https://gftnth00.mywhc.ca/tim16/wp-json/wp/v2/posts?categories=${id}`;
            mon_fetch(url)
        })
    }
  
    // Effectuer la requête HTTP en utilisant fetch()
    function mon_fetch(url){
    fetch(url)
      .then(function (response) {
        // Vérifier si la réponse est OK (statut HTTP 200)
        if (!response.ok) {
          throw new Error(
            "La requête a échoué avec le statut " + response.status
          );
        }
  
        // Analyser la réponse JSON
        return response.json();
        console.log(response.json());
      })
      .then(function (data) {
        // La variable "data" contient la réponse JSON
        console.log(data);
        let restapi = document.querySelector(".contenu__restapi");
        // Maintenant, vous pouvez traiter les données comme vous le souhaitez
        // Par exemple, extraire les titres des articles comme dans l'exemple précédent
        restapi.innerHTML = "" 
          data.forEach(function (article) {
          let titre = article.title.rendered;
          let contenu = article.content.rendered;
          // let contenu = article.excerpt.rendered.substring(0, 100);
          console.log(titre);
          let carte = document.createElement("div");
          carte.classList.add("restapi__carte");
              
         carte.innerHTML = `
          <h3 class="global clr-agencement-ternaire">${titre}</h3>
          <p>${contenu}</p>
          `;
         restapi.appendChild(carte);
        });
      })
      .catch(function (error) {
        // Gérer les erreurs
        console.error("Erreur lors de la récupération des données :", error);
      });

    }
  })();