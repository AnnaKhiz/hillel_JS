const btnInsta = document.getElementById('buttonInsta');
const btnFb = document.getElementById('buttonFacebook');
const clearInsta = document.getElementById('clearInsta');
const clearFb = document.getElementById('clearFb');
let myStorage = window.localStorage;

function clickLikes() {
	let counter;
	if (!myStorage.getItem('counterResultsInsta')) {
		counter = 0;
	} else {
		counter = myStorage.getItem('counterResultsInsta');
		btnInsta.innerText = myStorage.getItem('counterResultsInsta');
	}
	return () => {
		return ++counter;
	}
}

let butInst = clickLikes();

btnInsta.addEventListener('click', () => {
	btnInsta.innerText = butInst();
	myStorage.setItem('counterResultsInsta', btnInsta.innerText);
});

clearInsta.addEventListener('click', () => {
	btnInsta.innerText = 0;
	myStorage.removeItem('counterResultsInsta');
	document.location.reload();
})

function clickLikesFb() {
	let counter;
	if (!myStorage.getItem('counterResultsFb')) {
		counter = 0;
	} else {
		counter = myStorage.getItem('counterResultsFb');
		btnFb.innerText = myStorage.getItem('counterResultsFb');
	}
	return () => {
		return ++counter;
	}
}

let butFb = clickLikesFb();

btnFb.addEventListener('click', () => {
	btnFb.innerText = butFb();
	myStorage.setItem('counterResultsFb', btnFb.innerText);
})

clearFb.addEventListener('click', () => {
	btnFb.innerText = 0;
	myStorage.removeItem('counterResultsFb');
	document.location.reload();
})
