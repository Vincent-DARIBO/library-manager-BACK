import express from "express"
import bodyParser from "body-parser"

import { publicationsRouter } from "./src/routes/publications.js"
import { customersRouter } from "./src/routes/customers.js"
import { ordersRouter } from "./src/routes/orders.js"


const app = express()
const port = 3000

app.use(bodyParser.json())
app.get('/', async (req, res) => {
    res.send('Salut ! Bienvenue sur mon API!')
})

app.use('/publications', publicationsRouter)
app.use('/customers', customersRouter)
app.use('/orders', ordersRouter)

app.listen(port, () => {
    console.warn(`App listening on port ${port}`)
})