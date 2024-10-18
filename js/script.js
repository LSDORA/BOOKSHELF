let books = []; // Variable globale pour stocker les livres

// Charger les données du fichier JSON
fetch('./json/books.json')
  .then(response => response.json())
  .then(data => {
    books = data; // Stocker les livres dans la variable globale
    displayBooks(books); // Afficher les livres
    updateBookCount(books); // Mettre à jour le nombre de livres et pages lues
  })
  .catch(error => console.log('Erreur lors du chargement des livres:', error));

// Fonction pour afficher les livres dans le DOM
function displayBooks(filteredBooks) {
  const bookList = document.getElementById('book-list');
  bookList.innerHTML = ''; // Réinitialiser la liste

  filteredBooks.forEach(book => {
    const rrElement = document.createElement('div');
    rrElement.classList.add('rr');
    rrElement.style.backgroundImage = `url(${book.image})`;

    const bookInfo = document.createElement('div');
    bookInfo.innerHTML = `
      <h3>${book.title} - ${book.author}</h3>
      <h4>${book.readPages}/${book.pages}</h4>
    `;

    rrElement.appendChild(bookInfo);
    bookList.appendChild(rrElement);
  });

  updateBookCount(filteredBooks); // Mettre à jour le nombre de livres et pages lues
}

// Fonction pour mettre à jour le nombre de livres et pages lues
function updateBookCount(filteredBooks) {
  const bookCountElement = document.getElementById('book-count');
  const pagesReadElement = document.getElementById('pages-read');
  
  // Calculer le nombre de livres
  const bookCount = filteredBooks.length;
  bookCountElement.textContent = `${bookCount} livre(s) dans la bibliothèque`;

  // Calculer le nombre total de pages lues
  const totalPagesRead = filteredBooks.reduce((total, book) => total + book.readPages, 0);
  pagesReadElement.textContent = `Total de pages lues : ${totalPagesRead}`;
}

// Fonction pour filtrer les livres selon la recherche par titre ou auteur
function filterByTitleOrAuthor(books, searchTerm) {
  return books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

// Fonction pour filtrer les livres commencés
function filterStartedBooks(books) {
  return books.filter(book => book.readPages > 0);
}

// Gestion des événements pour les filtres
document.getElementById('search-button').addEventListener('click', () => {
  const searchTerm = document.getElementById('search-input').value;
  const showStartedOnly = document.getElementById('started-books-checkbox').checked;
  let filteredBooks = books;

  // Appliquer la recherche par titre ou auteur
  if (searchTerm) {
    filteredBooks = filterByTitleOrAuthor(filteredBooks, searchTerm);
  }

  // Filtrer par les livres commencés
  if (showStartedOnly) {
    filteredBooks = filterStartedBooks(filteredBooks);
  }

  displayBooks(filteredBooks); // Mettre à jour l'affichage
});
