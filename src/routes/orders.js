import { Router } from "express";
import OdersService from "../services/OrdersService.js";
import { globalOrdersRouter } from "./globarOrders.js";

export const ordersRouter = Router()
export const ordersService = new OdersService()

ordersRouter.use('/globals', globalOrdersRouter)

ordersRouter.get('/', async (req, res) => {
    if (req.query.customerId) {
        try {
            const rows = await ordersService.getCustomerOrders(req.query.customerId)
            if (!rows.length)
                res.sendStatus(404)
            else
                res.send(rows)
        } catch (e) {
            console.error(e)
            res.sendStatus(400)
        }
    } else if (req.query.publicationId) {
        try {
            const rows = await ordersService.searchByPublication(req.query.publicationId)
            if (!rows.length)
                res.sendStatus(404)
            else
                res.send(rows)
        } catch (e) {
            console.error(e)
            res.sendStatus(400)
        }
    } else {
        try {
            const rows = await ordersService.list()
            res.send(rows)
        } catch (e) {
            console.error(e)
            res.sendStatus(500)
        }
    }
})


ordersRouter.get('/:id', async (req, res) => {
    if (!req.params.id)
        res.sendStatus(400).send('You must input an id')
    try {
        const rows = await ordersService.search(req.params.id)
        if (!rows.length)
            res.sendStatus(404)
        else
            res.send(rows)
    } catch (e) {
        console.error(e)
        res.sendStatus(400)
    }

})

ordersRouter.post('/', async (req, res) => {

    if (!Object.keys(req.body).length) {
        res.status(400).send('You must input all the fields')
        return
    }
    try {
        const rows = await ordersService.add(req.body)
        if (rows.id) {
            res.status(403).send(`Order already exists (${rows.id})`)
        }
        else
            res.sendStatus(201)
    } catch (e) {
        console.log(e);
        res.sendStatus(400)
    }

})

ordersRouter.put('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).send('You must input an id')
        return
    }
    if (!Object.keys(req.body).length) {
        res.status(400).send('You must input the fields to be modified')
        return
    }
    try {
        await ordersService.edit(req.params.id, req.body)
        res.sendStatus(200)
    } catch (e) {
        res.sendStatus(404)
    }
})


ordersRouter.delete('/:id', async (req, res) => {
    if (!req.params.id)
        res.sendStatus(400).send('You must input an id')
    try {
        await ordersService.delete(req.params?.id)
        res.sendStatus(200)
    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }

})
