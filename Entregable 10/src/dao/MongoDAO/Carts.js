import mongoose from "mongoose";
import MongoDBContainer from "./mongoDBContainer.js";

const collections = 'carts'
const productsSchema = mongoose.Schema({
    id:Number,
    timestamp:String,
    products:Object,

})

export default class Carts extends MongoDBContainer{
    constructor(){
        super(collections,productsSchema)
    }
    createCart = async() =>{
        try {
            let producto = {}
            let datenow = new Date();
            function generateDatabaseDateTime(date) {
            return date.toISOString().replace("T"," ").substring(0, 19);
            }

            if(await this.model.countDocuments() ===0){
                producto.id= 1;
                producto.timestamp= generateDatabaseDateTime(datenow);
                producto.products=[];
                await this.model.insertMany(producto);
                return producto.id

            }else{
                let id = await this.model.find({},{id:1,_id:0}).sort({id:-1}).limit(1)
                producto.id = id[0].id+1
                producto.timestamp= generateDatabaseDateTime(datenow);
                producto.products=[];
                await this.model.insertMany(producto);
                return `${producto.id}`
            }
        } catch (error) {
            return "Hay un error o no has creado tu cart"
        }
    }
    addProduct = async(info) =>{
        try {
            let arr = await this.getAll()
            let product = await this.getById(info.cid)
            let productsList = this.model.products;
            const productsInCartsFound = product.products
            const ProductItemInCarts = productsInCartsFound.find(item=> item.id === parseInt(info.pid))
    
            if(!productsList){
                  arr.map(function(dato){
                    if(dato.id == info.cid){
                      dato.products.push({product:info.pid,quantity:1})
                    }
                    fs.promises.writeFile(path,JSON.stringify(arr,null,'\t'));
                })
                return "Producto Agregado"
            }else{ 
                const newProduct = {
                    product: info.pid,
                    quantity: productsList.quantity+1,
                  }
                  product.products.push(newProduct)
                  await this.update(product,info)
                  let deleteOld = Object.values(product.products).filter((item) => item != productsList);
                  arr.map(function(dato){
                    if(dato.id == info.cid){
                        dato.products = deleteOld;
                    }})
                    await fs.promises.writeFile(path,JSON.stringify(arr,null,'\t'));
                    return "Se agrego 1 a la cantidad del producto ya que estaba agregado"
            } 
        } catch (error) {
            return `Hay un error, o el carrito o el producto puesto no existen. Recuerde el modo de añadir "http://localhost:8080/api/carts/:IDPRODCUT/products/:IDCART"`
        }

    }
    prueba = async() =>{
        await this.model.updateMany({id:3},{$push:{products:{producto:"2"}}})
    }
}