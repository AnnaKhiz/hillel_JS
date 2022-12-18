import { CONSTANTS } from '/modules/constants.js';
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
				email: CONSTANTS.EMAIL_FIELD.value,
				password: CONSTANTS.PASSWORD_FIELD.value
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
					CONSTANTS.ERROR_BLOCK.innerText = 'No such user! Wrong password or email.';
				}
			})
			.catch(error => {
				console.error(error);
				CONSTANTS.ERROR_BLOCK.innerText = 'No such user! Wrong password or email.';
			})
	}
}

//get request
function getRequestUsers() {
	fetch(`https://reqres.in/api/users/?page=${count}`)
		.then(response => response.json())
		.then(response => {

			if (!checkGotUserList(response.data)) {
				CONSTANTS.USER_LIST.innerText = `\nThere are no more users`;
				CONSTANTS.BUTTON_NEXT.disabled = true;
				CONSTANTS.BUTTON_PREV.disabled = false;
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
			CONSTANTS.EDIT_ELEMENT_CONTAINER.classList.add('hidden');
			setTimeout(() => {
				CONSTANTS.MESSAGE_BLOCK.innerText = '';
			}, 2000);
			CONSTANTS.MESSAGE_BLOCK.innerText = 'User info successfully updated!';
		})
		.catch(error => {
			setTimeout(() => {
				CONSTANTS.MESSAGE_BLOCK.innerText = '';
			}, 3000);
			CONSTANTS.MESSAGE_BLOCK.innerText = 'User info NOT updated! User has been deleted!';//wtf!!!!!
			CONSTANTS.EDIT_ELEMENT_CONTAINER.classList.add('hidden');
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
				CONSTANTS.MESSAGE_BLOCK.innerText = '';
			}, 2000)
			CONSTANTS.MESSAGE_BLOCK.innerText = 'User successfully deleted!'
		})
}

export {
	sendDeleteRequest,
	sendEditRequest,
	sendPostRequest,
	getRequestUsers
}