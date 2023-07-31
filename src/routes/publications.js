import { Router } from "express";
import PublicationService from "../services/PublicationService.js";

export const publicationRouter = Router()
const publicationService = new PublicationService()

publicationRouter.get('/', async (req, res) => {
    try {
        const rows = await publicationService.list()
        console.log('getAll', { rows })
        res.send(rows)
    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
})

publicationRouter.get('/:name', async (req, res) => {
    if (!req.params.name)
        res.sendStatus(400).send('You must input an name')
    try {
        const rows = await publicationService.search(req.params.name)
        console.log('search', { rows })
        res.send(rows)
    } catch (e) {
        console.error(e)
        res.sendStatus(400).send(null)
    }

})

publicationRouter.post('/', async (req, res) => {
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

publicationRouter.put('/:id', async (req, res) => {
    if (!req.params.id || !req.query.title)
        res.sendStatus(400).send('You must input an id')
    try {
        const rows = await publicationService.edit(req.params.id, req.query.title)
        console.log("update ===> ", rows);
        res.sendStatus(200)
    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
})

publicationRouter.delete('/:id', async (req, res) => {
    console.log("je PASSE");
    if (!req.params.id)
        res.sendStatus(400).send('You must input an id')
    try {
        const rows = await publicationService.delete(req.params?.id)
        console.log("delete ===> ", rows);
        res.sendStatus(200)
    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }

})
