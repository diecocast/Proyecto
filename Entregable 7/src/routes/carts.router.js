import {Router} from 'express';
import Manager from "../manager/cartsManager.js"
import productsManager from "../manager/productsManager.js"

const producManager = new productsManager()
const manager = new Manager()
const router = Router();

router.get('/:cid/products',async(req,res)=>{
   let cid = req.params.cid
   if(isNaN(cid)) return res.status(400).send({error:"El valor no es numerico"})
   if(parseInt(cid)<1) return res.status(404).send("No hay un carro con ese id")
   let list = await producManager.getCartProducts(cid)
   res.send(list)
})

router.post('/',async(req,res)=>{
   let create = await manager.createCart()
   res.send(`El id de su carrito es ${create}`)
})
router.post('/:cid/products/:pid',async(req,res)=>{
   let info = req.params
   if(isNaN(info.pid)) return res.status(400).send({error:"El valor no es numerico o no existe"})
   let add = await manager.addProduct(info)
   res.send(add)
})


router.delete('/:cid',async(req,res)=>{
   let cid = req.params.cid
   if(isNaN(cid)) return res.status(400).send({error:"El valor no es numerico"})
   await manager.deleteById(cid)
   res.send(`Carrito ${cid} eliminado con exito`)
})

router.delete('/:cid/products/:pid',async(req,res)=>{
   let cid = req.params
   if(isNaN(cid.cid)) return res.status(400).send({error:"El valor no es numerico"})
   let deleten = await manager.deleteByCidAndPid(cid)
   res.send(deleten)
})

export default router;