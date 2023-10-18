import MISAResource from "@/helper/MISAResource";
import sprintf from "sprintf-js";

/**
 * hàm kiểm tra chiều dài của một chuỗi
 * @param {string} valueCheck đối tượng cần kiểm tra
 * @param {int} maxLength chiều dài tối đa
 * @param {int?} minLength chiều dài tối thiểu
 * @param {string} nameField tên trường
 * @returns thông báo lỗi
 */
function lengthValidate(
    valueCheck,
    maxLength,
    minLength = 0,
    nameField
) {
    let valueLength = valueCheck.toString().length;

    if (maxLength < 0 || minLength < 0) {
        return MISAResource.validate.paramPassToFunctionError;
    } else if (valueLength > maxLength) {
        return sprintf.sprintf(
            MISAResource.validate.maxLengthError,
            nameField,
            maxLength
        );
    } else if (valueLength < minLength) {
        return sprintf.sprintf(
            MISAResource.validate.minLengthError,
            nameField,
            minLength
        );
    } else {
        return '';
    }
}

/**
 * hàm kiểm tra một chuỗi trống
 * @param {string} valueCheck đối tượng cần kiểm tra
 * @param {string} nameField tên trường
 * @returns thông báo lỗi
 */
function emptyValidate(
    valueCheck,
    nameField
) {
    let valueLength = valueCheck.toString().length;

    if (valueLength === 0) {
        return sprintf.sprintf(
            MISAResource.validate.emptyError,
            nameField,
        );
    } else {
        return "";
    }
}

/**
 * hàm kiểm tra định dạng theo regex
 * @param {string} valueCheck đối tượng cần kiểm tra
 * @param {string} nameField tên trường
 * @param {string} regex regex kiểm tra
 * @returns thông báo lỗi
 */
function regexValidate(
    valueCheck,
    nameField,
    regex
) {
    if (!String(valueCheck).toLowerCase().match(regex) && valueCheck.toString() !== '') {
        return sprintf.sprintf(
            MISAResource.validate.formatError,
            nameField,
        );
    } else {
        return "";
    }
}

export { lengthValidate, emptyValidate, regexValidate };
