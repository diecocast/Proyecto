import {Router} from 'express';
import Manager from "../manager/productsManager.js"
const admin = true;
const manager = new Manager()
const router = Router();

router.get('/',async(req,res)=>{
    let products = await manager.getAll()
        res.render('productsList',{
            products
        })
})

router.get('/pid',async(req,res)=>{
    let number = req.query.pid
    let productid = await manager.getById(number)
        res.render('productById',{
            productid
        })
})

router.post('/',async(req,res)=>{
    if(admin==!true) return res.status(401).send("No estas autorizado")
    let producto = req.body
    res.send({status:"succes", message:"Product Added"})
    await manager.save(producto)
})

router.put('/',async(req,res)=>{
    if(admin==!true) return res.status(401).send("No estas autorizado")
    let product = req.body
   await manager.update(product)
})

router.delete('/',async(req,res)=>{
    if(admin==!true) return res.status(401).send("No estas autorizado")
    let id = req.body
    res.send("Eliminado")
   await manager.deleteById(id.delete)
})


export default router;