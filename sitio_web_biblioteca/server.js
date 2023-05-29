const express = require('express');
const path = require('path');
const session = require('express-session');
const mysql = require('mysql');
const dotenv = require('dotenv');
const db = require("./database/connection.js");

dotenv.config();

const app = express();
const port = 3000; // Change this to the desired port number

// Serve static files//
app.use(express.static(path.join(__dirname, 'html')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/imagenes', express.static(path.join(__dirname, 'imagenes')));
app.use(session({ secret: process.env.SESSION_SECRET,resave: false,
    saveUninitialized: true}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get('/', (req, res) =>
{
  res.sendFile(path.join(__dirname, 'html', 'index.html'));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ error: 'Invalid username or password' });
        return;
    }

    // Validate username and password against the database
    const query = 'SELECT * FROM Usuarios WHERE NombreUsuario = ? AND           Contrasena= ?';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error executing database query:', err);
            res.status(500).json({ error: 'An error occurred' });
            return;
        }

        if (results.length === 0) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        // Store user information in the session
        req.session.user = results[0];
        res.sendFile(path.join(__dirname , 'html', 'landing.html'));
    });
});

app.get('/books', (req, res) => {
  const query = 'SELECT lb.*,aut.NombreAutor FROM Libros lb, Autores aut WHERE lb.AutorID = aut.IDAutor';
  db.query(query, (err, results) => 
  {
    if (err) {
      console.error('Error executing database query:', err);
      res.status(500).json({ error: 'An error occurred' });
      return;
    }
    res.json(results);
  });
});


app.get('/subir',(req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'altas.html'));
})

app.post('/subir', (req, res) => {
  const { titulo, autor, isbn, fecha, editorial, genero, descripcion } = req.body;

  const sql = `INSERT INTO Libros (Titulo, AutorID, ISBN, FechaPublicacion, EditorialID, Genero, Descripcion, nombre_imagen)
               VALUES (?, ?, ?, ?, ?, ?, ?, REPLACE(?, ' ', '_'))`;

  db.query(sql, [titulo, autor, isbn, fecha, editorial, genero, descripcion, titulo], (error, results) => {
    if (error) {
      console.error('Error inserting data:', error);
      res.status(500).send('Error inserting data');
    } else {
        res.sendFile(path.join(__dirname , 'html', 'landing.html'));
    }
  });
});

app.get('/borrar',(req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'bajas.html'));
})

app.post('/borrar', (req, res) => {
  const { titulo } = req.body;

  const sql = `DELETE FROM Libros WHERE Titulo = '${titulo}'`;

  db.query(sql, (error, results) => {
    if (error) {
      alert('Error deleting data:');
      res.sendFile(path.join(__dirname, 'html', 'bajas.html'));
    } else {
      res.sendFile(path.join(__dirname , 'html', 'landing.html'));
    }
  });
});

app.get('/books2', (req, res) => {
  const { titulo } = req.query;
  let query = 'SELECT Titulo FROM Libros WHERE ' + `Titulo = '${titulo}'`;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing database query:', err);
      res.status(500).json({ error: 'An error occurred' });
      return;
    }
    res.json(results);
  });
});



app.get('/modificar', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'modificacion.html'));
});

app.post('/modificar', (req, res) => {
  const { titulo } = req.body;
  const query = 'SELECT * FROM Libros WHERE Titulo = ?';

  db.query(query, [titulo], (err, results) => {
    if (err) {
      console.error('Error executing database query:', err);
      res.status(500).json({ error: 'An error occurred' });
      return;
    }

    // Redirect to /modificar2 with the query results as query parameters
    res.redirect(`/modificar2?titulo=${encodeURIComponent(titulo)}&results=${encodeURIComponent(JSON.stringify(results))}`);
  });
});

app.get('/modificar2', (req, res) => {
  const { titulo, results } = req.query;
  const parsedResults = JSON.parse(results);

  // Generate the modified HTML content
  let htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Modificar Libro</title>

      <link rel="stylesheet" href="../css/style_landing.css">
      <link rel="stylesheet" href="../css/style_subir.css">
      <link rel="stylesheet" href="../css/style_modificar.css">
    </head>
    <body>
      <h1>Modificar Libro</h1>

      <form id="modificarForm" action="/cambiar" method="POST">
        <div>
          <label for="titulo">Título:</label>
          <input type="text" id="titulo" name="titulo" required value="${parsedResults[0].Titulo}">
        </div>
        <div>
          <label for="autor">Autor ID:</label>
          <input type="text" id="autor" name="autor" required value="${parsedResults[0].AutorID}">
        </div>
        <div>
          <label for="isbn">ISBN:</label>
          <input type="text" id="isbn" name="isbn" required value="${parsedResults[0].ISBN}">
        </div>
        <div>
          <label for="fecha">Fecha de Publicación:</label>
          <input type="date" id="fecha" name="fecha" required value="${parsedResults[0].FechaPublicacion}">
        </div>
        <div>
          <label for="editorial">Editorial ID:</label>
          <input type="text" id="editorial" name="editorial" required value="${parsedResults[0].EditorialID}">
        </div>
        <div>
          <label for="genero">Género:</label>
          <input type="text" id="genero" name="genero" required value="${parsedResults[0].Genero}">
        </div>
        <div>
          <label for="descripcion">Descripción:</label>
          <textarea id="descripcion" name="descripcion" required>${parsedResults[0].Descripcion}</textarea>
        </div>
        <div>
          <label for="id">ID Libro:</label>
          <input type="number" id="idLibro" name="idLibro" readonly value="${parsedResults[0].IDLibro}">
        </div>
        <button type="submit" action="/cambiar" method="POST" >Modificar Libro</button>
      </form>
    </body>
    </html>`;

  // Send the modified HTML content as the response
  res.send(htmlContent);
});

app.post('/cambiar', (req, res) => {
	const {titulo, autor, isbn, fecha, editorial, genero, descripcion, idLibro} = req.body;
	const sql = `UPDATE Libros
		       SET Titulo = ?, AutorID = ?, ISBN = ?, FechaPublicacion = ?,
				   EditorialID = ?, Genero = ?, Descripcion = ?
			       WHERE IDLibro = ?`;

	db.query(sql, [titulo, autor, isbn, fecha, editorial, genero, descripcion, idLibro], (error, results) => {
		if (error) {
			console.error('Error updating data:', error);
			res.status(500).send('Error updating data');
		} else {
			res.sendFile(path.join(__dirname, 'html', 'landing.html'));
			console.log("Actualicé los campos: " + titulo + autor + isbn + fecha + editorial + genero + descripcion + idLibro);
		}
	});
});




app.listen(port, () =>
{
  console.log(`Server running on port ${port}`);
});
