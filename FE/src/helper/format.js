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



// Original object
// const original = {
//     questionsText: "aa",
//     answer: "key_1",
//     key_1: "Câu hỏi A",
//     key_2: "Câu hỏi B",
//     key_3: "Câu hỏi C",
//     key_4: "Câu hỏi D",
//     scoring: 4
// };

// // Target format
// const target = {
//     questionsText: "What is 2 + 2?",
//     optionText: {
//         "Câu hỏi A": 1,
//         "Câu hỏi B": 0,
//         "Câu hỏi C": 1,
//         "Câu hỏi D": 1
//     },
//     scoring: 5
// };

// Function to convert
export const convertDataIntoCreateTestOption = (original) => {
    let arrayResult = []
    const keys = ['key_1', 'key_2', 'key_3', 'key_4'];
    let values = [];
    // Construct new target object
    original.forEach((ori) => {
        const newObj = {
            questionsText: ori.questionsText,
            optionText: {},
            scoring: ori.scoring
        };
        // Get answer key
        const answerKey = ori.answer;
        const answerText = ori[answerKey]
        values = [answerText]
        // Check for duplicate values
        keys.forEach(key => {
            if (values.includes(ori[key]) && key != answerKey) {
                // Found duplicate value

                // Generate new value
                const newValue = generateUuid();

                // Update key with new value
                ori[key] = newValue;
            } else {
                // Track unique value
                values.push(ori[key]);
            }
        });
        // Populate optionText
        Object.keys(ori)
            .filter(key => key.startsWith("key_"))
            .forEach(key => {
                newObj.optionText[ori[key]] = (key === answerKey && ori[key] == answerText) ? 1 : 0;
            });
        arrayResult.push(newObj)
    })


    return arrayResult;

}


export const convertCommentWithParentId = (arrayInput) => {
    // const arrayInput = [{ "id": 791, "sortOrder": 0, "parentCategoryId": 833 }, { "id": 790, "sortOrder": 0, "parentCategoryId": 833 }, { "id": 845, "sortOrder": 0, "parentCategoryId": 847 }, { "id": 844, "sortOrder": 0, "parentCategoryId": 842 }, { "id": 802, "sortOrder": 0, "parentCategoryId": 847 }, { "id": 788, "sortOrder": 0, "parentCategoryId": 833 }, { "id": 863, "sortOrder": 0, "parentCategoryId": 863 }, { "id": 858, "sortOrder": 0, "parentCategoryId": 858 }, { "id": 867, "sortOrder": 0, "parentCategoryId": 867 }, { "id": 871, "sortOrder": 0, "parentCategoryId": 867 }, { "id": 801, "name": "Tickets", "sortOrder": 0, "parentCategoryId": 847 }, { "id": 792, "sortOrder": 0, "parentCategoryId": 833 }, { "id": 797, "sortOrder": 0, "parentCategoryId": 847 }, { "id": 789, "name": "Hot food", "sortOrder": 0, "parentCategoryId": 833 }, { "id": 798, "sortOrder": 0, "parentCategoryId": 847 }, { "id": 671, "sortOrder": 0, "parentCategoryId": 847 }, { "id": 833, "sortOrder": 0, "parentCategoryId": 833 }, { "id": 796, "sortOrder": 0, "parentCategoryId": 847 }, { "id": 843, "sortOrder": 0, "parentCategoryId": 842 }, { "id": 840, "sortOrder": 0, "parentCategoryId": 793 }, { "id": 868, "sortOrder": 0, "parentCategoryId": 868 }, { "id": 851, "sortOrder": 0, "parentCategoryId": 851 }, { "id": 839, "sortOrder": 0, "parentCategoryId": 847 }, { "id": 793, "sortOrder": 0, "parentCategoryId": 839 }, { "id": 859, "sortOrder": 0, "parentCategoryId": 859 }, { "id": 805, "sortOrder": 0, "parentCategoryId": 859 }, { "id": 856, "name": "DRINKS", "sortOrder": 0, "parentCategoryId": 805 }, { "id": 870, "sortOrder": 0, "parentCategoryId": 856 }, { "id": 787, "sortOrder": 0, "parentCategoryId": 833 }, { "id": 786, "sortOrder": 0, "parentCategoryId": 833 }, { "id": 799, "sortOrder": 0, "parentCategoryId": 847 }, { "id": 852, "sortOrder": 0, "parentCategoryId": 852 }, { "id": 795, "name": "Gents fragrance", "sortOrder": 0, "parentCategoryId": 847 }, { "id": 864, "sortOrder": 0, "parentCategoryId": 864 }, { "id": 854, "sortOrder": 0, "parentCategoryId": 854 }, { "id": 865, "sortOrder": 0, "parentCategoryId": 865 }, { "id": 869, "name": "GFI", "sortOrder": 0, "parentCategoryId": 869 }, { "id": 785, "sortOrder": 0, "parentCategoryId": 833 }];
    const ids = arrayInput.map((x) => x.id);
    const result = arrayInput.map((parent) => {
        const children = arrayInput.filter((child) => {
            if (child.id !== child.parentId && child.parentId === parent.id) {
                return true;
            }
            return false;
        });

        if (children.length) {
            parent.children = children;
        }
        return parent;
    }).filter((obj) => {
        if (obj.id === obj.parentId || !ids.includes(obj.parentId)) {
            // include ultimate parents and orphans at root
            return true;
        }
        return false;
    });
    return result
}
