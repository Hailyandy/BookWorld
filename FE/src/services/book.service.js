import { BaseService } from "./base/baseService";
import { postAPI, putAPI, getAPI } from "./api";
const endPoint = 'book'
class BookService extends BaseService {
  constructor() {
    super(endPoint);
  }

  /**
   * API sử dụng để lấy  danh sách thể loại
   * @returns
   */
  async getAllGenresBook() {
    var data = await getAPI(`genres`)
    return data
  }


  /**
   *
   * @param {*} name string
   * @returns
   */
  async searchBookByNameOrAuthor({ name }, param) {
    var data = await getAPI(`book/${name}`, param)
    return data
  }


  /**
   * API sử dụng để lấy ra thông tin sách qua id
   * @param {*} param0
   * @returns
   */
  async searchBookById({ id }) {
    var data = await getAPI(`book/search/${id}`)
    return data
  }


  /**
   * Theo doi sach
   * @param {*} param0
   * @returns none
   */
  async followBookAndUpdateStatus({ bookId, status }) {
    var data = await putAPI('/bookBasket', { bookId, status })
    return data
  }

  /**
   * API sử dụng để lấy ra các cuốn sách gợi ý
   * @returns array chứa thông tin các quyển sách gợi ý
  */
  async getRecommendedBooks() {
    var data = await getAPI('book')
    return data
  }


}

export default new BookService()
