'use strict';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */


function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var numbers = Array.from(Array(10), function (_, i) { return i; });
var upperCaseLetters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
];
var lowerCaseLetters = upperCaseLetters.map(function (e) { return e.toLowerCase(); });
var specialCharacters = [
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "-",
    "+",
    "=",
    ":",
    "?",
    "~",
];
var createPassword = function (data, count, pattern) {
    var generatedArray = __spreadArray([], data, true);
    var sliced = generatedArray.slice(0, count);
    var flatString = sliced.join("");
    var regex = new RegExp(pattern);
    if (!regex.test(flatString)) {
        console.error("Pattern not satisfied...");
        return null;
    }
    var shuffle = shuffleArray(sliced);
    return shuffle.join("");
};
function shuffleArray(array) {
    array.forEach(function (_, index) {
        var randomIndex = Math.floor(Math.random() * (index + 1));
        var temp = array[index];
        array[index] = array[randomIndex];
        array[randomIndex] = temp;
    });
    return array;
}
var generateRegexPattern = function (isNumberRequired, isLowerCaseRequired, isUpperCaseRequired, isSpecialCharRequired, count) {
    var pattern = "^";
    if (isNumberRequired) {
        pattern += "(?=.*\\d)";
    }
    if (isLowerCaseRequired) {
        pattern += "(?=.*[a-z])";
    }
    if (isUpperCaseRequired) {
        pattern += "(?=.*[A-Z])";
    }
    if (isSpecialCharRequired) {
        pattern += "(?=.*[!@#$%^&*()_+~`|}{\\[\\]\\\\:;?><,./\\-=])";
    }
    if (count) {
        pattern += "{".concat(count, "}");
    }
    pattern += ".+$";
    return pattern;
};
var getRandomCharsByCount = function (array, count) {
    var randomArray = [];
    while (count--) {
        var randomIndex = Math.floor(Math.random() * array.length);
        var temp = array[randomIndex];
        randomArray.push(temp);
    }
    return randomArray;
};
var groupAndShuffleChars = function (combinedArrays) {
    var flattenArrayLength = combinedArrays.flat().length;
    var combinedArraysLength = combinedArrays.length;
    var shuffled = [];
    for (var i = 0; i < flattenArrayLength; i++) {
        for (var j = 0; j < combinedArraysLength; j++) {
            if (i < combinedArrays[j].length) {
                shuffled.push(combinedArrays[j][i]);
            }
        }
    }
    return shuffled;
};

var passwordGenerator = function (count, options) {
    if (!count) {
        return null;
    }
    if (!(options === null || options === void 0 ? void 0 : options.includeLowerCase) &&
        !(options === null || options === void 0 ? void 0 : options.includeNumbers) &&
        !(options === null || options === void 0 ? void 0 : options.includeSpecialChar) &&
        !(options === null || options === void 0 ? void 0 : options.includeUpperCase)) {
        return null;
    }
    var combinedChars = [];
    if (options === null || options === void 0 ? void 0 : options.includeSpecialChar) {
        var randomSpecialChars = getRandomCharsByCount(specialCharacters, count);
        combinedChars.push(randomSpecialChars);
    }
    if (options === null || options === void 0 ? void 0 : options.includeUpperCase) {
        var randomUpperChars = getRandomCharsByCount(upperCaseLetters, count);
        combinedChars.push(randomUpperChars);
    }
    if (options === null || options === void 0 ? void 0 : options.includeLowerCase) {
        var randomLowerChars = getRandomCharsByCount(lowerCaseLetters, count);
        combinedChars.push(randomLowerChars);
    }
    if (options === null || options === void 0 ? void 0 : options.includeNumbers) {
        var randomNumbers = getRandomCharsByCount(numbers, count);
        combinedChars.push(randomNumbers);
    }
    var regexPattern = generateRegexPattern(options === null || options === void 0 ? void 0 : options.includeNumbers, options === null || options === void 0 ? void 0 : options.includeLowerCase, options === null || options === void 0 ? void 0 : options.includeUpperCase, options === null || options === void 0 ? void 0 : options.includeSpecialChar, count);
    var grouped = groupAndShuffleChars(combinedChars);
    var password = createPassword(grouped, count, regexPattern);
    return password ? password : null;
};

module.exports = passwordGenerator;
