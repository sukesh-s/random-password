import {
  typeCombinations,
  typeCount,
  typePattern,
  typePasswordGeneratorReturn,
  typeBool,
  typeGroups,
} from "./types";

export const numbers = Array.from(Array(10), (_, i) => i);
export const upperCaseLetters = [
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
export const lowerCaseLetters = upperCaseLetters.map((e) => e.toLowerCase());
export const specialCharacters = [
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

export const createPassword = (
  data: typeCombinations,
  count: typeCount,
  pattern: typePattern
): typePasswordGeneratorReturn => {
  const generatedArray = [...data];
  const sliced = generatedArray.slice(0, count);
  const flatString = sliced.join("");
  const regex = new RegExp(pattern);
  if (!regex.test(flatString)) {
    console.error("Pattern not satisfied...");
    return null;
  }
  const shuffle = shuffleArray(sliced);
  return shuffle.join("");
};

function shuffleArray(array: typeCombinations): typeCombinations {
  array.forEach(function (_, index) {
    var randomIndex = Math.floor(Math.random() * (index + 1));
    var temp = array[index];
    array[index] = array[randomIndex];
    array[randomIndex] = temp;
  });
  return array;
}

export const generateRegexPattern = (
  isNumberRequired: typeBool,
  isLowerCaseRequired: typeBool,
  isUpperCaseRequired: typeBool,
  isSpecialCharRequired: typeBool,
  count: typeCount
): typePattern => {
  let pattern = "^";

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
    pattern += `{${count}}`;
  }

  pattern += ".+$";
  return pattern;
};

export const getRandomCharsByCount = (
  array: typeCombinations,
  count: typeCount
): typeCombinations => {
  let randomArray: typeCombinations = [];
  while (count--) {
    let randomIndex = Math.floor(Math.random() * array.length);
    const temp: string | number = array[randomIndex];
    randomArray.push(temp);
  }
  return randomArray;
};

export const groupAndShuffleChars = (
  combinedArrays: typeGroups
): typeCombinations => {
  const flattenArrayLength = combinedArrays.flat().length;
  const combinedArraysLength = combinedArrays.length;
  const shuffled: typeCombinations = [];
  for (let i = 0; i < flattenArrayLength; i++) {
    for (let j = 0; j < combinedArraysLength; j++) {
      if (i < combinedArrays[j].length) {
        shuffled.push(combinedArrays[j][i]);
      }
    }
  }
  return shuffled;
};
