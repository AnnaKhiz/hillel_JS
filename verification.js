import * as variablesData from './variables.js';
// import { count, result, delButId, editButId } from './script.js';
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
	sendDeleteRequest,
	sendEditRequest,
	sendPostRequest,
	getRequestUsers
} from './queries.js';

//block 0 page
function blockZeroPage() {
	if (count == 1) {
		variablesData.default.buttonPrev.disabled = true;
	} else {
		variablesData.default.buttonNext.disabled = false;
		variablesData.default.buttonPrev.disabled = false;
	}
}

//check if user data array exist
function checkGotUserList(result) {
	if (result.length !== 0 && count > 0) {
		return result;
	} else {
		return false;
	}
}

//checking empty fields in edit form
function checkEmptyFields(editAvatar, editEmail, editFirstName, editLastName, currentButton, newEditElementForm) {
	if (editAvatar !== '' && editEmail !== '' && editFirstName !== '' && editLastName !== '') {
		sendEditRequest(editAvatar, editEmail, editFirstName, editLastName, currentButton, newEditElementForm);
	} else {
		variablesData.default.messageBlock.innerText = 'Don\'t leave empty fields!';
	}
}

export {
	checkGotUserList,
	blockZeroPage,
	checkEmptyFields,
}

