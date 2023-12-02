import { BaseService } from "./base/baseService";
import { postAPI, putAPI, getAPI } from "./api";
const endPoint = 'author'
class AuthorService extends BaseService {
    constructor() {
        super(endPoint);
    }
    /**
     * Api để tạo câu hỏi trắc nghiệm cho sách
     * @param {*} param0
     * @returns
     */
    async createQuestion({ idBook, questionDtos }) {
        var data = await postAPI('questions', { idBook, questionDtos })
        return data
    }
    /**
     * Api để lấy list câu hỏi trắc nghiệm theo sách
     * @returns
     */
    async getListQuizByBookId({ idBook }) {
        var data = await getAPI(`questions`, { idBook })
        return data
    }


    /**
     * //Api để chấm điểm bài test và trả các câu hỏi đúng
     * @param {*} param0
     * @returns
     */
    async checkAnswerAndGetPoint({ idBook, listAnswer }) {
        var data = await putAPI(`questions`, { idBook, listAnswer })
        return data
    }

}

export default new AuthorService()
