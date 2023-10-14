import api from './api';
import * as  axious from './api';

//Axios Interceptors manipulate the header, body, parameters of the requests
// sent to the server so that we don’t need to add headers in Axios requests like this:
// axios.get(API_URL, { headers: authHeader() })
// So we remove auth-header.js file, then update services that use it with new api service.
// Further reading: https://www.bezkoder.com/vue-3-refresh-token/

const EndPoint = "Properties";
export const getAll = async () => {
  var res = axious.get(`${EndPoint}`)
  console.log(res)
  return res;
};
