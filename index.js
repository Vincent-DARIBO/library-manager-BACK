import express from "express"
import PublicationModel from "./src/models/PublicationModel.js"

const app = express()
const port = 3000


const pubsModel = new PublicationModel() 
app.get('/', (req, res) => {
    let test = null
    const callback = (result) => {
        test = result
    }

    res.send('Coucou je m\'appelle Vincent bienvenu sur mon site web!')
    pubsModel.getAll(callback)
    console.log("return test: ", test)
})
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})