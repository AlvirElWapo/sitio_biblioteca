
/*
		INTEGRANTES:
		Alvir Guzmán Andrés
		Carbajal Rebollo Teresa Imelda
		Leon Arias Eduardo David
		Pulido Ambriz Joab Jaaziel



*/

DROP DATABASE BALULIBROS;
CREATE DATABASE IF NOT EXISTS BALULIBROS;
USE BALULIBROS;

CREATE TABLE Autores (
	IDAutor INT PRIMARY KEY AUTO_INCREMENT,
	NombreAutor VARCHAR(25)
);

CREATE TABLE Editoriales (
	IDEditorial INT PRIMARY KEY AUTO_INCREMENT,
	NombreEditorial VARCHAR(35),
	Direccion VARCHAR(125)
);

CREATE TABLE Libros (
	IDLibro INT PRIMARY KEY AUTO_INCREMENT,
	Titulo VARCHAR(50),
	AutorID INT,
	ISBN VARCHAR(20),
	FechaPublicacion DATE,
	EditorialID INT,
	Genero VARCHAR(25),
	Descripcion TEXT,
	nombre_imagen VARCHAR(100), -- New field for image address
	FOREIGN KEY (AutorID) REFERENCES Autores(IDAutor),
	FOREIGN KEY (EditorialID) REFERENCES Editoriales(IDEditorial)
);


CREATE TABLE Usuarios (
	IDUsuario INT PRIMARY KEY,
	Nombre VARCHAR(30),
	Apellido VARCHAR(60),
	Direccion VARCHAR(125),
	Email VARCHAR(100) UNIQUE,
	Telefono VARCHAR(13),
	NombreUsuario VARCHAR(16) UNIQUE,
	Contrasena VARCHAR(18)
);

CREATE TABLE Prestamos (
	IDPrestamo INT PRIMARY KEY,
	IDUsuario INT,
	IDLibro INT,
	FechaPrestamo DATE,
	FechaDevolucion DATE,
	FechaRetorno DATE,
	FOREIGN KEY (IDUsuario) REFERENCES Usuarios(IDUsuario),
	FOREIGN KEY (IDLibro) REFERENCES Libros(IDLibro)
);

CREATE TABLE LibrosReservados (
	IDReservacion INT PRIMARY KEY,
	IDUsuario INT,
	IDLibro INT,
	FechaReservacion DATE,
	FOREIGN KEY (IDUsuario) REFERENCES Usuarios(IDUsuario),
	FOREIGN KEY (IDLibro) REFERENCES Libros(IDLibro)
);

CREATE TABLE Categorias (
	IDCategoria INT PRIMARY KEY,
	NombreCategoria VARCHAR(255)
);

CREATE TABLE Libros_Categorias (
	IDLibro INT,
	IDCategoria INT,
	FOREIGN KEY (IDLibro) REFERENCES Libros(IDLibro),
	FOREIGN KEY (IDCategoria) REFERENCES Categorias(IDCategoria),
	PRIMARY KEY (IDLibro, IDCategoria)
);

/*---------------------------------------------------------------*/
/*                          INSERCIONES                          */
/*---------------------------------------------------------------*/





INSERT INTO Usuarios (IDUsuario, Nombre, Apellido, Direccion, Email, Telefono, NombreUsuario, Contrasena)
VALUES
  (1, 'Alvir', 'Guzmán', '123 Main St', 'andres.alvir@example.com',
   '1234567890', 'AlvirElWapo', '6327'),



  (2, 'Jane', 'Smith', '456 Elm St', 'jane.smith@example.com', '0987654321', 'janesmith', 'pass456'),
  (3, 'Mike', 'Johnson', '789 Oak St', 'mike.johnson@example.com', '9876543210', 'mikejohnson', 'secretword'),
  (4, 'Sarah', 'Wilson', '321 Pine St', 'sarah.wilson@example.com', '0123456789', 'sarahw', 'securepass'),
  (5, 'Emily', 'Brown', '654 Cedar St', 'emily.brown@example.com', '5678901234', 'emilyb', 'p@ssw0rd');











