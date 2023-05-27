import { typeCount, generatorOptions, typePassword, typeGroups } from "./types";
import {
  getRandomCharsByCount,
  generateRegexPattern,
  groupAndShuffleChars,
  createPassword,
  specialCharacters,
  upperCaseLetters,
  lowerCaseLetters,
  numbers,
} from "./utils";
const passwordGenerator = (
  count: typeCount,
  options?: generatorOptions
): typePassword => {
  if (!count) {
    return null;
  }
  if (
    !options?.includeLowerCase &&
    !options?.includeNumbers &&
    !options?.includeSpecialChar &&
    !options?.includeUpperCase
  ) {
    return null;
  }
  let combinedChars: typeGroups = [];
  if (options?.includeSpecialChar) {
    const randomSpecialChars = getRandomCharsByCount(specialCharacters, count);
    combinedChars.push(randomSpecialChars);
  }
  if (options?.includeUpperCase) {
    const randomUpperChars = getRandomCharsByCount(upperCaseLetters, count);
    combinedChars.push(randomUpperChars);
  }
  if (options?.includeLowerCase) {
    const randomLowerChars = getRandomCharsByCount(lowerCaseLetters, count);
    combinedChars.push(randomLowerChars);
  }
  if (options?.includeNumbers) {
    const randomNumbers = getRandomCharsByCount(numbers, count);
    combinedChars.push(randomNumbers);
  }
  const regexPattern = generateRegexPattern(
    options?.includeNumbers,
    options?.includeLowerCase,
    options?.includeUpperCase,
    options?.includeSpecialChar,
    count
  );
  const grouped = groupAndShuffleChars(combinedChars);
  const password = createPassword(grouped, count, regexPattern);
  return password ? password : null;
};
export default passwordGenerator;
