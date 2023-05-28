# random-password
#### A javascript npm package that generates random passwords with customizable options.
# Installation
```
npm install random-pwd

```
# Usage
```
var randomPwd = require("random-pwd")

const password = randomPwd(8, {
	includeSpecialChar: true,
	includeUpperCase: true,
	includeLowerCase: true,
	includeNumbers: true,
});
console.log(password);

```

# Options
The following options can be passed to the function:

- count (required): The length of the generated password.
- includeUpperCase (optional): Whether to include uppercase letters. Defaults to false.
- includeLowerCase (optional): Whether to include lower case letters. Defaults to false.
- includeNumbers (optional): Whether to include numbers. Defaults to false.
- includeSpecialChar (optional): Whether to include special characters. Defaults to false.

# License
This project is licensed under the MIT License.
# Contributing
Contributions are welcome! Please fork the repository and submit a pull request.
