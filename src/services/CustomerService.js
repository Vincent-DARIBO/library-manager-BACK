import CustomerModel from "../models/CustomerModel.js"

export default class CustomeService {
    constructor() {
        this.customerModel = new CustomerModel()
    }
    async add({ firstName, lastName, email, phone }) {
        if (!firstName || !lastName || !email || !phone)
            throw Error("Missing field")
        const user = this.customerModel.getByEmail(email)
        if (user)
            return null
        return this.customerModel.create({ firstName, lastName, email, phone })
    }
    async list() {
        return await this.customerModel.getAll()
    }
    async edit(customerId, newInfos) {

        const result = await this.customerModel.update(customerId, newInfos)
       console.log({result});
        if (!result)
            throw Error('Customer not found')
        else
            return result

    }
    async search(name) {
        return await this.customerModel.getOne(name)

    }
    async delete(customerId) {
        return await this.customerModel.delete(customerId)
    }
}