// const pass =require('random-pwd');
import pass from 'random-pwd';
const test = pass(8, {
	includeSpecialChar: true,
	includeUpperCase: true,
	includeLowerCase: true,
	includeNumbers: true,
});
console.log(test);
