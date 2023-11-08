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


    /**
     * Sử dụng để gửi lời mời kết bạn, role user, role author
     * @param {*} { receiverId }
     * @returns { "code": 0, "message": "Friend request sent!", }
     */
    async addFriend({ receiverId }) {
        var data = await postAPI('friend/add', { receiverId })
        return data
    }


    /**
     * sử dụng để lấy danh sách lời mời kết bạn
     * @param {*} param0
     * @returns
     */
    async getListFriendRequest() {
        var data = await getAPI('friend/request')
        console.log(data)
        return data
    }

    /**
     * role user, role author
     * @param {*} { senderId - INT} Id của người gửi lời mời kết bạn
     * @returns
     */
    async acceptFriendReq({ senderId }) {
        var data = await putAPI('friend/accept', { senderId })
        return data
    }

    /**
     *
     * @param {*} senderId - INT
     * @returns
     */

    async rejectFriendReq({ senderId }) {
        var data = await putAPI('friend/reject', { senderId })
        return data
    }

    /**
     * 20. Huỷ kết bạn role user, role author
     * @param {*} senderId
     * @returns { "code": 0, "message": "Friend delete!" }
     */
    async unfriend({ senderId }) {
        var data = await deleteAPI('friend/unfriend', { senderId })
        return data
    }

    /**
    * role user, role author
    * sử dụng để lấy danh sách bạn bè của mình
    * @param {*} param0
    * @returns
    */
    async getListFriend() {
        var data = await getAPI('friend/list')
        return data
    }


}
