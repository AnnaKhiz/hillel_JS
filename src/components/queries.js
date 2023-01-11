import {constData} from './constants.js';
import {
	count,
	createUserListTemplate,
	deleteElem,
	editElem,
	logIn
} from '../script.js';

import { blockZeroPage, checkGotUserList } from './verification.js';


//login user
function sendPostRequest() {
	if (localStorage.getItem('token')) {
		logIn();
	} else {
		fetch('https://reqres.in/api/login', {
			method: 'POST',
			body: JSON.stringify({
				email: constData.emailField.value,
				password: constData.passwordField.value
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
					constData.errorBlock.innerText = 'No such user! Wrong password or email.';
				}
			})
			.catch(error => {
				console.error(error);
				constData.errorBlock.innerText = 'No such user! Wrong password or email.';
			})
	}
}

//get request
function getRequestUsers() {
	fetch(`https://reqres.in/api/users/?page=${count}`)
		.then(response => response.json())
		.then(response => {

			if (!checkGotUserList(response.data)) {
				constData.userList.innerText = `\nThere are no more users`;
				constData.buttonNext.disabled = true;
				constData.buttonPrev.disabled = false;
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
			constData.editElementContainer.classList.add('hidden');
			setTimeout(() => {
				constData.messageBlock.innerText = '';
			}, 2000);
			constData.messageBlock.innerText = 'User info successfully updated!';
		})
		.catch(error => {
			setTimeout(() => {
				constData.messageBlock.innerText = '';
			}, 3000);
			constData.messageBlock.innerText = 'User info NOT updated! User has been deleted!';//wtf!!!!!
			constData.editElementContainer.classList.add('hidden');
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
				constData.messageBlock.innerText = '';
			}, 2000)
			constData.messageBlock.innerText = 'User successfully deleted!'
		})
}

export {
	sendDeleteRequest,
	sendEditRequest,
	sendPostRequest,
	getRequestUsers
}