import express from "express"
import { publicationsRouter } from "./src/routes/publications.js"
import { customersRouter } from "./src/routes/customers.js"
import bodyParser from "body-parser"


const app = express()
const port = 3000

app.use(bodyParser.json())
app.get('/', async (req, res) => {
    res.send('Coucou je m\'appelle Vincent bienvenu sur mon API!')
})

app.use('/publications', publicationsRouter)
app.use('/customers', customersRouter)

app.listen(port, () => {
    console.warn(`app listening on port ${port}`)
})