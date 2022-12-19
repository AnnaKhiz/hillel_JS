// import { CONSTANTS } from '/src/files/modules/constants.js';
//
// import { count, delButId, editButId } from '../script.js'

//create pagination
function createCountPageTemplete() {
	const everyPageCount = CONSTANTS.PAGE_COUNT.innerHTML;
	const newPagecount = everyPageCount.replace('{{number}}', count);
	CONSTANTS.PAGE_NUMBER.innerText = '';
	CONSTANTS.PAGE_NUMBER.insertAdjacentHTML('beforeend',
		`${newPagecount}`);
}

//create user list template
function createUserListTemplate(result) {
	const userListTemplate = CONSTANTS.USER_TEMPLATE.innerHTML;
	let newArr = result;
	CONSTANTS.USER_LIST.innerText = '';
	newArr.forEach((element) => {
		const newUserListTemplate = userListTemplate.replace('{{avatar}}', element.avatar)
			.replace('{{email}}', element.email)
			.replace('{{first-name}}', element.first_name)
			.replace('{{last-name}}', element.last_name)
			.replaceAll('{{id}}', element.id);
		CONSTANTS.USER_LIST.insertAdjacentHTML('beforeend',
			`${newUserListTemplate}`);
		editButId.push(document.getElementById(`edit-button-${element.id}`));
		delButId.push(document.getElementById(`delete-button-${element.id}`));
		return [...editButId, ...delButId];
	});
}

// export {
// 	createCountPageTemplete,
// 	createUserListTemplate
// }