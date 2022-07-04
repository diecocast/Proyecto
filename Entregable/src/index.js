const Contenedor = require('./Contenedor/contenedor.js')

const servicioProductos = new Contenedor();


const agregar = async() =>{
    console.log("Producto Agregado")
    let producto = {
        title: "Casa",
        prices: "500.000.000",
        thumbnail: "www.thumdsdsbnail.com/Casa/"
    }
    await servicioProductos.save(producto)
}

const mostrarTodo = async() =>{
    let lista = await servicioProductos.getAll();
    console.log(lista)
}

//METODOS A USAR (DESCOMENTAR PARA USAR)

//mostrarTodo()
//agregar()
//servicioProductos.deleteById(1)
//servicioProductos.deleteAll()
//servicioProductos.getById(2)
