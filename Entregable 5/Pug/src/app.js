import express from 'express'
import __dirname from './utils.js';
import productosRouter from './routers/productos.router.js'

const app = express()
const PORT = 8080;



const server = app.listen(PORT,()=>{
    console.log(`Èscuchando en el puerto ${PORT}`)
})

app.set('views',__dirname+'/views');
app.set('view engine','pug');
app.use(express.json())
app.use('/productos',productosRouter);
app.use(express.static('public'))