const bookList = document.getElementById('bookList');
// Function to fetch book data from the server
function fetchBooks()
{
  fetch('/books')
    .then(response => response.json())
    .then(data => {
      // Clear existing book cards
      bookList.innerHTML = '';
      bookList.classList.add('book-card-container');

      // Loop through the fetched book data and create book cards
      data.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');

        const image = document.createElement('img');
        var img_path = "../imagenes/" + book.nombre_imagen + ".jpg";
        image.src = img_path;
        image.alt = img_path;

        const title = document.createElement('h3');
        title.textContent = book.Titulo;

        const author = document.createElement('p');
        author.textContent = `Autor: ${book.NombreAutor}`;

        const isbn = document.createElement('p');
        isbn.textContent = `ISBN: ${book.ISBN}`;

        bookCard.appendChild(image);
        bookCard.appendChild(title);
        bookCard.appendChild(author);
        bookCard.appendChild(isbn);
        bookList.appendChild(bookCard);
      });
    })
    .catch(error => {
      console.error('Error fetching book data:', error);
    });
}

// Fetch initial book data on page load
fetchBooks();

