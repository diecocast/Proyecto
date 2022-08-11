import express from "express";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js";

const PORT = process.env.PORT || 8080
const app = express()
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars')
const server = app.listen(PORT,()=>{console.log(`Escuchando en el puerto ${PORT}`)})

app.get('/',(req,res)=>{
    res.render("viewHome")
})
app.use('/api/products',productsRouter);
app.use('/api/carts',cartsRouter);

