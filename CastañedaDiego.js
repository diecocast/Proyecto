class Usuario{
    constructor(nombre, apellido){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = []
        this.mascotas = []
    }
    getFullName = function(){
        console.log(`Mi nombre completo es ${this.nombre} ${this.apellido}`)
    }
    addMascota = function(mascota){
        this.mascotas.push(mascota)
    }
    countMascotas = function(){
        console.log(`Tengo ${this.mascotas.length} mascotas`);
    }
    addBook = function(libro,escritor){
        this.libros.push({nombre: libro, autor:escritor})
      
    }

    getBookNames = function(){
        let NombreLibro = this.libros.map(function(element){
            return `${element.nombre}`
        })
        console.log(NombreLibro);
    }

}

//Datos de Usuario
usuario1 = new Usuario("Diego", "Castañeda")
usuario1.addMascota("Perro");
usuario1.addMascota("Pajaro");
usuario1.addBook("Nacidos de la Bruma el Imperio final", "Sanderson");
usuario1.addBook("La chica del Tren", "Paula Hawkins");

//Pruebas 
usuario1.getFullName()
usuario1.countMascotas()
usuario1.getBookNames()


