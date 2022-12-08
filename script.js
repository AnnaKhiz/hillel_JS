//login and password for successful authorization
console.log('eve.holt@reqres.in')
console.log('cityslicka')

import { CONSTANTS } from './modules/constants.js';
import {
	createCountPageTemplete,
	createUserListTemplate,
} from './modules/templates.js';

import {
	sendDeleteRequest,
	sendPostRequest,
	getRequestUsers,
} from './modules/queries.js';

import {
	blockZeroPage,
	checkGotUserList,
	checkEmptyFields,
} from './modules/verification.js';

let count = 1;
let result;
let delButId = [];
let editButId = [];


(function checkLogIn() {
	if (localStorage.getItem('token')) {
		CONSTANTS.LOGIN_FORM.classList.add('hidden');
		logIn();
	}
})()

//open next page
CONSTANTS.BUTTON_NEXT.addEventListener('click', (e) => {
	(count++) % count;
	createCountPageTemplete();
	if (!getRequestUsers()) {
		CONSTANTS.USER_LIST.innerText = `\nThere are no more users`;
		CONSTANTS.BUTTON_NEXT.disabled = true;
		CONSTANTS.BUTTON_PREV.disabled = false;
	} else {
		createUserListTemplate();
		deleteElem();
		editElem();
		blockZeroPage();
	}
});

//open previous page
CONSTANTS.BUTTON_PREV.addEventListener('click', (e) => {
	(count--) % count;
	createCountPageTemplete();
	if (!getRequestUsers()) {
		CONSTANTS.USER_LIST.innerText = `\nThere are no more users`;
		if (count == 1) {
			CONSTANTS.BUTTON_PREV.disabled = true;
		}
		CONSTANTS.BUTTON_PREV.disabled = true;
		CONSTANTS.BUTTON_NEXT.disabled = false;
	} else {
		createUserListTemplate();
		blockZeroPage();
		deleteElem();
		editElem();
	}
});

function logIn() {
	CONSTANTS.AUTHORIZATED_CONTENT.classList.remove('hidden');
	CONSTANTS.NAV_BLOCK.classList.remove('hidden');
	CONSTANTS.LOGIN_FORM.classList.add('hidden');
	createCountPageTemplete();
	getRequestUsers();
	CONSTANTS.EMAIL_FIELD.value = '';
	CONSTANTS.PASSWORD_FIELD.value = '';
}

CONSTANTS.BUTTON_LOGIN.addEventListener('click', () => {
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
			CONSTANTS.EDIT_ELEMENT_CONTAINER.classList.remove('hidden');
			CONSTANTS.EDIT_ELEMENT_CONTAINER.innerHTML = newEditElementForm;
			document.getElementById('edit-avatar').value = currentButton.children[0].currentSrc;
			document.getElementById('edit-email').value = currentButton.children[2].innerText;
			document.getElementById('edit-first-name').value = currentButton.children[4].innerText;
			document.getElementById('edit-last-name').value = currentButton.children[6].innerText;
			const sendChangesButton = document.getElementById('edited-elem-send');
			const cancelButton = document.getElementById('edited-elem-cancel');
			saveEditChanges(sendChangesButton, currentButton, newEditElementForm);
			cancelEditWindow(CONSTANTS.EDIT_ELEMENT_CONTAINER, cancelButton);
		})
	})
}

//cancel edit window
function cancelEditWindow(editElementContainer, cancelButton) {
	cancelButton.addEventListener('click', () => {
		editElementContainer.classList.add('hidden');
		CONSTANTS.MESSAGE_BLOCK.innerText = '';
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

export {
	count,
	result,
	delButId,
	editButId,
	createUserListTemplate,
	deleteElem,
	editElem,
	logIn
};


