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

export default
	{
		buttonNext,
		buttonPrev,
		userList,
		userTemplate,
		currentPage,
		pageCount,
		pageNumber,
		authorizatedContent,
		loginForm,
		form,
		emailField,
		passwordField,
		lastNameField,
		buttonLogin,
		newUserList,
		newUserTemplate,
		messageBlock,
		errorBlock,
		navBlock,
		editElementContainer,
	}