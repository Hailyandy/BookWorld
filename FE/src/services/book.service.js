import { BaseService } from "./base/baseService";
import { postAPI, putAPI, getAPI } from "./api";
const endPoint = 'endpoint'
class BookService extends BaseService {
  constructor() {
    super(endPoint);

  }
  async searchBookByNameOrAuthor({ name }) {
    var data = await getAPI(`book/${name}`)
    return data
  }
}

export default new BookService()
