import PublicationModel from "../models/PublicationModel.js";



export default class PublicationService {
    constructor() {
        this.publicationModel = new PublicationModel()
    }
    async add(title) {
        if (!title)
            return null
        this.publicationModel.create(title)
    }
    async list() {
        return await this.publicationModel.getAll()
    }
    async edit(pubId, newTitle) {
        return this.publicationModel.update(pubId, newTitle)

    }
    async search(name) {
        return await this.publicationModel.getOne(name)

    }
    async delete(pubId) {
        return await this.publicationModel.delete(pubId)
    }
}

