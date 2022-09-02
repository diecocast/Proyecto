import mongoose from "mongoose"

export default class MongoDBContainer{
    constructor(collection,schema){
        mongoose.connect('mongodb+srv://diego:toyboyaco07@diegocastcluster.9lpsglb.mongodb.net/?retryWrites=true&w=majority')
        this.model = mongoose.model(collection,schema)
    }

    getAll = async() =>{
        let data = await this.model.find()
        let element = JSON.stringify(data)
        return element
    }

    getById = async(idNumber) =>{
        try {
            const data = await this.getAll();
            if(data.id !=idNumber){
                let data = await this.model.find({id:{$eq:idNumber}}) 
                let element = JSON.stringify(data)
                console.log(element)
                return element
            }else{
                console.log("null")
            }

        } catch (error) {
            console.log("Hay un error: " + error)
        }
    }
    deleteById = async(idDelete) =>{
        try {
            const data = await this.getAll()
            if (await this.model.countDocuments()>=idDelete) {
              let result = await this.model.deleteOne({id:idDelete})
              console.log(result)
            } else {
                console.log("El id pedido no existe")
            }
        } catch (error) {
            console.log("Hay un error:" + error)
        }        
    }

}