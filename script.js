//login and password for successful authorization
console.log('eve.holt@reqres.in')
console.log('cityslicka')

import * as variablesData from './variables.js';
import {
	createCountPageTemplete,
	createUserListTemplate,
} from './templates.js';

import {
	sendDeleteRequest,
	sendEditRequest,
	sendPostRequest,
	getRequestUsers,
} from './queries.js';

import {
	blockZeroPage,
	checkGotUserList,
	checkEmptyFields,
} from './verification.js';

let count = 1;
let result;
let delButId = [];
let editButId = [];


(function checkLogIn() {
	if (localStorage.getItem('token')) {
		variablesData.default.loginForm.classList.add('hidden');
		logIn();
	}
})()

//open next page
variablesData.default.buttonNext.addEventListener('click', (e) => {
	(count++) % count;
	createCountPageTemplete();
	if (!getRequestUsers()) {
		variablesData.default.userList.innerText = `\nThere are no more users`;
		variablesData.default.buttonNext.disabled = true;
		variablesData.default.buttonPrev.disabled = false;
	} else {
		createUserListTemplate();
		deleteElem();
		editElem();
		blockZeroPage();
	}
});

//open previous page
variablesData.default.buttonPrev.addEventListener('click', (e) => {
	(count--) % count;
	createCountPageTemplete();
	if (!getRequestUsers()) {
		variablesData.default.userList.innerText = `\nThere are no more users`;
		if (count == 1) {
			variablesData.default.buttonPrev.disabled = true;
		}
		variablesData.default.buttonPrev.disabled = true;
		variablesData.default.buttonNext.disabled = false;
	} else {
		createUserListTemplate();
		blockZeroPage();
		deleteElem();
		editElem();
	}
});

function logIn() {
	variablesData.default.authorizatedContent.classList.remove('hidden');
	variablesData.default.navBlock.classList.remove('hidden');
	variablesData.default.loginForm.classList.add('hidden');
	createCountPageTemplete();
	getRequestUsers();
	variablesData.default.emailField.value = '';
	variablesData.default.passwordField.value = '';
}

variablesData.default.buttonLogin.addEventListener('click', () => {
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
			variablesData.default.editElementContainer.classList.remove('hidden');
			variablesData.default.editElementContainer.innerHTML = newEditElementForm;
			document.getElementById('edit-avatar').value = currentButton.children[0].currentSrc;
			document.getElementById('edit-email').value = currentButton.children[2].innerText;
			document.getElementById('edit-first-name').value = currentButton.children[4].innerText;
			document.getElementById('edit-last-name').value = currentButton.children[6].innerText;
			const sendChangesButton = document.getElementById('edited-elem-send');
			const cancelButton = document.getElementById('edited-elem-cancel');
			saveEditChanges(sendChangesButton, currentButton, newEditElementForm);
			cancelEditWindow(variablesData.default.editElementContainer, cancelButton);
		})
	})
}

//cancel edit window
function cancelEditWindow(editElementContainer, cancelButton) {
	cancelButton.addEventListener('click', () => {
		editElementContainer.classList.add('hidden');
		variablesData.default.messageBlock.innerText = '';
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


