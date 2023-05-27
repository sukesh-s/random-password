type typeCount = number;
interface generatorOptions {
    includeSpecialChar: boolean;
    includeUpperCase: boolean;
    includeLowerCase: boolean;
    includeNumbers: boolean;
}
type typePassword = string | null;

declare const passwordGenerator: (count: typeCount, options?: generatorOptions) => typePassword;

export { passwordGenerator as default };
