// Charger les données du fichier JSON
fetch('./json/books.json')
  .then(response => response.json())
  .then(data => {
    displayBooks(data); // Fonction pour afficher les livres
    displayBookCount(data.length); // Afficher le nombre de livres
    displayPagesRead(data); // Afficher le nombre total de pages lues
  })
  .catch(error => console.log('Erreur lors du chargement des livres:', error));

// Fonction pour afficher les livres dans le DOM
function displayBooks(books) {
  const bookList = document.getElementById('book-list');
  bookList.innerHTML = ''; // Réinitialiser la liste

  books.forEach(book => {
    // Créer l'élément principal pour chaque livre
    const rrElement = document.createElement('div');
    rrElement.classList.add('rr');

    // Appliquer l'image en background de la div .rr
    rrElement.style.backgroundImage = `url(${book.image})`;

    // Ajouter les informations du livre
    const bookInfo = document.createElement('div');
    bookInfo.innerHTML = `
      <h3>${book.title} - ${book.author}</h3>
      <h4>${book.readPages}/${book.pages}</h4>
    `;

    rrElement.appendChild(bookInfo);
    bookList.appendChild(rrElement);
  });
}

// Fonction pour afficher le nombre de livres
function displayBookCount(count) {
  const bookCount = document.getElementById('book-count');
  bookCount.innerHTML = `<h3>${count} livre${count !== 1 ? 's' : ''} dans la bibliothèque</h3>`;
}

// Fonction pour afficher le nombre total de pages lues
function displayPagesRead(books) {
  const totalPagesRead = books.reduce((total, book) => total + book.readPages, 0);
  const pagesReadElement = document.getElementById('pages-read');
  pagesReadElement.innerHTML = `<h3>${totalPagesRead} pages lues au total</h3>`;
}
