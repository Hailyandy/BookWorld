/**
 * format sang number và phải là số không âm
 * @param {*} unformattedNumber giá trị chưa format
 * @returns biến format sang number, không format được sẽ return NaN
 */
export const formatToNumber = (unformattedNumber) => {
    try {
        let convertNumber = Number(unformattedNumber);

        if (isNaN(convertNumber)) {
            return NaN;
        } else if (convertNumber < 0) {
            return NaN;
        } else {
            return convertNumber;
        }
    } catch (error) {
        console.log(
            "file: textfield-format ~ formatToNumber ~ error:",
            error
        );
    }
};
/**
 * đếm số chữ số sau dấu ',' của number decimal đã được format
 * @param {double} number 1 số
 * @returns số chữ số sau dấu chấm
 */
export const countDecimalPlacesComma = (number) => {
    try {
        const numberString = number.toString();
        const decimalIndex = numberString.indexOf(",");

        if (decimalIndex === -1) {
            return 0;
        }

        const decimalPlaces = numberString.length - decimalIndex - 1;
        console.log(decimalPlaces)
        return decimalPlaces;
    } catch (error) {
        console.log(
            "file: textfield-format- ~ countDecimalPlaces ~ error:",
            error
        );
    }
};

/**
 * đếm số chữ số sau dấu phẩy (.)
 * @param {double} number 1 số
 * @returns số chữ số sau dấu chấm
 */
export const countDecimalPlaces = (number) => {
    try {
        const numberString = number.toString();
        const decimalIndex = numberString.indexOf(".");

        if (decimalIndex === -1) {
            return 0;
        }

        const decimalPlaces = numberString.length - decimalIndex - 1;

        return decimalPlaces;
    } catch (error) {
        console.log(
            "file: textfield-format- ~ countDecimalPlaces ~ error:",
            error
        );
    }
};
/**
 * format biến int sang dạng money, ví dụ: 1000000 -> 1.000.000
 * @param {int} numberInt biến muốn chuyển sang money
 * @returns giá trị đã chuyển sang dạng money
 */
export const formatNumberToMoney = (numberInt) => {
    // numberInt = Math.round(numberInt)
    // console.log(numberInt)
    try {
        let numberStrReturn = "";
        let numberStr = numberInt.toString();

        if (numberStr.length <= 3) {
            if (numberStr.length > 1) {
                if (numberStr[0] === "0") {
                    numberStr = numberStr.slice(1, numberStr.length);
                }
            }

            return numberStr;
        }

        let countNumber = 0;

        for (let i = numberStr.length - 1; i >= 0; i--) {
            if (countNumber === 3) {
                numberStrReturn = numberStr[i] + "." + numberStrReturn;
                countNumber = 1;
            } else {
                numberStrReturn = numberStr[i] + numberStrReturn;
                countNumber++;
            }
        }

        return numberStrReturn;
    } catch (error) {
        console.log(
            "file: textfield-format ~ formatNumberToMoney ~ error:",
            error
        );
    }
};

/**
 * format biến int sang dạng number, ví dụ: 1.000.000 -> 1000000
 * @param {string} numberStr string dạng money muốn chuyển sang int
 * @returns giá trị được chuyển sang money, nếu không chuyển được thì return NaN
 */
export const formatMoneyToNumber = (numberStr) => {
    try {
        let numberStrReturn = "";

        for (let i = 0; i < numberStr.length; i++) {
            if (numberStr[i] === ".") {
            } else {
                numberStrReturn += numberStr[i];
            }
        }

        let convertNumber = Number(numberStrReturn);
        if (countDecimalPlaces(convertNumber) > 0) {
            convertNumber = roundNumberTo2Digit(convertNumber)
        }
        if (isNaN(convertNumber)) {
            return NaN;
        } else if (convertNumber < 0) {
            return NaN;
        } else {
            return convertNumber;
        }
    } catch (error) {
        console.log(
            "file: textfield-format ~ formatMoneyToNumber ~ error:",
            error
        );
    }
};

/**
 * format chuỗi percent thành number 10,6 -> 10.6
 * @param {string} numberStr chuỗi có định dạng 10,6 hoặc 10
 * @returns giá trị đã được chuyển sang number, nếu không thể chuyển return NaN
 */
export const formatPercentToNumber = (numberStr) => {

    try {
        let numberStrReturn = "";

        for (let i = 0; i < numberStr.length; i++) {
            if (numberStr[i] === ",") {
                numberStrReturn += ".";
            } else {
                numberStrReturn += numberStr[i];
            }
        }

        let convertNumber = Number(numberStrReturn);
        if (countDecimalPlaces(convertNumber) > 0) {
            convertNumber = roundNumberTo2Digit(convertNumber)
        }
        if (isNaN(convertNumber)) {
            return NaN;
        } else if (convertNumber < 0) {
            return NaN;
        } else {
            return convertNumber;
        }
    } catch (error) {
        console.log(
            "file: textfield-format- ~ formatPercentToNumber ~ error:",
            error
        );
    }
};

