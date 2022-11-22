const buttonNext = document.getElementById('button-next');
const buttonPrev = document.getElementById('button-prev');
const userList = document.getElementById('user-list');
const userTemplate = document.getElementById('user-template');
const currentPage = document.getElementById('cur-page');
const pageCount = document.getElementById('page-count-template');
const pageNumber = document.getElementById('page-number');
const authorizatedContent = document.getElementById('content-block');
const loginForm = document.getElementById('login-block');
const form = document.getElementById('form');
const emailField = document.getElementById('email');
const passwordField = document.getElementById('password');
const lastNameField = document.getElementById('enter-last-name');
const buttonLogin = document.getElementById('login-button');
const newUserList = document.getElementById('new-user-list');
const newUserTemplate = document.getElementById('new-user-template');
const messageBlock = document.getElementById('message-block');
const errorBlock = document.getElementById('error-block');
const cancelButton = document.getElementById('edited-elem-cancel');
const navBlock = document.getElementById('nav-block');


let count = 1;
let result, createdPerson;
let delButId = [];
let editButId = [];


const xhr = new XMLHttpRequest();


function openFirstPage() {
	if (!getRequestUsers()) {
		userList.innerText = `\nThere are no more users`;
		buttonNext.disabled = true;
		buttonPrev.disabled = false;
	} else {
		createUserListTemplate();
		deleteElem();
		editElem();
		blockZeroPage();
	}
}

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
		deleteElem();
		editElem();
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
		deleteElem();
		editElem();
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

function createUserListTemplate() {
	const userListTemplate = userTemplate.innerHTML;
	let newArr = result.data;
	userList.innerText = '';
	newArr.forEach((element) => {
		const newUserListTemplate = userListTemplate.replace('{{avatar}}', element.avatar)
			.replace('{{email}}', element.email)
			.replace('{{first-name}}', element.first_name)
			.replace('{{last-name}}', element.last_name)
			.replaceAll('{{id}}', element.id);
		userList.insertAdjacentHTML('beforeend',
			`${newUserListTemplate}`);
		editButId.push(document.getElementById(`edit-button-${element.id}`));
		delButId.push(document.getElementById(`delete-button-${element.id}`));
		return [...editButId, ...delButId];
	});
}

const xhrCreate = new XMLHttpRequest();

//login and password for successful authorization
console.log('eve.holt@reqres.in')
console.log('cityslicka')

//login user
function sendPostRequest() {
	xhrCreate.open('POST', 'https://reqres.in/api/login', true);
	xhrCreate.setRequestHeader('Content-type', 'application/json');
	xhrCreate.send(JSON.stringify(
		{
			email: emailField.value,
			password: passwordField.value
		}
	));

	xhrCreate.onload = (event) => {
		if (event.currentTarget.status === 200) {
			try {
				createdPerson = JSON.parse(event.currentTarget.response);
				authorizatedContent.classList.remove('hidden');
				navBlock.classList.remove('hidden');
				loginForm.classList.add('hidden');
				createCountPageTemplete();
				openFirstPage();
				emailField.value = '';
				passwordField.value = '';
			} catch (error) {
				console.log(`Something gone wrong\n ${error}`)
			}
		}
		if (event.currentTarget.status === 400) {
			errorBlock.innerText = 'Wrong password or email. No such user!';
		}
		if (event.currentTarget.status === 500) {
			errorBlock.innerText = 'Server Error. Try again Later.';
		}
	}
};

buttonLogin.addEventListener('click', () => {
	sendPostRequest();
});


//delete user item
function deleteElem() {
	[...delButId].forEach((element) => {
		element.addEventListener('click', (event) => {
			const currentButton = document.getElementById(event.target.parentElement.id);
			sendDeleteRequest(currentButton);
		});
	});
}

//edit info in user item
function editElem() {
	[...editButId].forEach((element) => {
		element.addEventListener('click', (event) => {
			const currentButton = document.getElementById(event.target.parentElement.id);
			const editElementForm = document.getElementById('edit-elem');
			editElementForm.classList.remove('hidden');
			document.getElementById('edit-avatar').value = currentButton.children[0].currentSrc;
			document.getElementById('edit-email').value = currentButton.children[2].innerText;
			document.getElementById('edit-first-name').value = currentButton.children[4].innerText;
			document.getElementById('edit-last-name').value = currentButton.children[6].innerText;
			const sendChangesButton = document.getElementById('edited-elem-send');
			saveEditChanges(sendChangesButton, currentButton, editElementForm);
			cancelEditWindow(editElementForm);
		})
	})
}

//cancel edit window
function cancelEditWindow(editElementForm) {
	cancelButton.addEventListener('click', () => {
		editElementForm.classList.add('hidden');
	});
}

//save changes after edition 
function saveEditChanges(sendChangesButton, currentButton, editElementForm) {
	sendChangesButton.addEventListener('click', () => {
		const editAvatar = document.getElementById('edit-avatar').value;
		const editEmail = document.getElementById('edit-email').value;
		const editFirstName = document.getElementById('edit-first-name').value;
		const editLastName = document.getElementById('edit-last-name').value;
		checkEmptyFields(editAvatar, editEmail, editFirstName, editLastName, currentButton, editElementForm);
	});
}

//checking empty fields in edit form
function checkEmptyFields(editAvatar, editEmail, editFirstName, editLastName, currentButton, editElementForm) {
	if (editAvatar !== '' && editEmail !== '' && editFirstName !== '' && editLastName !== '') {
		sendEditRequest(editAvatar, editEmail, editFirstName, editLastName, currentButton, editElementForm);
	} else {
		console.log('don\'t leave empty fields');
	}
}

//send edit request
function sendEditRequest(editAvatar, editEmail, editFirstName, editLastName, currentButton, editElementForm) {
	xhr.open('PATCH', `https://reqres.in/api/users/2`, true);
	xhr.setRequestHeader('Content-type', 'application/json');
	xhr.send(JSON.stringify({
		avatar: editAvatar,
		email: editEmail,
		first_name: editFirstName,
		last_name: editLastName
	}));
	xhr.onload = () => {
		let result = JSON.parse(xhr.status);
		if (result === 200) {
			try {
				currentButton.children[0].src = editAvatar;
				currentButton.children[2].innerText = editEmail;
				currentButton.children[4].innerText = editFirstName;
				currentButton.children[6].innerText = editLastName;
				editElementForm.classList.add('hidden');
				setTimeout(() => {
					messageBlock.innerText = '';
				}, 2000);
				messageBlock.innerText = 'User info successfully updated!';
			} catch (error) {
				setTimeout(() => {
					messageBlock.innerText = '';
				}, 2500);
				messageBlock.innerText = 'User info NOT updated! User has been deleted!';
				editElementForm.classList.add('hidden');
			}
		}
		if (result === 400) {
			console.log('you did something wrong')
		}
	}
}

// send delete request
function sendDeleteRequest(currentButton) {
	xhr.open('DELETE', `https://reqres.in/api/users/2`, true);
	xhr.send();
	xhr.onload = () => {
		let result = JSON.parse(xhr.status);
		if (result === 204) {
			currentButton.innerHTML = '';
			currentButton.classList.value = '';
			currentButton.outerHTML = '';
			setTimeout(() => {
				messageBlock.innerText = '';
			}, 2000)
			messageBlock.innerText = 'User successfully deleted!'
		}
	}
}