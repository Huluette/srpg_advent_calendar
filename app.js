document.addEventListener('DOMContentLoaded', () => {
  
  // créer les éléments HTML pour le header
  const header = document.querySelector('.header-container');
  
  // Créer l'image du logo
  const img = document.createElement('img');
  img.src = '/img/shuriken.png';
  
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
      // Créer les éléments HTML pour chaque objet JSON
      data.cases.forEach(caseItem => {
        // Créer le div principal
        const div = document.createElement('div');
        div.id = caseItem.id;
        div.className = 'box';
        div.setAttribute('type', caseItem.image.split('.').pop());
        div.setAttribute('href', caseItem.image);

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