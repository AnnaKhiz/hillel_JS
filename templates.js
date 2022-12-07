import * as variablesData from './variables.js'
import { count, result, delButId, editButId } from './script.js'

//create pagination
function createCountPageTemplete() {
	const everyPageCount = variablesData.default.pageCount.innerHTML;
	const newPagecount = everyPageCount.replace('{{number}}', count);
	variablesData.default.pageNumber.innerText = '';
	variablesData.default.pageNumber.insertAdjacentHTML('beforeend',
		`${newPagecount}`);
}

//create user list template
function createUserListTemplate(result) {
	const userListTemplate = variablesData.default.userTemplate.innerHTML;
	let newArr = result;
	variablesData.default.userList.innerText = '';
	newArr.forEach((element) => {
		const newUserListTemplate = userListTemplate.replace('{{avatar}}', element.avatar)
			.replace('{{email}}', element.email)
			.replace('{{first-name}}', element.first_name)
			.replace('{{last-name}}', element.last_name)
			.replaceAll('{{id}}', element.id);
		variablesData.default.userList.insertAdjacentHTML('beforeend',
			`${newUserListTemplate}`);
		editButId.push(document.getElementById(`edit-button-${element.id}`));
		delButId.push(document.getElementById(`delete-button-${element.id}`));
		return [...editButId, ...delButId];
	});
}

export {
	createCountPageTemplete,
	createUserListTemplate
}