/**
 * format chuỗi number thành percent 10.6 -> 10,6
 * @param {int} numberInt 1 số để chuyển
 * @returns giá trị đã được chuyển sang dạng percent
 */
export const formatNumberToPercent = (numberInt) => {
    try {
        let numberStrReturn = "";
        if (countDecimalPlaces(numberInt) > 0) {
            numberInt = roundNumberTo2Digit(numberInt)
        }
        let numberStr = numberInt.toString();

        let countComma = 0;

        for (let i = 0; i < numberStr.length; i++) {
            if (numberStr[i] === "." && countComma === 0) {
                numberStrReturn += ",";
                countComma++;
            } else {
                numberStrReturn += numberStr[i];
            }
        }

        if (numberStrReturn.length > 1) {
            if (numberStrReturn[0] === "0" && numberStrReturn[1] !== ",") {
                numberStrReturn = numberStrReturn.slice(1, numberStrReturn.length);
            }
        }

        return numberStrReturn;
    } catch (error) {
        console.log(
            "file: textfield-format- ~ formatNumberToPercent ~ error:",
            error
        );
    }
};

/**
 * tăng chuỗi percent lên 1 giá trị: 10,6 -> 11,6
 * @param {string} numberPercent chuỗi có định dạng percent 10,6
 * @returns percent tăng thêm 1
 */
export const plusPercent = (numberPercent) => {
    try {
        let numberStr = numberPercent.toString();

        let numberFormat = formatPercentToNumber(numberStr);
        let numberReturn = numberFormat + 1;
        let numberStrReturn = formatNumberToPercent(
            numberReturn.toFixed(countDecimalPlaces(numberFormat))
        );

        return numberStrReturn;
    } catch (error) {
        console.log(
            "file: textfield-format- ~ plusPercent ~ error:",
            error
        );
    }
};

/**
 * giảm chuỗi percent đi 1 giá trị: 10,6 -> 9,6
 * @param {string} numberPercent chuỗi có định dạng percent 10,6
 * @returns percent giảm đi 1
 */
export const minusPercent = (numberPercent) => {
    try {
        let numberStr = numberPercent.toString();

        let numberFormat = formatPercentToNumber(numberStr);
        let numberReturn = numberFormat - 1;
        let numberStrReturn = formatNumberToPercent(
            numberReturn.toFixed(countDecimalPlaces(numberFormat))
        );

        if (numberReturn < 0) {
            return numberStr;
        }

        return numberStrReturn;
    } catch (error) {
        console.log(
            "file: textfield-format- ~ minusPercent ~ error:",
            error
        );
    }
};



/**
 * chuyển định dạng % thành 1 số, ví dụ: 10% -> 10
 * @param {string} strPercent một chuỗi có định dạng 10%
 * @returns trả về số nguyên bỏ đi %
 */
export const convertPercentStrToNumber = (strPercent) => {
    try {
        return parseInt(strPercent.slice(0, strPercent.length - 1));
    } catch (error) {
        console.log(
            "file: textfield-format- ~ convertPercentStrToNumber ~ error:",
            error
        );
    }
};

export const roundNumberTo2Digit = (num) => {
    return Number((Math.round(num * 100) / 100).toFixed(2))
}

/**
 * chuyển 1222.4(decimal) = > 1.222,4(string format)
 * @param {decimal} deciNum một số dạng decimal
 * @returns trả về string chuỗi đã được format
 */

export const formatDeciToString = (deciNum) => {
    try {
        deciNum = roundNumberTo2Digit(deciNum)
        var deciString = deciNum.toString();
        var rightDeciNumStr = deciString.slice(deciString.length - countDecimalPlaces(deciString), deciString.length)
        var leftDeciNumStr = deciString.slice(0, deciString.length - rightDeciNumStr.length)
        var resultString = ''
        if (rightDeciNumStr.length > 0) {

            resultString = formatNumberToMoney(leftDeciNumStr) + ',' + rightDeciNumStr
        }
        else {
            resultString = formatNumberToMoney(leftDeciNumStr)
        }
        return resultString
    }
    catch (err) {
        console.log(
            "file: textfield-format ~ formatDeciToString ~ error:",
            err
        );
    }


}


/**
 * chuyển 1.222,4(string format) = >  1222.4(decimal)
 * @param {string} deciString một chuỗi có định dạng 1.222,4
 * @returns trả về số decimal dạng number decimal
 */
export const formatStringToDeci = (deciString) => {
    try {
        deciString = deciString.toString()
        var rightDeciNumStr = deciString.slice(deciString.length - countDecimalPlacesComma(deciString), deciString.length)
        var leftDeciNumStr = deciString.slice(0, deciString.length - rightDeciNumStr.length)
        var resultNum = formatToNumber(formatMoneyToNumber(leftDeciNumStr) + '.' + rightDeciNumStr)
        if (rightDeciNumStr.length <= 0) {

            resultNum = formatToNumber(formatMoneyToNumber(leftDeciNumStr))
        }
        resultNum = roundNumberTo2Digit(resultNum);
        return resultNum
    }
    catch (err) {
        console.log(
            "file: textfield-format ~ formatStringToDeci ~ error:",
            err
        );
    }

}