-- Insert into Autores
INSERT INTO Autores (NombreAutor)
VALUES
  ('Gabriel García Márquez'),
  ('Miguel de Cervantes'),
  ('Julio Cortázar'),
  ('Carlos Ruiz Zafón'),
  ('Isabel Allende')
;

-- Insert into Editoriales
INSERT INTO Editoriales (NombreEditorial, Direccion)
VALUES
  ('Editorial Sudamericana', 'Calle Principal 123'),
  ('Editorial Planeta', 'Avenida Central 456'),
  ('Editorial Alfaguara', 'Carrera Norte 789'),
  ('Editorial Suma', 'Calle Sur 321'),
  ('Editorial Penguin Random House', 'Avenida Oeste 654')
;

-- Insert into Libros
INSERT INTO Libros (Titulo, AutorID, ISBN, FechaPublicacion, EditorialID, Genero, Descripcion, nombre_imagen)
VALUES
  ('Cien años de soledad', 1, '9780307474728', '1967-05-30', 1, 'Realismo mágico', 'Cien años de soledad es una novela del escritor colombiano Gabriel García Márquez que narra la historia de la familia Buendía a lo largo de siete generaciones en el ficticio pueblo de Macondo.', REPLACE('Cien años de soledad', ' ', '_')),
  ('Don Quijote de la Mancha', 2, '9788424118018', '1605-01-16', 2, 'Novela de caballerías', 'Don Quijote de la Mancha es una obra maestra de la literatura escrita por Miguel de Cervantes. Narra las aventuras y desventuras de un hidalgo que enloquece tras leer demasiados libros de caballerías y decide convertirse en caballero andante.', REPLACE('Don Quijote de la Mancha', ' ', '_')),
  ('Rayuela', 3, '9788420406959', '2001-10-28', 3, 'Novela experimental', 'Rayuela es una novela del escritor argentino Julio Cortázar que desafía las convenciones narrativas tradicionales. El lector puede elegir entre diferentes órdenes de lectura para descubrir los distintos caminos que puede tomar la historia.', REPLACE('Rayuela', ' ', '_')),
  ('La sombra del viento', 4, '9788408183136', '2001-01-01', 4, 'Misterio', 'La sombra del viento es una novela del escritor español Carlos Ruiz Zafón que mezcla el género de misterio, la historia y el romance. Ambientada en la Barcelona de la posguerra, sigue la vida de un joven que descubre un libro maldito y se adentra en una serie de intrigas y secretos.', REPLACE('La sombra del viento', ' ', '_')),
  ('La casa de los espíritus', 5, '9781400034770', '1982-01-01', 5, 'Realismo mágico', 'La casa de los espíritus es una novela de la escritora chilena Isabel Allende. Narra la historia de la familia Trueba a lo largo de varias generaciones en un país sudamericano ficticio.', REPLACE('La casa de los espíritus', ' ', '_'))
;


-- Insert into Categorias
INSERT INTO Categorias (IDCategoria, NombreCategoria)
VALUES
  (1, 'Ficción'),
  (2, 'Historia'),
  (3, 'Fantasía'),
  (4, 'Romance'),
  (5, 'Ciencia ficción')
;

-- Insert into Libros_Categorias
INSERT INTO Libros_Categorias (IDLibro, IDCategoria)
VALUES
  (1, 1),
  (2, 2),
  (3, 3),
  (4, 4),
  (5, 5)
;


-- Consultas valiosas para el Usuario
SELECT * FROM Libros WHERE Titulo = "Rayuela";
SELECT lb.*,aut.NombreAutor FROM Libros lb, Autores aut WHERE lb.AutorID = aut.IDAutor;
SELECT * FROM Usuarios WHERE NombreUsuario = "AlvirElWapo" AND Contrasena = "6327";
SELECT FechaPublicacion FROM Libros WHERE YEAR(FechaPublicacion) > 2000;
SELECT lb.Titulo,aut.NombreAutor FROM Libros lb, Autores aut WHERE lb.AutorID = aut.IDAutor AND lb.Titulo = "Rayuela";







