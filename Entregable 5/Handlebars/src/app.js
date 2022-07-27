import express from 'express'
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import productosRouter from './routers/productos.router.js'

const app = express()
const PORT = 8080;



const server = app.listen(PORT,()=>{
    console.log(`Èscuchando en el puerto ${PORT}`)
})
app.use(express.json());
app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars')

app.use('/productos',productosRouter);
app.use(express.static('public'))
