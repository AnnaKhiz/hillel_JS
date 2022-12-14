import { CONSTANTS } from '/modules/constants.js';
// import { count, result, delButId, editButId } from './script.js';
import { count } from '../script.js';

import { sendEditRequest } from './queries.js';

//block 0 page
function blockZeroPage() {
	if (count == 1) {
		CONSTANTS.BUTTON_PREV.disabled = true;
	} else {
		CONSTANTS.BUTTON_NEXT.disabled = false;
		CONSTANTS.BUTTON_PREV.disabled = false;
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
		CONSTANTS.MESSAGE_BLOCK.innerText = 'Don\'t leave empty fields!';
	}
}

export {
	checkGotUserList,
	blockZeroPage,
	checkEmptyFields,
}

