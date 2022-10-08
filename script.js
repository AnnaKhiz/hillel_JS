const textBlock = document.getElementById('text-block');
const toggleButton = document.getElementById('button');

toggleButton.addEventListener('click', function () {
	textBlock.classList.toggle('hidden');
	if (textBlock.classList.contains('hidden')) {
		toggleButton.innerText = 'Показать текст';
	} else {
		toggleButton.innerText = 'Скрыть текст';
	}
})