import { BaseService } from "./base/baseService";
import { postAPI, putAPI, getAPI } from "./api";
const endPoint = 'book'
class BookService extends BaseService {
  constructor() {
    super(endPoint);

  }

  /**
   *
   * @param {*} name string
   * @returns
   */
  async searchBookByNameOrAuthor({ name }) {
    var data = await getAPI(`book/${name}`)
    return data
  }


  /**
   * Tìm kiếm sách bằng id của sachs
   * @param {*} param0
   * @returns
   */
  async searchBookById({ id }) {
    var data = await getAPI(`book/search/${id}`)
    return data
  }


  /**
   * Bearer token
   * @param {*} param0
   * @returns none
   */
  async followBookAndUpdateStatus({ bookId, status }) {
    var data = await getAPI('/api/bookBasket', { bookId, status })
    return data
  }
}

export default new BookService()
