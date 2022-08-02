import fs from 'fs';
const path = './files/chatList.json'

class Contenedor{
    getAll = async() =>{
        try {
            if(fs.existsSync(path)){      
                let fileData = await fs.promises.readFile(path,'utf-8');
                let lista = JSON.parse(fileData);
                return lista;
            }else{
                return [];
            }
        } catch (error) {
            console.log("Hay un error " + error)
        }
    }

    save = async(producto) =>{
        try {
                let date = new Date();
                let lista = await this.getAll();
                producto.fecha= date;
                lista.push(producto)
                console.log(producto)
                await fs.promises.writeFile(path,JSON.stringify(lista,null,'\t'))
            
        } catch (error) {
            console.log("Hay un error: "+ error )
        }
    }
}

export default Contenedor;