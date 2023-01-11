import { constData } from './constants.js';

import { count, delButId, editButId } from '../script.js'

//create pagination
function createCountPageTemplete() {
	const everyPageCount = constData.pageCountTemplate.innerHTML;
	const newPagecount = everyPageCount.replace('{{number}}', count);
	constData.pageNumber.innerText = '';
	constData.pageNumber.insertAdjacentHTML('beforeend',
		`${newPagecount}`);
}

//create user list template
function createUserListTemplate(result) {
	const userListTemplate = constData.userTemplate.innerHTML;
	let newArr = result;
	constData.userList.innerText = '';
	newArr.forEach((element) => {
		const newUserListTemplate = userListTemplate.replace('{{avatar}}', element.avatar)
			.replace('{{email}}', element.email)
			.replace('{{first-name}}', element.first_name)
			.replace('{{last-name}}', element.last_name)
			.replaceAll('{{id}}', element.id);
		constData.userList.insertAdjacentHTML('beforeend',
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