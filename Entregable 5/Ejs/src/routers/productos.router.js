import { Router } from "express";
import Manager from "../Manager/contenedor.js"
const manager  = new Manager();
const router = Router();

///GET '/productos' -> devuelve todos los productos.

router.get('/',async(req,res)=>{
    let productos = await manager.getAll()
    if (productos.length <= 0) {
        res.send("No hay productos")
    } else {
        let productos = await manager.getAll()
        res.render('mostrarTodo.ejs',{
            productos
        })
    }
})

//GET '/productos/:id' -> devuelve un producto según su id.

router.get('/id',async(req,res)=>{
    let Lista = await manager.getAll()
    if (req.query.id >Lista.length ||req.query.id<=0) {
        res.send("404 El valor pedido no existe")
    } else {
        let numero = req.query.id
        let producto = await manager.getById(numero)
        res.render('mostrarById',{
            producto
        })
    }

})

//POST '/productos' -> recibe y agrega un producto.

router.post('/',async(req,res)=>{
    let producto = req.body
    res.send({status:"succes", message:"Product Added"})
    await manager.save(producto)
})

//PUT '/productos/:id' -> recibe y actualiza un producto según su id.

router.put('/',async(req,res)=>{
    let producto = req.body
   await manager.actualizar(producto)
})


//DELETE '/productos/:id' -> elimina un producto según su id.
router.delete('/',async(req,res)=>{
    let id = req.body
    res.send("Eliminado")
   await manager.deleteById(id.delete)
})





export default router;