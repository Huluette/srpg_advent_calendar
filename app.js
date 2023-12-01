document.addEventListener('DOMContentLoaded', () => {

  // // Réinitialiser les objets spécifiques du localStorage pour les marquer comme non ouverts
  // localStorage.removeItem('box_1');
  // localStorage.removeItem('box_2');
  const currentDate = new Date(); // Date actuelle

  // créer les éléments HTML pour le header
  const header = document.querySelector('.header-container');
  // Créer l'image du logo
  const img = document.createElement('img');
  img.src = './img/shuriken.png';
  // Créer le titre
  const h1 = document.createElement('h1');
  h1.textContent = 'SRPG Calendrier de l\'Avent';
  // Ajouter l'image et le titre au header
  header.appendChild(img);
  header.appendChild(h1);

  // créer les éléments HTML pour le footer
  const footer = document.querySelector('.footer-container');
  // Créer le titre
  const h2 = document.createElement('h2');
  h2.textContent = 'Joyeux noël aux Shinobi et Kunoichi !';
  // Ajouter le titre au footer
  footer.appendChild(h2);

  // Charger le fichier JSON
  fetch('objet.json')
    .then(response => response.json())
    .then(data => {
      data.cases.forEach(caseItem => {
        const div = document.createElement('div');
        div.id = caseItem.id;
        div.className = 'box';
        div.setAttribute('type', caseItem.image.split('.').pop());
        div.setAttribute('href', caseItem.image);

        // Convertir la chaîne de date en objet Date pour la comparaison
        const caseDate = new Date(caseItem.date); // Supposons que chaque case contient une propriété 'date'

       
        // Récupérer l'état actuel de la case depuis le localStorage
        const isOpen = localStorage.getItem(`box_${caseItem.id}`) === 'opened';

        // Fonction pour gérer le clic sur le div
        const handleClick = () => {
          // Vérifier si la case est disponible en fonction de la date
          if (currentDate >= caseDate || isOpen) {
            const clickedDiv = document.getElementById(caseItem.id);
            if (!clickedDiv.classList.contains('opened')) {
              clickedDiv.classList.add('box_opened');
              clickedDiv.textContent = caseItem.message; // Afficher le message spécifique à la case
              
              // Marquer la boîte comme ouverte
              clickedDiv.classList.add('opened');
          
              // Enregistrer l'état de la case dans le localStorage
              localStorage.setItem(`box_${caseItem.id}`, 'opened');
            }

            // Retirer l'écouteur d'événements pour empêcher d'autres clics
            clickedDiv.removeEventListener('click', handleClick);
          } else {
            // Afficher une fenêtre modale indiquant que la case n'est pas encore disponible
            const options = { year: 'numeric', month: 'long', day: '2-digit' };
            const formattedDate = caseDate.toLocaleDateString('fr-FR', options);

            Swal.fire({
              title: 'Cette case n\'est pas encore disponible!',
              html: `<img src="./noel/gif_say_no.gif" width="400" height="200"><br>Jusqu'au ${formattedDate} !`,
              confirmButtonText: 'OK'
            });
          }
        };

        // Ajouter un gestionnaire d'événements de clic au div
        div.addEventListener('click', handleClick);

        // Créer l'élément image à l'intérieur du div
        const img = document.createElement('img');
        img.src = caseItem.image;
        // Appliquer des styles CSS à l'image
        img.classList.add('style-img');

        // Créer le paragraphe à l'intérieur du div
        const p = document.createElement('p');
        p.textContent = caseItem.number;

        // Ajouter le paragraphe au div
        div.appendChild(p);

        // Ajouter l'image au div
        div.appendChild(img);

        // Récupérer l'élément <div> existant dans le HTML
        const calendarContainer = document.querySelector('.calendar-container');

        // Ajouter le div à l'intérieur de l'élément <div> existant
        calendarContainer.appendChild(div);
      });
    })
    .catch(error => {
      console.error('Erreur lors du chargement du fichier JSON:', error);
    });
});
