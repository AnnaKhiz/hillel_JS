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
const navBlock = document.getElementById('nav-block');
const editElementContainer = document.getElementById('edit-elem');

let count = 1;
let result, createdPerson;
let delButId = [];
let editButId = [];

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
	fetch(`https://reqres.in/api/users/?page=${count}`)
		.then(response => response.json())
		.then(response => {
			result = response.data;
			return result;
		})
		.then(result => {
			if (!checkGotUserList(result)) {
				userList.innerText = `\nThere are no more users`;
				buttonNext.disabled = true;
				buttonPrev.disabled = false;
			} else {
				createUserListTemplate();
				deleteElem();
				editElem();
				blockZeroPage();
			}
		})
}

function checkGotUserList(result) {
	if (result.length !== 0 && count > 0) {
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
	let newArr = result;
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

//login and password for successful authorization
console.log('eve.holt@reqres.in')
console.log('cityslicka')

//login user
function sendPostRequest() {
	fetch('https://reqres.in/api/login', {
		method: 'POST',
		body: JSON.stringify({
			email: emailField.value,
			password: passwordField.value
		}),
		headers: {
			'content-type': 'application/json'
		}
	})
		.then(response => {
			if (response.status === 200)
				return response
		})
		.then(response => {
			if (response) {
				authorizatedContent.classList.remove('hidden');
				navBlock.classList.remove('hidden');
				loginForm.classList.add('hidden');
				createCountPageTemplete();
				getRequestUsers();
				emailField.value = '';
				passwordField.value = '';
			} else {
				errorBlock.innerText = 'No such user! Wrong password or email.';
			}
		})
		.catch(error => {
			console.error(error);
			errorBlock.innerText = 'No such user! Wrong password or email.';
		})
}

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
			const editElementForm = document.getElementById('edit-form-template').innerHTML;
			const newEditElementForm = editElementForm.replaceAll('{{id}}', element.id);
			editElementContainer.classList.remove('hidden');
			editElementContainer.innerHTML = newEditElementForm;
			document.getElementById('edit-avatar').value = currentButton.children[0].currentSrc;
			document.getElementById('edit-email').value = currentButton.children[2].innerText;
			document.getElementById('edit-first-name').value = currentButton.children[4].innerText;
			document.getElementById('edit-last-name').value = currentButton.children[6].innerText;
			const sendChangesButton = document.getElementById('edited-elem-send');
			const cancelButton = document.getElementById('edited-elem-cancel');
			saveEditChanges(sendChangesButton, currentButton, newEditElementForm);
			cancelEditWindow(editElementContainer, cancelButton);
		})
	})
}

//cancel edit window
function cancelEditWindow(editElementContainer, cancelButton) {
	cancelButton.addEventListener('click', () => {
		editElementContainer.classList.add('hidden');
		messageBlock.innerText = '';
	});
}

//save changes after edition 
function saveEditChanges(sendChangesButton, currentButton, newEditElementForm) {
	sendChangesButton.addEventListener('click', () => {
		const editAvatar = document.getElementById('edit-avatar').value;
		const editEmail = document.getElementById('edit-email').value;
		const editFirstName = document.getElementById('edit-first-name').value;
		const editLastName = document.getElementById('edit-last-name').value;
		checkEmptyFields(editAvatar, editEmail, editFirstName, editLastName, currentButton, newEditElementForm);
	});
}

//checking empty fields in edit form
function checkEmptyFields(editAvatar, editEmail, editFirstName, editLastName, currentButton, newEditElementForm) {
	if (editAvatar !== '' && editEmail !== '' && editFirstName !== '' && editLastName !== '') {
		sendEditRequest(editAvatar, editEmail, editFirstName, editLastName, currentButton, newEditElementForm);
	} else {
		messageBlock.innerText = 'Don\'t leave empty fields!';
	}
}

//send edit request
function sendEditRequest(editAvatar, editEmail, editFirstName, editLastName, currentButton, newEditElementForm) {
	fetch(`https://reqres.in/api/users/2`, {
		method: 'PATCH',
		body: JSON.stringify({
			avatar: editAvatar,
			email: editEmail,
			first_name: editFirstName,
			last_name: editLastName
		}),
		headers: {
			'content-type': 'application/json'
		}
	})
		.then(response => {
			currentButton.children[0].src = editAvatar;
			currentButton.children[2].innerText = editEmail;
			currentButton.children[4].innerText = editFirstName;
			currentButton.children[6].innerText = editLastName;
			editElementContainer.classList.add('hidden');
			setTimeout(() => {
				messageBlock.innerText = '';
			}, 2000);
			messageBlock.innerText = 'User info successfully updated!';
		})
		.catch(error => {
			setTimeout(() => {
				messageBlock.innerText = '';
			}, 3000);
			messageBlock.innerText = 'User info NOT updated! User has been deleted!';
			editElementContainer.classList.add('hidden');
		})
}

// send delete request
function sendDeleteRequest(currentButton) {
	fetch(`https://reqres.in/api/users/2`, {
		method: 'DELETE'
	})
		.then(response => {
			currentButton.innerHTML = '';
			currentButton.classList.value = '';
			currentButton.outerHTML = '';
			setTimeout(() => {
				messageBlock.innerText = '';
			}, 2000)
			messageBlock.innerText = 'User successfully deleted!'
		})
}