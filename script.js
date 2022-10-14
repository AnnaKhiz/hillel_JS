const btnInsta = document.getElementById('buttonInsta');
const btnFb = document.getElementById('buttonFacebook');
const clearInsta = document.getElementById('clearInsta');
const clearFb = document.getElementById('clearFb');
let myStorage = window.localStorage;

function clickLikes(nameItem, nameButton) {
	let counter;
	if (!myStorage.getItem(nameItem)) {
		counter = 0;
	} else {
		counter = myStorage.getItem(nameItem);
		nameButton.innerText = myStorage.getItem(nameItem);
	}
	return () => {
		return ++counter;
	}
}


let buttonInst;
buttonInst = clickLikes('counterResultsInsta', btnInsta);

btnInsta.addEventListener('click', () => {
	btnInsta.innerText = buttonInst();
	myStorage.setItem('counterResultsInsta', btnInsta.innerText);
});

clearInsta.addEventListener('click', () => {
	btnInsta.innerText = 0;
	myStorage.removeItem('counterResultsInsta');
	document.location.reload();
})

let buttonFb;
buttonFb = clickLikes('counterResultsFb', btnFb);

btnFb.addEventListener('click', () => {
	btnFb.innerText = buttonFb();
	myStorage.setItem('counterResultsFb', btnFb.innerText);
})

clearFb.addEventListener('click', () => {
	btnFb.innerText = 0;
	myStorage.removeItem('counterResultsFb');
	document.location.reload();
})

console.log(myStorage);
//myStorage.clear();
