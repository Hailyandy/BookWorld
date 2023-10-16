import { getAPI, deleteAPI, deleteManyAPI, postAPI, putAPI } from "../api";

export class BaseService {
    constructor(apiUrl) {
        this.ApiUrl = apiUrl;
    }
    async getAll() {
        var data = await getAPI(this.ApiUrl)
        return data
    }
    async get(id) {
        var data = await getAPI(this.ApiUrl, id)
        return data
    }
    async delete(id) {
        var data = await deleteAPI(this.ApiUrl, id)
        return data
    }
    async add(entity) {
        var data = await postAPI(this.ApiUrl, entity)
        return data
    }

    async put(id, data) {
        var enp = `${this.ApiUrl}/${id}`
        var data = await putAPI(enp, data)
    }
}
