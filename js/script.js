import { convertNumberToPersianWords } from '../num-to-words.js';

const getInput = document.querySelector('body'),
    input = document.getElementById('input'),
    output = document.getElementById('output');
const numbers = [
    'Numpad0',
    'Numpad1',
    'Numpad2',
    'Numpad3',
    'Numpad4',
    'Numpad5',
    'Numpad6',
    'Numpad7',
    'Numpad8',
    'Numpad9',
    'Digit0',
    'Digit1',
    'Digit2',
    'Digit3',
    'Digit4',
    'Digit5',
    'Digit6',
    'Digit7',
    'Digit8',
    'Digit9',
];
const allowedKeys = [
    'Escape',
    'Delete',
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'End',
    'Home',
    'ControlLeft',
    'ControlRight',
    'ShiftLeft',
    'ShiftRight',
    'Tab',
    'AltLeft',
    'AltRight',
    'Enter',
    'NumpadAdd',
    'NumpadSubtract',
];
let inputVal = '',
    outputVal = '';
const clear = () => {
    inputVal = outputVal = input.value = output.value = '';
};

document.getElementById('clear').onclick = clear;
getInput.onkeydown = (e) => {
    //* Vars for Backspace, Number keys & clean up code

    let numWithoutCommas,
        num = '',
        decimalNum = '',
        eCode = e.code;

    inputVal = input.value;
    outputVal = output.value;

    if ((eCode === 'KeyR' && e.ctrlKey) || e.metaKey || eCode === 'F5') {
        location.reload();
        return true;
    } else if ((eCode === 'F5' && e.ctrlKey) || e.metaKey) {
        location.reload(true);
        return true;
    } else if (eCode === 'Delete' || eCode === 'Escape') clear();
    else if (eCode === 'NumpadSubtract' || eCode === 'Minus') {
        if (!inputVal.includes('-')) inputVal = '-' + inputVal;
        else inputVal = inputVal.replace('-', '');
        numWithoutCommas = inputVal.replace(',', '');
        input.value = inputVal;
        output.value = outputVal =
            convertNumberToPersianWords(numWithoutCommas);
        return false;
    } else if (eCode === 'Backspace') {
        let inputRegexMatch;
        try {
            if (inputVal.includes('-')) inputVal.match(/^-0\.\d\b/)[0];
            else inputVal.match(/^0\.\d\b/)[0];
            inputRegexMatch = true;
        } catch {
            inputRegexMatch = false;
        }
        if (
            inputVal.length === 1 ||
            inputRegexMatch ||
            (inputVal.includes('-') && inputVal.length === 2) ||
            (inputVal.includes('-') &&
                inputVal.includes('.') &&
                inputVal.length === 3)
        )
            clear();
        else if (inputVal) {
            numWithoutCommas = inputVal.replaceAll(',', '');
            numWithoutCommas = numWithoutCommas.slice(0, -1);
            if (numWithoutCommas.split('.').length === 2) {
                //* if both decimal number and integer number exist

                num = numWithoutCommas.split('.')[0];
                decimalNum = numWithoutCommas.split('.')[1];
                inputVal = Number(num).toLocaleString() + '.' + decimalNum;
                outputVal = convertNumberToPersianWords(num + '.' + decimalNum);
            } else {
                //* if only decimal number or integer number exists

                if (numWithoutCommas.toString().includes('.'))
                    num = inputVal = numWithoutCommas;
                else {
                    num = +numWithoutCommas;
                    inputVal = num.toLocaleString();
                }
                outputVal = convertNumberToPersianWords(num);
            }
        }
        input.value = inputVal;
        output.value = outputVal;
        return false;
    } else if (eCode == 'Period' || eCode == 'NumpadDecimal') {
        if (inputVal.includes('.')) return false;
        inputVal += '.';
    }

    let isItInAllowedKeys = allowedKeys.some(
        (allowedKey) => eCode === allowedKey
    );

    if (!isItInAllowedKeys) {
        numbers.some((number) => {
            if (eCode === number) {
                numWithoutCommas = inputVal.replaceAll(',', '');
                numWithoutCommas += e.key;
                if (numWithoutCommas.includes('.')) {
                    let numArr = numWithoutCommas.split('.');
                    if (numArr[0] === '-') num = '-0';
                    else num = numArr[0];
                    decimalNum = numArr[1];
                    inputVal = Number(num).toLocaleString() + '.' + decimalNum;
                } else {
                    num = +numWithoutCommas;
                    inputVal = num.toLocaleString();
                }
                outputVal = convertNumberToPersianWords(num + '.' + decimalNum);
                return true;
            }
        });
        input.value = inputVal;
        output.value = outputVal;
        return false;
    }
};

input.focus();
clear();
