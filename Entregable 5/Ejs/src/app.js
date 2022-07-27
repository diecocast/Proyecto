import express from 'express'
import __dirname from './utils.js';
import productosRouter from './routers/productos.router.js'

const app = express()
const PORT = 8080;



const server = app.listen(PORT,()=>{
    console.log(`Èscuchando en el puerto ${PORT}`)
})
app.use(express.json());
app.set('views',__dirname+'/views')
app.set('view engine','ejs')
app.use('/productos',productosRouter);
app.use(express.static('public'))
