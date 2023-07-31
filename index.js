import express from "express"
import { publicationRouter } from "./src/routes/publications.js"


const app = express()
const port = 3000


app.get('/', async (req, res) => {
    res.send('Coucou je m\'appelle Vincent bienvenu sur mon API!')
})

app.use('/publications', publicationRouter)

app.listen(port, () => {
    console.warn(`app listening on port ${port}`)
})