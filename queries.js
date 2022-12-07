import * as variablesData from './variables.js';
import {
	count,
	result,
	delButId,
	editButId,
	createUserListTemplate,
	deleteElem,
	editElem,
	logIn
} from './script.js';

import {
	blockZeroPage,
	checkGotUserList,
	checkEmptyFields,
} from './verification.js';


//login user
function sendPostRequest() {
	if (localStorage.getItem('token')) {
		logIn();
	} else {
		fetch('https://reqres.in/api/login', {
			method: 'POST',
			body: JSON.stringify({
				email: variablesData.default.emailField.value,
				password: variablesData.default.passwordField.value
			}),
			headers: {
				'content-type': 'application/json'
			}
		})
			.then(response => response.json())
			.then(response => {
				if (response.token) {
					localStorage.setItem('token', response.token);
					logIn();
					return response.token;
				} else {
					variablesData.default.errorBlock.innerText = 'No such user! Wrong password or email.';
				}
			})
			.catch(error => {
				console.error(error);
				variablesData.default.errorBlock.innerText = 'No such user! Wrong password or email.';
			})
	}
}

//get request
function getRequestUsers() {
	fetch(`https://reqres.in/api/users/?page=${count}`)
		.then(response => response.json())
		.then(response => {

			if (!checkGotUserList(response.data)) {
				variablesData.default.userList.innerText = `\nThere are no more users`;
				variablesData.default.buttonNext.disabled = true;
				variablesData.default.buttonPrev.disabled = false;
			} else {
				createUserListTemplate(response.data);
				deleteElem();
				editElem();
				blockZeroPage();
			}
		})
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
			variablesData.default.editElementContainer.classList.add('hidden');
			setTimeout(() => {
				variablesData.default.messageBlock.innerText = '';
			}, 2000);
			variablesData.default.messageBlock.innerText = 'User info successfully updated!';
		})
		.catch(error => {
			setTimeout(() => {
				variablesData.default.messageBlock.innerText = '';
			}, 3000);
			variablesData.default.messageBlock.innerText = 'User info NOT updated! User has been deleted!';//wtf!!!!!
			variablesData.default.editElementContainer.classList.add('hidden');
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
				variablesData.default.messageBlock.innerText = '';
			}, 2000)
			variablesData.default.messageBlock.innerText = 'User successfully deleted!'
		})
}

export {
	sendDeleteRequest,
	sendEditRequest,
	sendPostRequest,
	getRequestUsers
}