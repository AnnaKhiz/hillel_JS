const inputEmail = document.getElementById('inputEmail');
const inputPassword = document.getElementById('inputPassword');
const buttonSubmit = document.getElementById('buttonSubmit');
const form = document.getElementById('form');
const errorEmailArea = document.getElementById('errorEmailArea');
const errorPasArea = document.getElementById('errorPasArea');
buttonSubmit.disabled = true;
//console.dir(inputEmail)

const users = [
	{ user: 'admin', login: 'admin@gmail.com', password: 'password123' },
	{ user: 'user', login: 'user@ukr.net', password: 'userpas456' },
	{ user: 'user_2', login: 'user_user@gmail.com', password: '213password' },
	{ user: 'user_3', login: 'user.user@gmail.com', password: '215password' }
];
console.log(users);

//функция поиска пользователя в "БД"
function findUser() {
	users.forEach((element) => {
		let userLogin = element.login;
		let userPassword = element.password;
		if (inputEmail.value == userLogin && inputPassword.value == userPassword) {
			errorPasArea.innerHTML = '';
			submitForm();
		} else {
			buttonSubmit.addEventListener('click', (e) => {
				e.preventDefault();
				if ((e.target != userPassword || e.target != userLogin) && checkPasLength()) {
					errorPasArea.innerHTML = '<p class="red-text">Нет такого пользователя!</p>';
					inputPassword.value = '';
					inputPassword.style.boxShadow = 'inset 9px -2px 20px 6px rgb(248 58 58 / 20%)';
				}
			});
		}
	});

}

//функция отправки формы
function submitForm() {
	buttonSubmit.addEventListener('click', (e) => {
		e.preventDefault();
		errorPasArea.innerHTML = '<p class="red-text">Авторизация прошла успешно!</p>';
		inputPassword.style.boxShadow = 'inset 9px -2px 20px 6px rgb(0 58 58 / 20%)';
		//inputPassword.value = inputPassword.value;
		setTimeout(() => {
			window.location.assign('https://google.com');
		}, 1000);
	});
}


//событие проверки на пустые поля и пробелы при потере фокуса
form.addEventListener('focusout', (e) => {
	if (e.target.tagName != 'input') {
		if (e.target.value.match(/^[ ]+$/) || e.target.value == '') {
			e.target.value = '';
			e.target.style.boxShadow = '';
			errorPasArea.innerHTML = '<p class="red-text">Заполните все поля!</p>';
			buttonSubmit.disabled = true;
		} else if (e.target.value !== '') {
			inputPassword.addEventListener('keyup', (e) => {
				checkPasLength();
			});
			notEmptyFields();
			findUser();
		} else {
			buttonSubmit.disabled = true;
			e.target.style.boxShadow = '';
		};
	}
});


//функция валидации (если поля не пустые)
function notEmptyFields() {
	checkEmailFormat();
	if (inputEmail.value != '' && inputPassword.value != '' && checkPasLength() && checkEmailFormat()) {
		buttonSubmit.disabled = false;
		errorPasArea.innerHTML = '';
	} else {
		buttonSubmit.disabled = true;
	}
}


//функция проверки длины пароля
function checkPasLength() {
	if (inputPassword.value.length >= 6) {
		errorPasArea.innerHTML = '';
		inputPassword.style.boxShadow = 'inset 9px -2px 20px 6px rgb(0 58 58 / 20%)';
		return true;
	} else if (inputPassword.value.length < 6 && inputPassword.value.length > 0) {
		buttonSubmit.disabled = true;
		errorPasArea.innerHTML = '<p class="red-text">Пароль должен состоять минимум из 6 символов!</p>';
		inputPassword.style.boxShadow = 'inset 9px -2px 20px 6px rgb(248 58 58 / 20%)';
		return false;
	}
}

//функция валидации емейла
function checkEmailFormat() {
	const regex = new RegExp('^[A-Za-z0-9\\._\-]+@+[A-Za-z0-9]+\\.+[A-Za-z]{2,6}$');
	if ((document.getElementById('inputEmail').value.length) > 1) {
		if (regex.test(document.getElementById('inputEmail').value)) {
			inputEmail.style.boxShadow = 'inset 9px -2px 20px 6px rgb(0 58 58 / 20%)';
			errorEmailArea.innerHTML = '';
			return true;
		} else {
			inputEmail.style.boxShadow = 'inset 9px -2px 20px 6px rgb(248 58 58 / 20%)';
			errorEmailArea.innerHTML = '<p class="red-text">Email не соответствует формату!</p>';
			return false;
		}
	} else {
		inputEmail.style.boxShadow = 'inset 9px -2px 20px 6px rgb(248 58 58 / 20%)';
		errorEmailArea.innerHTML = '<p class="red-text">Email не соответствует формату!</p>';
		return false;
	}
}

