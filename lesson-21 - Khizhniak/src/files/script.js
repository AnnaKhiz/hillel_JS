//login and password for successful authorization
console.log('eve.holt@reqres.in')
console.log('cityslicka')
const CONSTANTS = {
	BUTTON_NEXT: document.getElementById('button-next'),
	BUTTON_PREV: document.getElementById('button-prev'),
	USER_LIST: document.getElementById('user-list'),
	USER_TEMPLATE: document.getElementById('user-template'),
	CURRENT_PAGE: document.getElementById('cur-page'),
	PAGE_COUNT: document.getElementById('page-count-template'),
	PAGE_NUMBER: document.getElementById('page-number'),
	AUTHORIZATED_CONTENT: document.getElementById('content-block'),
	LOGIN_FORM: document.getElementById('login-block'),
	FORM: document.getElementById('form'),
	EMAIL_FIELD: document.getElementById('email'),
	PASSWORD_FIELD: document.getElementById('password'),
	LAST_NAME_FIELD: document.getElementById('enter-last-name'),
	BUTTON_LOGIN: document.getElementById('login-button'),
	NEW_USER_LIST: document.getElementById('new-user-list'),
	NEW_USER_TEMPLATE: document.getElementById('new-user-template'),
	MESSAGE_BLOCK: document.getElementById('message-block'),
	ERROR_BLOCK: document.getElementById('error-block'),
	NAV_BLOCK: document.getElementById('nav-block'),
	EDIT_ELEMENT_CONTAINER: document.getElementById('edit-elem'),
}

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


