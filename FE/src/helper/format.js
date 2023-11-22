/**
 * tìm kiếm vị trí của 1 giá trị
 * @param {Array} arrayFind mảng cần tìm kiếm
 * @param {string} attr thuộc tính cần tìm kiếm
 * @param {*} valueFind giá trị cần tìm kiếm
 * @returns -1 nếu không tìm thấy, 1 số >= 0 nếu tìm thấy
 */
export const findIndexByAttribute = function (arrayFind, attr, valueFind) {
    try {
        if (attr === "" || attr == '') {
            for (let i = 0; i < arrayFind.length; i++) {
                if (arrayFind[i] == valueFind) {
                    return i;
                }
            }
        } else {
            for (let i = 0; i < arrayFind.length; i++) {
                if (arrayFind[i][attr] == valueFind) {
                    return i;
                }
            }
        }

        return -1;
    } catch (error) {
        console.log("🚀 ~ file: index.js:5 ~ findIndexByAttribute ~ error:", error);
    }
};


/**
 * convert string từ: lê huy hải anh -> Lê Huy Hải Anh
 * @param {string} rawValue giá trị cần convert
 * @returns giá trị đã convert
 */
export function capitalizeFirstLetter(rawValue) {
    try {
        let valueReturn = "";

        for (let i = 0; i < rawValue.length; i++) {
            if (i === 0) {
                valueReturn += rawValue[i].toUpperCase();
            } else {
                if (rawValue[i - 1] === " ") {
                    valueReturn += rawValue[i].toUpperCase();
                } else {
                    valueReturn += rawValue[i];
                }
            }
        }

        return valueReturn;
    } catch (error) {
        console.log(
            "🚀 ~ file: helper.js:10 ~ capitalizeFirstLetter ~ error:",
            error
        );
    }
}

/**
 * chuyển đổi sang date format
 * @param {string} rawValue string có thể chuyển định dạng sang được date
 * @param {string} formatDate cách định dạng ngày tháng
 * @returns string đã được định dạng theo 02/10/2023
 */
export function formatToDate(rawValue, formatDate) {
    try {
        if (!rawValue) {
            return "";
        }

        let valueConvert = new Date(rawValue);

        let dateFormatReturn = `/${valueConvert.getFullYear()}`;

        if (formatDate === "dd/MM/yyyy") {
            dateFormatReturn =
                `${valueConvert.getDate() < 10
                    ? "0" + valueConvert.getDate()
                    : valueConvert.getDate()
                }/${valueConvert.getMonth() + 1 < 10
                    ? "0" + (valueConvert.getMonth() + 1)
                    : valueConvert.getMonth() + 1
                }` + dateFormatReturn;
        } else if (formatDate === "MM/dd/yyyy") {
            dateFormatReturn =
                `${valueConvert.getMonth() + 1 < 10
                    ? "0" + (valueConvert.getMonth() + 1)
                    : valueConvert.getMonth() + 1
                }/${valueConvert.getDate() < 10
                    ? "0" + valueConvert.getDate()
                    : valueConvert.getDate()
                }` + dateFormatReturn;
        }

        return dateFormatReturn;
    } catch (error) {
        console.log("🚀 ~ file: helper.js:51 ~ formatToDate ~ error:", error);
    }
}

/**
 * chuyển đổi sang định dạng tiền
 * @param {int} rawValue dữ liệu có thể chuyển sang kiểu tiền
 * @returns chuyển đổi thành dữ liệu dạng: 1.000.000đ, nếu 0 thì thành ""
 */
export function formatToCurrency(rawValue) {
    try {
        if (rawValue === 0 || rawValue === null) {
            return "";
        }

        const formatter = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        });

        return formatter.format(rawValue);
    } catch (error) {
        console.log("🚀 ~ file: helper.js:58 ~ formatToCurrency ~ error:", error);
    }
}
/**
 * so sánh 2 object
 * @author: TTANH (07/08/2023)
 * @param {object} object1
 * @param {object} object2
 */
export const compareObject = function (object1, object2) {
    for (let attr in object1) {
        if (
            (object1[attr] == "" || object1[attr] == null) &&
            (object2[attr] == "" || object2[attr] == null)
        ) {
        } else {
            if (object2[attr] !== object1[attr]) {
                return true;
            }
        }
    }

    return false;
};


/**
 * hàm tạo ra uuid
 * @author: Lhha
 * @returns 1 uuid mới
 */
export const generateUuid = () => {
    try {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
            (
                c ^
                (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
            ).toString(16)
        );
    } catch (error) {
        console.log("🚀 ~ file: common.js:161 ~ generateUuid ~ error:", error);
    }
};
/**
 * Map từ một object sang chuỗi parameter
 * const object = {
  name: 'John',
  age: 30
}
  const params = objectToParams(object);
  // params = "name=John&age=30"
 * @param {*} obj
 * @returns
 */
export const objectToParams = (obj) => {
    const params = Object.keys(obj).map(key => `${key}=${encodeURIComponent(obj[key])}`).join('&');
    return params;
}
