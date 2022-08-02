import express from 'express'
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import { Server } from 'socket.io';
import Manager from "./Manager/contenedor.js"
import chatManager from "./Manager/chatManager.js"
const chat = new chatManager()
const manager = new Manager()
const app = express()
const PORT = 8080;


const server = app.listen(PORT,()=>{
    console.log(`Èscuchando en el puerto ${PORT}`)
})
const io = new Server(server);
app.use(express.json());
app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars')
app.use(express.static(__dirname+'/public'))



io.on('connection',async(socket)=>{
    console.log("Socket connected")
    let datos = await manager.getAll()
    let log = await chat.getAll()
    io.emit('lista',datos)
    io.emit('log',log)

    socket.on('message',async data=>{
       await chat.save(data);
       let log = await chat.getAll()
       io.emit('log',log)
    })


    socket.on('newProducto',async data=>{
        await manager.save(data)
        let datos = await manager.getAll()
        io.emit('lista',datos)
    })
})

app.get('/',async(req,res)=>{

        let productos = await manager.getAll()
        res.render('formulario',{
            productos
        })
})



