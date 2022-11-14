const buttonNext = document.getElementById('button-next');
const buttonPrev = document.getElementById('button-prev');
const userList = document.getElementById('user-list');
const userTemplate = document.getElementById('user-template');
const currentPage = document.getElementById('cur-page');
const pageCount = document.getElementById('page-count-template');
const pageNumber = document.getElementById('page-number');

const form = document.getElementById('form');
const emailField = document.getElementById('email');
const firstNameField = document.getElementById('enter-first-name');
const lastNameField = document.getElementById('enter-last-name');
const jobField = document.getElementById('enter-job');
const buttonSend = document.getElementById('send-button');
const newUserList = document.getElementById('new-user-list');
const newUserTemplate = document.getElementById('new-user-template');

let count = 0;
let result, createdPerson;


const xhr = new XMLHttpRequest();

//open next page
buttonNext.addEventListener('click', (e) => {
	(count++) % count;
	createCountPageTemplete();
	if (!getRequestUsers()) {
		userList.innerText = `\nThere are no more users`;
		buttonNext.disabled = true;
		buttonPrev.disabled = false;
	} else {
		createUserListTemplate();
		blockZeroPage();
	}
});

//open previous page
buttonPrev.addEventListener('click', (e) => {
	(count--) % count;
	createCountPageTemplete();
	if (!getRequestUsers()) {
		userList.innerText = `\nThere are no more users`;
		if (count == 1) {
			buttonPrev.disabled = true;
		}
		buttonPrev.disabled = true;
		buttonNext.disabled = false;
	} else {
		createUserListTemplate();
		blockZeroPage();
	}
});

//block previous page if count = 0
function blockZeroPage() {
	if (count == 1) {
		buttonPrev.disabled = true;
	} else {
		buttonNext.disabled = false;
		buttonPrev.disabled = false;
	}
}

//get request
function getRequestUsers() {
	xhr.open('GET', `https://reqres.in/api/users/?page=${count}`, false);
	xhr.send();
	result = JSON.parse(xhr.response);

	if (result.data.length !== 0 && count > 0) {
		return result;
	} else {
		return false;
	}
}

//create pagination
function createCountPageTemplete() {
	const everyPageCount = pageCount.innerHTML;
	const newPagecount = everyPageCount.replace('{{number}}', count);
	pageNumber.innerText = '';
	pageNumber.insertAdjacentHTML('beforeend',
		`${newPagecount}`);
}

//create html-element with user info
function createUserListTemplate() {
	const userListTemplate = userTemplate.innerHTML;
	let newArr = result.data;
	userList.innerText = '';
	newArr.forEach(element => {
		const newUserListTemplate = userListTemplate.replace('{{avatar}}', element.avatar)
			.replace('{{email}}', element.email)
			.replace('{{first-name}}', element.first_name)
			.replace('{{last-name}}', element.last_name);
		userList.insertAdjacentHTML('beforeend',
			`${newUserListTemplate}`);
	});
}


const xhrCreate = new XMLHttpRequest();

//send form data
buttonSend.addEventListener('click', () => {
	createNewUserListTemplate();
	emailField.value = '';
	firstNameField.value = '';
	lastNameField.value = '';
	jobField.value = '';
});

//send POST request
function sendPostRequest() {
	xhrCreate.open('POST', 'https://reqres.in/api/users', false);
	xhrCreate.setRequestHeader('Content-type', 'application/json');
	xhrCreate.send(JSON.stringify(
		{
			"email": `${emailField.value}`,
			"first_name": `${firstNameField.value}`,
			"last_name": `${lastNameField.value}`,
			"job": `${jobField.value}`,
		}
	));
	createdPerson = JSON.parse(xhrCreate.response);
	return createdPerson;
}

//create new list template, change template variables
function createNewUserListTemplate() {
	sendPostRequest();
	const createdListTemplate = newUserTemplate.innerHTML;
	const newCreatedListTemplate = createdListTemplate.replace('{{email}}', createdPerson.email)
		.replace('{{first-name}}', createdPerson.first_name)
		.replace('{{last-name}}', createdPerson.last_name)
		.replace('{{job}}', createdPerson.job);
	newUserList.insertAdjacentHTML('beforeend',
		`${newCreatedListTemplate}`);
}


