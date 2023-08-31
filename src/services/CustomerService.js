import CustomerModel from "../models/CustomerModel.js"

export default class CustomeService {
    constructor() {
        this.customerModel = new CustomerModel()
    }
    async add({ first_name, last_name, email, phone }) {
        if (!first_name || !last_name || !email || !phone)
            throw Error("Missing field")
        const user = await this.customerModel.getByEmail(email)
        if (user) {
            console.log({ user });
            return null
        }
        return await this.customerModel.create({ first_name, last_name, email, phone })
    }
    async list() {
        return await this.customerModel.getAll()
    }
    async edit(customerId, newInfos) {

        const result = await this.customerModel.update(customerId, newInfos)
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