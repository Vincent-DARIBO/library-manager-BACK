import { Router } from "express";
import PublicationService from "../services/PublicationService.js";
import CustomeService from "../services/CustomerService.js";

export const customersRouter = Router()
const customersService = new CustomeService()

customersRouter.get('/', async (req, res) => {
    try {
        const rows = await customersService.list()
        console.log('getAll', { rows })
        res.send(rows)
    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
})

customersRouter.get('/:name', async (req, res) => {
    if (!req.params.name)
        res.sendStatus(400).send('You must input an name')
    try {
        const rows = await customersService.search(req.params.name)
        console.log('search', { rows })
        if (!rows.length)
            res.sendStatus(404)
        else
            res.send(rows)
    } catch (e) {
        console.error(e)
        res.sendStatus(400)
    }

})

customersRouter.post('/', async (req, res) => {
    try {
        const rows = await customersService.add(req.body)
        if (!rows)
            res.status(403).send("User already exists")
        else
            res.sendStatus(200)
    } catch (e) {
        console.error(e)
        res.sendStatus(400)
    }

})

customersRouter.put('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).send({ message: 'You must input an id' })
        return
    }
    if (!Object.keys(req.body).length) {
        res.status(400).send({ message: 'You must the fields to be modified' })
        return
    }
    console.log({body: req.body})
    try {
        console.log({params: req.params, });
        const rows = await customersService.edit(req.params.id, req.body)
        console.log("update ===> ", rows);
        res.sendStatus(200)
    } catch (e) {
        console.error(e)
        res.sendStatus(404)
    }
})

customersRouter.delete('/:id', async (req, res) => {
    console.log("je PASSE");
    if (!req.params.id)
        res.sendStatus(400).send('You must input an id')
    try {
        const rows = await customersService.delete(req.params?.id)
        console.log("delete ===> ", rows);
        res.sendStatus(200)
    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }

})
