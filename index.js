import express from "express"
import PublicationService from "./src/services/PublicationService"

const app = express()
const port = 3000

const publicationService = new PublicationService()

app.get('/', async (req, res) => {
    res.send('Coucou je m\'appelle Vincent bienvenu sur mon API!')
})

app.get('/publications', async (req, res) => {
    try {
        const rows = await publicationService.list()
        console.log({rows})
        res.send(rows)
    } catch (e) {
        console.error(e)
        res.sendStatus(500) 
    }

})

app.get('/publications/:name', async (req, res) => {
    if (!req.params?.name)
        res.sendStatus(400).send('You must input an name')
    try {
        const rows = await publicationService.search(req?.params.name)
        res.send(rows)
    } catch (e) {
        console.error(e)
        res.sendStatus(400).send(null)
    }

})

app.post('/publications', async (req, res) => {
    if (!req.query.title)
        res.sendStatus(400).send('You must input a title')
    try {
        const rows = await publicationService.add(req.query.title)
        res.sendStatus(200).send(rows)
    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }

})

app.delete('/publications/:id', async (req, res) => {
    if (!req.params?.id)
        res.sendStatus(400).send('You must input an id')
    try {
        const rows = await publicationService.delete(req.params?.title)
        res.sendStatus(200).send(rows)
    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})