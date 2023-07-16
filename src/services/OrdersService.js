import OrderModel from "../models/OrderModel"

export default class OdersService {
    createOder({customerId, publicationId, quantity, orderStatus }) { 
        if (!customerId || !publicationId || !quantity || !orderStatus) return null
        return {}
    }
}