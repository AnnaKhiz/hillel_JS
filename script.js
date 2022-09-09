const newArr = [];
const checkArr = [1, '34444', 2, 'hello', 4, 8, null, undefined, [1, 5, 8], '', 9, {}, NaN, 12, -457, 0, '5'];
const noNum = ['dfdfg', undefined, 'asdfadg345456', '445zfgnxfghmfhmzfhm46', null];
const arr = [1, 2, 3, 4, 5];
let string = 'hello';
let newString = '';
let number, newNumber;
const newStringArray = [];
const utils = {
	reverse: (source) => {
		if (Array.isArray(source)) {
			for (i = 0; i < source.length; i++) {
				newArr[i] = source[(source.length - 1) - i];
			}
			return newArr;
		} else {
			for (i = source.length - 1; i >= 0; i--) {
				newString += source[i];
			}
			return newString;
		}
	},
	verifyNumbers: (source) => {
		if (Array.isArray(source)) {
			for (i = 0; i <= source.length; i++) {
				if (typeof (source[i]) == 'number' && !isNaN(source[i])) {
					newArr.push(source[i]);
				}
			}
			return newArr;
		}
	},
	getMin: (source) => {
		if (Array.isArray(source)) {
			number = source[0];
			for (i = 0; i < source.length; i++) {
				if (typeof (source[i]) == 'number' && !isNaN(source[i])) {
					if (number > source[i]) {
						number = source[i];
					}
				}
			}
		}
		return number;
	},
	getAverage: (source) => {
		if (Array.isArray(source)) {
			number = 0;
			utils.verifyNumbers(source);
			console.log(newArr);
			for (i = 0; i < newArr.length; i++) {
				number += newArr[i];
				console.log(number);
			}
			newNumber = number / newArr.length;
		}
		return newNumber;
	},
	getMaxString: (source) => {
		if (Array.isArray(source)) {
			newString = '';
			for (i = 0; i < source.length; i++) {
				if (typeof (source[i]) == 'string') {
					if (newString.length < source[i].length) {
						newString = source[i];
					}
				}
			}
		}
		return newString;
	}
}
//console.log(utils.reverse(arr));
//console.log(utils.verifyNumbers(checkArr));
//console.log(utils.getMin(arr));
//console.log(utils.getAverage(arr));
//console.log(utils.getMaxString(noNum));
