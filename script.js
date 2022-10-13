const inputLabel = document.getElementById('inputLabel');
const inputText = document.getElementById('inputText');
const formResult = document.getElementById('form__result');
const buttonAdd = document.getElementById('buttonAdd');
const errorArea = document.getElementById('errorArea');

let i = 0;
let j = 0;
let btnIdCounter = 0;
let m = 0;
function iterator() {
	return ++m;
}
let CreateCheckboxID = iterator;
console.log(fff())








//добавление элемента списка
buttonAdd.addEventListener('click', () => {
	if (inputLabel.value.match(/^[ ]+$/) && inputText.value.match(/^[ ]+$/)) {
		inputLabel.value = '';
		inputText.value = '';
		errorArea.innerHTML = '<p class="red-text">Введены пробелы! Элемент не добавлен!</p>';
	} else if (inputLabel.value == '' && inputText.value == '') {
		errorArea.innerHTML = '<p class="red-text">Заполните все поля!</p>';
	} else {
		errorArea.innerHTML = '';
		formResult.insertAdjacentHTML('beforeend',
			`<input type="checkbox" id="todo-${iterator()}">
                <label for="todo-${++j}" id="label-${j}">
                    <span class="label-text">${inputLabel.value}</span>
                    <span class= "main-todo-text" > ${inputText.value}</span>
                </label> 
                <button id="del-btn-${++btnIdCounter}" class="not-active">Удалить</button><br>`);
		inputLabel.value = '';
		inputText.value = '';

		//получаю в константы созданный элемент с чекбоксом
		const checkboxElem = document.getElementById(`todo-${i}`);
		const labelForCheckbox = document.getElementById(`label-${j}`);
		const buttonId = document.getElementById(`del-btn-${btnIdCounter}`);


		//проверка выбранного чекбокса, скрыть\показать кнопку "Удалить"
		checkboxElem.addEventListener('click', checkCheckbox(labelForCheckbox.children, checkboxElem, buttonId, labelForCheckbox));
	}
});



function checkCheckbox(obj, element, button, label) {
	const labelChildren = Object.values(obj);
	console.log(labelChildren);
	if (element.checked) {
		labelChildren.forEach((el) => {
			el.classList.add('checked');
			console.log(labelChildren);
			button.classList.remove('not-active');

			//удаление элемента списка если но выбран
			button.addEventListener('click', () => {
				element.remove(); //del checkbox
				button.nextElementSibling.remove(); //del <br>
				label.remove(); //del checkbox description
				button.remove();//del button
			});
		})
	} else {

		labelChildren.forEach((el) => {
			el.classList.remove('checked');
			button.classList.add('not-active');
		});
	}
}

//checkCheckbox(Object.values(labelForCheckbox.children), checkboxElem, buttonId, labelForCheckbox);





// const inputLabel = document.getElementById('inputLabel');
// const inputText = document.getElementById('inputText');
// const formResult = document.getElementById('form__result');
// const buttonAdd = document.getElementById('buttonAdd');
// const errorArea = document.getElementById('errorArea');

// let i = 0;
// let j = 0;
// let btnIdCounter = 0;

// //добавление элемента списка
// buttonAdd.addEventListener('click', () => {
// 	if (inputLabel.value.match(/^[ ]+$/) && inputText.value.match(/^[ ]+$/)) {
// 		inputLabel.value = '';
// 		inputText.value = '';
// 		errorArea.innerHTML = '<p class="red-text">Введены пробелы! Элемент не добавлен!</p>';
// 	} else if (inputLabel.value == '' && inputText.value == '') {
// 		errorArea.innerHTML = '<p class="red-text">Заполните все поля!</p>';
// 	} else {
// 		errorArea.innerHTML = '';
// 		formResult.insertAdjacentHTML('beforeend',
// 			`<input type="checkbox" id="todo-${++i}">
//             <label for="todo-${++j}" id="label-${j}">
//                <span class="label-text">${inputLabel.value}</span>
//                <span class= "main-todo-text" > ${inputText.value}</span>
//             </label>
//             <button id="del-btn-${++btnIdCounter}" class="not-active">Удалить</button><br>`);
// 		inputLabel.value = '';
// 		inputText.value = '';

// 		//получаю в константы созданный элемент с чекбоксом
// 		const checkboxElem = document.getElementById(`todo-${i}`);
// 		const labelForCheckbox = document.getElementById(`label-${j}`);
// 		const buttonId = document.getElementById(`del-btn-${btnIdCounter}`);

// 		//проверка выбранного чекбокса, скрыть\показать кнопку "Удалить"
// 		checkboxElem.addEventListener('click', () => {
// 			const labelChildren = Object.values(labelForCheckbox.children);

// 			if (checkboxElem.checked) {
// 				labelChildren.forEach((el) => {
// 					el.classList.add('checked');
// 					buttonId.classList.remove('not-active');

// 					//удаление элемента списка если но выбран
// 					buttonId.addEventListener('click', () => {
// 						checkboxElem.remove(); //del checkbox
// 						buttonId.nextElementSibling.remove(); //del <br>
// 						labelForCheckbox.remove(); //del checkbox description
// 						buttonId.remove();//del button
// 					});
// 				})
// 			} else {

// 				labelChildren.forEach((el) => {
// 					el.classList.remove('checked');
// 					buttonId.classList.add('not-active');
// 				});
// 			}
// 		});
// 	}
// });
