// CONSIGNA 1: Funcion constructora ES5
function Usuario(name, surname, books, pets) {
  this.name = name;
  this.surname = surname;
  this.books = books;
  this.pets = pets;
};

Usuario.prototype.getFullName = function() {
  return `Nombre y Apellido del usuario: ${this.surname}, ${this.name}`;
};

Usuario.prototype.addMascota = function(mascota) {
  this.pets.push(mascota);
};

Usuario.prototype.getMascotas = function() {
  return this.pets.length;
};

Usuario.prototype.addBook = function(book, author) {
  var libro = {
    name: book,
    author: author
  };
  this.books.push(libro);
};

Usuario.prototype.getBooks = function() {
  var nombresLibros = [];
  this.books.forEach(book => {
    nombresLibros.push(book.name);
  });
  return nombresLibros;
}

var libros = [
  {
    name: "Clean Code",
    author: "Robert G. Martin"
  },
  {
    name: "Clean Coder",
    author: "Robert G. Martin"
  },
  {
    name: "1984",
    author: "George Orwell"
  }
];
var mascotas = ["Khaleesi", "Simba", "Almendra", "Valerio", "Holly", "Mora"];

var usuario = new Usuario('Andrea', 'Opazo', libros, mascotas);

console.log(usuario.getFullName());
usuario.addMascota('Leila');
usuario.addMascota('Lucas');
console.log(usuario.getMascotas());
usuario.addBook('Revelion en la granja', 'George Orwell');
console.log(usuario.getBooks());

// CONSIGNA 2: Clase constructora ES6
class Usuario {
  constructor (name, surname, books, pets) {
    this.name = name;
    this.surname = surname;
    this.books = books;
    this.pets = pets;
  };

  getFullName() {
    return `Nombre y Apellido del usuario: ${this.surname}, ${this.name}`;
  };
  
  addMascota(mascota) {
    this.pets.push(mascota);
  };
  
  getMascotas() {
    return this.pets.length;
  };
  
  addBook(book, author) {
    const libro = {
      name: book,
      author: author
    };
    this.books.push(libro);
  };
  
  getBooks() {
    const nombresLibros = this.books.map(book => {
      return book.name;
    });
    return nombresLibros;
  };
};

const libros = [
  {
    name: "Revelion en la granja",
    author: "George Orwell"
  },
  {
    name: "Clean Coder",
    author: "Robert G. Martin"
  },
  {
    name: "1984",
    author: "George Orwell"
  }
];
const mascotas = ["Khaleesi", "Simba", "Almendra", "Valerio", "Holly", "Mora"];

const usuario = new Usuario('Andrea', 'Opazo', libros, mascotas);

console.log(usuario.getFullName());
usuario.addMascota('Lola');
usuario.addMascota('Nina');
console.log(usuario.getMascotas());
usuario.addBook('Clean Code', 'Robert G. Martin');
console.log(usuario.getBooks());