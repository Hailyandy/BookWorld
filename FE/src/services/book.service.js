import { BaseService } from "./base/baseService";
const endPoint = 'endpoint'
class BookService extends BaseService {
  constructor() {
    super(endPoint);

  }
}

export default new BookService()
