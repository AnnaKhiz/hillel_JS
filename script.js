const inputLabel = document.getElementById('inputLabel');
const inputText = document.getElementById('inputText');
const formResult = document.getElementById('form__result');
const buttonAdd = document.getElementById('buttonAdd');
const errorArea = document.getElementById('errorArea');

//функция счетчик
function iterator() {
	let i = 0;
	return () => {
		return ++i;
	};
}

let createCheckboxId = iterator();
let createLabelFor = iterator();
let createLabelId = iterator();
let createButtonId = iterator();
let getCheckboxId = iterator();
let getLabelId = iterator();
let getButtonId = iterator();

//основная функция/событие
buttonAdd.addEventListener('click', () => {
	if (checkEmptyFields()) {
		errorArea.innerHTML = '';
		createNewItemEvent();
		let [checkboxElem, labelForCheckbox, buttonId] = getCreateTodoItem();
		//проверка выбранного чекбокса, скрыть\показать кнопку "Удалить", удаление элемента списка
		checkboxElem.addEventListener('click', () => {
			isCheckboxChecked(checkboxElem, labelForCheckbox, buttonId, deleteItemEvent(checkboxElem, labelForCheckbox, buttonId));
		});
	} else {
		console.error('Empty fields!');
	}
});


//получаю в константы созданный элемент с чекбоксом
function getCreateTodoItem() {
	let checkboxElem = document.getElementById(`todo-${getCheckboxId()}`);
	let labelForCheckbox = document.getElementById(`label-${getLabelId()}`);
	let buttonId = document.getElementById(`del-btn-${getButtonId()}`);
	return [checkboxElem, labelForCheckbox, buttonId];
}

//событие создания элемента списка
function createNewItemEvent() {
	formResult.insertAdjacentHTML('beforeend',
		`<input type="checkbox" id="todo-${createCheckboxId()}">
		<label for="todo-${createLabelFor()}" id="label-${createLabelId()}">
			<span class="label-text">${inputLabel.value}</span>
			<span class= "main-todo-text" > ${inputText.value}</span>
		</label> 
		<button id="del-btn-${createButtonId()}" class="not-active">Удалить</button><br>`);
	inputLabel.value = '';
	inputText.value = '';
}

//проверяю заполнение полей
function checkEmptyFields() {
	if (inputLabel.value.match(/^[ ]+$/) && inputText.value.match(/^[ ]+$/)) {
		inputLabel.value = '';
		inputText.value = '';
		errorArea.innerHTML = '<p class="red-text">Введены пробелы! Элемент не добавлен!</p>';
		return false;
	} else if (inputLabel.value == '' && inputText.value == '') {
		errorArea.innerHTML = '<p class="red-text">Заполните все поля!</p>';
		return false;
	} else {
		return true;
	}
}

//функция удаления элемента списка
function deleteItemEvent(checkbox, label, button) {
	button.addEventListener('click', () => {
		checkbox.remove(); //del checkbox
		button.nextElementSibling.remove(); //del <br>
		label.remove(); //del checkbox description
		button.remove();//del button
	});
}

//функция проверки выбран/не выбран чекбокс
function isCheckboxChecked(checkbox, label, button, deleteItemEvent) {
	const labelChildren = Object.values(label.children);
	if (checkbox.checked) {
		labelChildren.forEach((el) => {
			el.classList.add('checked');
			button.classList.remove('not-active');
			//удаление элемента списка если он выбран (передаю аргументом функцию deleteItemEvent())
			deleteItemEvent;
		})
	} else {
		labelChildren.forEach((el) => {
			el.classList.remove('checked');
			button.classList.add('not-active');
		});
	}
}
