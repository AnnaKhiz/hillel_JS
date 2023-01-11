//login and password for successful authorization
console.log('eve.holt@reqres.in')
console.log('cityslicka')

import './sass/style.sass';
import React from "react";
import ReactDOM from 'react-dom';
import {ListContainer} from './components/ListContainer.jsx';



import {sendDeleteRequest, sendEditRequest, sendPostRequest, getRequestUsers, createCountPageTemplete,
	createUserListTemplate, checkGotUserList, blockZeroPage, checkEmptyFields} from './components/';
import { constData } from './components';
// 	createCountPageTemplete,
// 	createUserListTemplate,
// } from './components/templates.js';
//
// import {
// 	sendDeleteRequest,
// 	sendPostRequest,
// 	getRequestUsers,
// } from './components/queries.js';
//
// import {
// 	blockZeroPage,
// 	checkGotUserList,
// 	checkEmptyFields,
// } from './components/verification.js';

let count = 1;
let result;
let delButId = [];
let editButId = [];


(function checkLogIn() {
	if (localStorage.getItem('token')) {
		constData.loginForm.classList.add('hidden');
		logIn();
	}
})()

//open next page
constData.buttonNext.addEventListener('click', (e) => {
	(count++) % count;
	createCountPageTemplete();
	if (!getRequestUsers()) {
		constData.userList.innerText = `\nThere are no more users`;
		constData.buttonNext.disabled = true;
		constData.buttonPrev.disabled = false;
	} else {
		createUserListTemplate();
		deleteElem();
		editElem();
		blockZeroPage();
	}
});

//open previous page
constData.buttonPrev.addEventListener('click', (e) => {
	(count--) % count;
	createCountPageTemplete();
	if (!getRequestUsers()) {
		constData.userList.innerText = `\nThere are no more users`;
		if (count == 1) {
			constData.buttonPrev.disabled = true;
		}
		constData.buttonPrev.disabled = true;
		constData.buttonNext.disabled = false;
	} else {
		createUserListTemplate();
		blockZeroPage();
		deleteElem();
		editElem();
	}
});

function logIn() {
	constData.authorizatedContent.classList.remove('hidden');
	constData.navBlock.classList.remove('hidden');
	constData.loginForm.classList.add('hidden');
	createCountPageTemplete();
	getRequestUsers();
	constData.emailField.value = '';
	constData.passwordField.value = '';
}

constData.loginButton.addEventListener('click', () => {
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
			constData.editElementContainer.classList.remove('hidden');
			constData.editElementContainer.innerHTML = newEditElementForm;
			document.getElementById('edit-avatar').value = currentButton.children[0].currentSrc;
			document.getElementById('edit-email').value = currentButton.children[2].innerText;
			document.getElementById('edit-first-name').value = currentButton.children[4].innerText;
			document.getElementById('edit-last-name').value = currentButton.children[6].innerText;
			const sendChangesButton = document.getElementById('edited-elem-send');
			const cancelButton = document.getElementById('edited-elem-cancel');
			saveEditChanges(sendChangesButton, currentButton, newEditElementForm);
			cancelEditWindow(constData.editElementContainer, cancelButton);
		})
	})
}

//cancel edit window
function cancelEditWindow(editElementContainer, cancelButton) {
	cancelButton.addEventListener('click', () => {
		editElementContainer.classList.add('hidden');
		constData.messageBlock.innerText = '';
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


