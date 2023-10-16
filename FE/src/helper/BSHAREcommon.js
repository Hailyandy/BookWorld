import BSHAREresource from "./BSHAREresource";
import BSHAREnum from "./BSHAREenum";

// ví dụ khai báo ntn :)) const isAllowed = checkRole(user, ['admin'])
function checkRole(user, allowedRoles) {
    return allowedRoles.includes(user.role)
}

//
const $MISAcommon = {
    BSHAREresource,
    BSHAREnum,
    checkRole
}
export default $BSHAREcommon
