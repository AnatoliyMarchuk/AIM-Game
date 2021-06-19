const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
let time = 0;
const timeEl = document.querySelector('#time');
const board = document.querySelector('.board');
let score = 0;

const colors = [
	'#800000',
	'#ADFF2F',
	'#008000',
	'#FFD700',
	'#00CED1',
	'#4169E1',
	'#D2691E',
	'#B8860B',
	'#FF00FF',
	'#A52A2A',
	'#FFFAFA',
	'#FFE4E1',
	'#F5DEB3',
];

startBtn.addEventListener('click', (event) => {
	event.preventDefault();
	screens[0].classList.add('up');
});

timeList.addEventListener('click', (event) => {
	if (event.target.classList.contains('time-btn')) {
		time = parseInt(event.target.getAttribute('data-time'));
		screens[1].classList.add('up');
		starGame();
	}
});
board.addEventListener('click', (event) => {
	if (event.target.classList.contains('circle')) {
		score++;
		event.target.remove();
		createRandomCirecle();
	}
});

function starGame() {
	setInterval(decreaseTime, 1000);
	createRandomCirecle();
	setTime(time);
}

function decreaseTime() {
	if (time === 0) {
		finishGame();
	} else {
		let current = --time;
		if (current < 10) {
			current = `0${current}`;
		}
		timeEl.innerHTML = `00:${current}`;
		setTime(current);
	}
}

function setTime(value) {
	timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
	timeEl.parentNode.classList.add('hide');
	board.innerHTML = `<h1> Cчет: <span class="primary"> ${score}</span>  </h1> `;
}

function createRandomCirecle() {
	const circle = document.createElement('div');
	const size = getRendomNumber(10, 60);
	const { width, height } = board.getBoundingClientRect();

	const x = getRendomNumber(0, width - size);
	const y = getRendomNumber(0, height - size);
	const color = getRandomColor();

	circle.classList.add('circle');
	circle.style.width = `${size}px`;
	circle.style.height = `${size}px`;
	circle.style.top = `${y}px`;
	circle.style.left = `${x}px`;
	circle.style.background = color;
	circle.style.boxShadow = `0 0 2px ${color}, 0 0 10 px ${color} `;

	board.append(circle);
}

function getRendomNumber(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
	const index = Math.floor(Math.random() * colors.length);
	return colors[index];
}
// Хак гри
function winTheGame() {
	function kill() {
		const circle = document.querySelector('.circle');
		if (circle) {
			circle.click();
		}
	}
	setInterval(kill, 45);
}
