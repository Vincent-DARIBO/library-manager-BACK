import { Router } from "express";
import PublicationService from "../services/PublicationService.js";

export const publicationsRouter = Router()
const publicationService = new PublicationService()

publicationsRouter.get('/', async (req, res) => {
    try {
        const rows = await publicationService.list()
        res.send(rows)
    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
})

publicationsRouter.get('/:name', async (req, res) => {
    if (!req.params.name)
        res.sendStatus(400).send('You must input an name')
    try {
        const rows = await publicationService.search(req.params.name)
        res.send(rows)
    } catch (e) {
        console.error(e)
        res.sendStatus(400).send(null)
    }

})

publicationsRouter.post('/', async (req, res) => {
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

publicationsRouter.put('/:id', async (req, res) => {
    if (!req.params.id || !req.body.title)
        res.sendStatus(400).send('You must input an id')
    try {
        const rows = await publicationService.edit(req.params.id, req.body.title)
        res.sendStatus(200)
    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
})

publicationsRouter.delete('/:id', async (req, res) => {
    if (!req.params.id)
        res.sendStatus(400).send('You must input an id')
    try {
        await publicationService.delete(req.params?.id)
        res.sendStatus(200)
    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }

})
