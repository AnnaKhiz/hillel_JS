const buttonNext = document.getElementById('button-next');
const buttonPrev = document.getElementById('button-prev');
const userList = document.getElementById('user-list');
const userTemplate = document.getElementById('user-template');
const currentPage = document.getElementById('cur-page');
const pageCount = document.getElementById('page-count-template');
const pageNumber = document.getElementById('page-number');
const authorizatedContent = document.getElementById('content-block');
const loginForm = document.getElementById('login-block');
const form = document.getElementById('form');
const emailField = document.getElementById('email');
const passwordField = document.getElementById('password');
const lastNameField = document.getElementById('enter-last-name');
const buttonLogin = document.getElementById('login-button');
const newUserList = document.getElementById('new-user-list');
const newUserTemplate = document.getElementById('new-user-template');
const messageBlock = document.getElementById('message-block');
const errorBlock = document.getElementById('error-block');
const navBlock = document.getElementById('nav-block');
const editElementContainer = document.getElementById('edit-elem');

export const CONSTANTS =
{
	BUTTON_NEXT: buttonNext,
	BUTTON_PREV: buttonPrev,
	USER_LIST: userList,
	USER_TEMPLATE: userTemplate,
	CURRENT_PAGE: currentPage,
	PAGE_COUNT: pageCount,
	PAGE_NUMBER: pageNumber,
	AUTHORIZATED_CONTENT: authorizatedContent,
	LOGIN_FORM: loginForm,
	FORM: form,
	EMAIL_FIELD: emailField,
	PASSWORD_FIELD: passwordField,
	LAST_NAME_FIELD: lastNameField,
	BUTTON_LOGIN: buttonLogin,
	NEW_USER_LIST: newUserList,
	NEW_USER_TEMPLATE: newUserTemplate,
	MESSAGE_BLOCK: messageBlock,
	ERROR_BLOCK: errorBlock,
	NAV_BLOCK: navBlock,
	EDIT_ELEMENT_CONTAINER: editElementContainer,
}