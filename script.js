/*
1. Реализовать функцию фильтрации isBetween(min, max); 
Пользователь задает значения min, max с окна ввода. 
Валидировать значение min, max.
*/

let operation, firstDigit, secondDigit, min, max;

function checkMinMax() {
	min = prompt('Enter min digit');
	max = prompt('Enter max digit');
	if (isNaN(min)) {
		alert('It\'s not a digit!');
	} else if (min == '' || min.match(/^[ ]+$/)) {
		alert('The field is empty');
	}
	if (isNaN(max)) {
		alert('It\'s not a digit!');
	} else if (max == '' || max.match(/^[ ]+$/)) {
		alert('The field is empty');
	}
	return [min, max];
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

const getEnteredNumbers = checkMinMax();
function isBetween(min, max) {
	minNumber = getEnteredNumbers[0];
	maxNumber = getEnteredNumbers[1];
	for (let i = 0; i <= arr.length; i++) {
		if (arr[i] < min && arr[i] > max) {
			return false;
		}
	}
	return min >= minNumber && max < maxNumber;
}

console.log(arr.filter(isBetween));

/* 
2. Реализовать функцию calculate(operation)(a)(b). 
Пользователь указывает нужную ему операцию (+, -, *, /, pow), указывает первый операнд, указывает второй операнд. 
Все вводимые значения валидировать.
calculation(pow)(2)(3) => 8.
*/


function checkDigits() {
	if (isNaN(firstDigit)) {
		alert('It\'s not a digit!');
	} else if (firstDigit == '' || firstDigit.match(/^[ ]+$/)) {
		alert('The field is empty');
	}
	if (isNaN(secondDigit)) {
		alert('It\'s not a digit!');
	} else if (secondDigit == '' || secondDigit.match(/^[ ]+$/)) {
		alert('The field is empty');
	}
	return [firstDigit, secondDigit];
}


function checkOperation(operation, firstDigit, secondDigit) {
	switch (operation.trim()) {
		case '+':
			result = +firstDigit + +secondDigit;
			break;
		case '-':
			result = firstDigit - secondDigit;
			break;
		case '*':
			result = firstDigit * secondDigit;
			break;
		case '/':
			if (secondDigit == 0) {
				alert('Error! Сan\'t be divided by 0!');
			} else {
				result = firstDigit / secondDigit;
			};
			break;
		case 'pow':
			result = Math.pow(firstDigit, secondDigit);
			break;
		default:
			alert('Entered operation is wrong!');
	}
	return result;
}

function calculate(operation) {
	operation = prompt('Check operation: "+", "-", "*", "/", "pow"');
	firstDigit = prompt('Enter first digit');
	secondDigit = prompt('Enter second digit');
	return function (firstDigit) {
		let getDigits = checkDigits();
		firstDigit = getDigits[0];
		return function (secondDigit) {
			secondDigit = getDigits[1];
			return checkOperation(operation, firstDigit, secondDigit);
		}
	}
}

//alert(`Result: ${calculate(operation)(firstDigit)(secondDigit)}`);


/*
3. Реализовать функцию сортировки sortByField(fieldName, sortType) для списка товаров с полями name, price, quantity.
sortType возможные значения: asc, desc - по возрастанию, по убыванию соответственно.
*/

const products = [
	{ name: 'Product 1', quantity: 10, price: 25 },
	{ name: 'Product 2', quantity: 3, price: 55 },
	{ name: 'Product 3', quantity: 22, price: 35 },
]

function sortByField(fieldName, sortType) {
	switch (sortType) {
		case 'desc':
			return sortByField(fieldName).desc();
		case 'asc':
			return sortByField(fieldName).asc();
	}
	return {
		desc() {
			return (a, b) => a[fieldName] < b[fieldName] ? 1 : -1;
		},
		asc() {
			return (a, b) => a[fieldName] > b[fieldName] ? 1 : -1;
		}
	}
}

console.log(products.sort(sortByField('price', 'asc')));
