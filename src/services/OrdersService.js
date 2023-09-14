import OrderModel from "../models/OrderModel.js"
import { OrderStatus } from "../utils/enums.js"
import fieldMissing from "../utils/fieldMissing.js"

export default class OdersService {
    constructor() {
        this.orderModel = new OrderModel()
    }
    async add({ customerId, publicationId, status = OrderStatus.NOT_SENT, quantity }) {
        console.log("ici");
        if (!customerId || !publicationId || !quantity)
            throw "Missing fields"
        return await this.orderModel.create({ customerId, publicationId, status, quantity })
    }
    async list() {
        return await this.orderModel.getCustomersAll()
    }
    async listGlobals() {
        return await this.orderModel.getGlobalsAll()
    }
    async edit(orderId, newInfos) {
        const result = await this.orderModel.update(orderId, newInfos)
        if (!result)
            throw Error('Order not found')
        else
            return result

    }

    async changeStatus(globalOrderId, newStatus) {
        await this.orderModel.updateStatus(globalOrderId, newStatus)
    }

    async search(orderId) {
        return await this.orderModel.getOne(orderId)
    }
    async searchByPublication(pubId) {
        return await this.orderModel.getByPublicationId(pubId)
    }
    async getCustomerOrders(customerId) {
        return await this.orderModel.getByCustomerId(customerId)
    }

    async delete(orderId) {
        return await this.orderModel.delete(orderId)
    }
}