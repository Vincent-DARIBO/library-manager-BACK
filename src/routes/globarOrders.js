import { Router } from "express";
import { ordersService } from "./orders.js";

export const globalOrdersRouter = Router()


globalOrdersRouter.get('/', async (req, res) => {
    try {
        const rows = await ordersService.listGlobals()
        res.send(rows)
    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }

})

globalOrdersRouter.put('/status/:id', async (req, res) => {
    console.log("body", req.body);
    if (!req.params.id) {
        res.status(400).send('You must input an id')
        return
    }
    if (!req.body.status) {
        res.status(400).send('No status provided')
        return
    }
    try {
        await ordersService.changeStatus(Number(req.params.id), req.body.status)
        res.sendStatus(200)
    } catch (e) {
        console.error(e);
        res.sendStatus(500)
    }
})
