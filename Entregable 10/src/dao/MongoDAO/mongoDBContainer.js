import mongoose from "mongoose"

export default class MongoDBContainer{
    constructor(collection,schema){
        mongoose.connect('mongodb+srv://diego:toyboyaco07@diegocastcluster.9lpsglb.mongodb.net/?retryWrites=true&w=majority')
        this.model = mongoose.model(collection,schema)
    }

    getAll = async() =>{
        try {
            let data = await this.model.find()
            let element = JSON.stringify(data)
            return element
        } catch (error) {
            return "Hay un error "
        }

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
              let result = await this.model.deleteOne({id:idDelete})
              console.log(result)
             console.log("Elimeted")
            
        } catch (error) {
            console.log("Hay un error:" + error)
        }        
    }

}