import PublicationModel from "../models/PublicationModel";
// import publicationModel from "../models/PublicationModel";

const publicationModel =  new PublicationModel()

export default class PublicationService {
    constructor() { }
    async add(title) {
        if (!title)
            return null
        publicationModel.create(title)
    }
    async list() {
        return await publicationModel.getAll()
    }
    async edit(pubId) {

    }
    async search(name) {
        return await pubsModel.getOne(name)

    }
    async delete(pubId) {
        return await publicationModel.delete(pubId)
    }
}

// export default publicationService