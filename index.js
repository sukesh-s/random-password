import randomPassword from 'https://unpkg.com/random-pwd@1.0.2/bundle.mjs';

let options = {
	numbers: false,
	lowerChar: true,
	upperChar: true,
	specialChar: true,
	rangeCount: 8,
};

let countRange = document.querySelector('[type="range"]');
const checkBoxes = document.querySelectorAll('[type="checkbox"]');
const countLabel = document.getElementById('range-count');
const countInfo = document.getElementById('count-info');
const _password = document.getElementById('random-password');
const copyIcon = document.getElementById('copy-password');
const reloadIcon = document.getElementById('reload-password');

generatePassword();

for (let i = 0; i < checkBoxes.length; i++) {
	let checkbox = checkBoxes[i];
	checkbox.addEventListener('click', function () {
		options[this.id] = this.checked ? true : false;
		generatePassword();
	});
}

countRange.addEventListener('change', function () {
	options[this.id] = this.value;
	generatePassword();
});
copyIcon.addEventListener('click', function () {
	const copiedPassword = _password.innerHTML;
	navigator.clipboard.writeText(copiedPassword);
});

reloadIcon.addEventListener('click', function () {
	generatePassword();
});

function generatePassword() {
	const password = randomPassword(options?.rangeCount, {
		includeNumbers: options?.numbers,
		includeLowerCase: options?.lowerChar,
		includeUpperCase: options?.upperChar,
		includeSpecialChar: options?.specialChar,
	});
	for (let i = 0; i < checkBoxes.length; i++) {
		let checkbox = checkBoxes[i];
		checkbox.checked = options[checkbox.id];
	}

	_password.innerHTML = password ? password : '🧞....';
	countLabel.innerHTML = options?.rangeCount;
	countInfo.innerHTML = Number(options?.rangeCount) > 1 ? 'Characters' : 'Character';
	countRange.value = Number(options?.rangeCount);
}
