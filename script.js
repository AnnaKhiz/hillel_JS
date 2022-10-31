let sliderItem = document.getElementsByClassName('main__container-item');

const buttonFirst = document.getElementById('button-first');
const buttonPrev = document.getElementById('button-prev');
const buttonNext = document.getElementById('button-next');
const buttonLast = document.getElementById('button-last');
const inputIndex = document.getElementById('input-index');
const btnGetIndex = document.getElementById('btn-get-index');
const errorBlock = document.getElementById('error-block');
const buttonAddSlideEnd = document.getElementById('button-add-end');
const addSlideToIndex = document.getElementById('input-add-index');
const buttonAddSlideToIndex = document.getElementById('btn-add-index');
const form = document.getElementById('form');
const mainContainer = document.getElementById('main__container');

const slideCountArea = document.getElementById('slide-count-area');
slideCountArea.innerHTML = `<span>Текущий массив: от 0 до ${sliderItem.length - 1}</span>`;

class Slider {
	constructor(sliderEl) {
		this.sliderEl = sliderEl;
	}
	nextSlide() {
		clickSlide(1, [...this.sliderEl]);
	}
	prevSlide() {
		clickSlide(-1, [...this.sliderEl]);
	}
	lastSlide() {
		clickFirstLastSlide([...this.sliderEl], this.sliderEl.length - 1);
	}
	firstSlide() {
		clickFirstLastSlide([...this.sliderEl], 0);
	}
	openSlideByIndex(index) {
		let activeSlide = [...this.sliderEl].indexOf(document.querySelector('.active'));
		this.sliderEl[activeSlide].classList.remove('active');
		if (index > this.sliderEl.length - 1 || index < 0) {
			this.sliderEl[0].classList.add('active');
			errorBlock.innerText = 'There is no such index!';
		} else {
			this.sliderEl[index].classList.add('active');
			errorBlock.innerText = '';
		}
	}
	addSlide(title, description) {
		const sliderItemTemplate = document.getElementById('slider-item-template').innerHTML;
		const newSliderItemTemplate = sliderItemTemplate.replace('{{path}}', title)
			.replace('{{description}}', description);
		mainContainer.insertAdjacentHTML('beforeend',
			`${newSliderItemTemplate}`);
		findActiveElem([...this.sliderEl]);
		[...this.sliderEl][this.sliderEl.length - 1].classList.add('active');
		slideCountArea.innerHTML = `<span>Текущий массив: от 0 до ${this.sliderEl.length - 1}</span>`;
		errorBlock.innerText = '';
	}
	insertSlide(index, title, description) {
		if (index >= this.sliderEl.length || index < 0) {
			errorBlock.innerText = 'There is no such index!';
		}
		else {
			findActiveElem([...this.sliderEl]);
			const sliderItemTemplate = document.getElementById('slider-item-template').innerHTML;
			const newSliderItemTemplate = sliderItemTemplate.replace('{{path}}', title)
				.replace('{{description}}', description);
			sliderItem[index].insertAdjacentHTML('beforebegin',
				`${newSliderItemTemplate}`);
			this.sliderEl[index].classList.add('active');
			slideCountArea.innerHTML = `<span>Текущий массив: от 0 до ${this.sliderEl.length - 1}</span>`;
			errorBlock.innerText = '';
		}

	}
}
const slider = new Slider(sliderItem);

buttonNext.addEventListener('click', () => {
	slider.nextSlide();
});

buttonPrev.addEventListener('click', () => {
	slider.prevSlide();
});

buttonLast.addEventListener('click', () => {
	slider.lastSlide();
});

buttonFirst.addEventListener('click', () => {
	slider.firstSlide();
});

btnGetIndex.addEventListener('click', () => {
	slider.openSlideByIndex(inputIndex.value);
});

buttonAddSlideEnd.addEventListener('click', () => {
	slider.addSlide('img\\cat_6.jpg', '6th pic');
});

buttonAddSlideToIndex.addEventListener('click', () => {
	slider.insertSlide(addSlideToIndex.value, 'img\\cat_7.jpg', '6th pic');
});

function findActiveElem(elem) {
	let activeSlide = elem.indexOf(document.querySelector('.active'));
	elem[activeSlide].classList.remove('active');
}

function clickSlide(index, elem) {
	let activeSlide = elem.indexOf(document.querySelector('.active'));
	elem[activeSlide].classList.remove('active');
	elem[(activeSlide + index + elem.length) % elem.length].classList.add('active');
}

function clickFirstLastSlide(elem, position) {
	let activeSlide = elem.indexOf(document.querySelector('.active'));
	elem[activeSlide].classList.remove('active');
	let checkedElem = elem[position];
	checkedElem.classList.add('active');
}
