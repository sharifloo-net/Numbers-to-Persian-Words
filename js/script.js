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
const importantKeys = ['NumpadDecimal', 'Period', 'Backspace'];
const clear = () => {
    input.value = output.value = '';
};
document.getElementById('clear').onclick = () => {
    clear();
};
getInput.onkeydown = (e) => {
    //* Vars for Backspace & Number keys

    let numWithoutCommas,
        num,
        decimalNum = '';

    if ((e.code === 'KeyR' && e.ctrlKey) || e.metaKey || e.code === 'F5') {
        location.reload();
        return true;
    } else if ((e.code === 'F5' && e.ctrlKey) || e.metaKey) {
        location.reload(true);
        return true;
    } else if (e.code === 'Delete' || e.code === 'Escape') clear();
    else if (e.code === 'Backspace') {
        let inputRegexMatch;
        try {
            input.value.match(/^0\.\d\b/)[0];
            inputRegexMatch = true;
        } catch {
            inputRegexMatch = false;
        }
        if (input.value.length === 1 || inputRegexMatch) clear();
        else if (input.value !== '') {
            numWithoutCommas = input.value.replaceAll(',', '');
            numWithoutCommas = numWithoutCommas.slice(0, -1);
            if (numWithoutCommas.includes('.') && numWithoutCommas >= 1) {
                //* if both decimal number and integer number are exist

                num = +numWithoutCommas.split('.')[0];
                decimalNum = numWithoutCommas.split('.')[1];
                input.value = num.toLocaleString() + '.' + decimalNum;
                output.value = convertNumberToPersianWords(
                    num + '.' + decimalNum
                );
            } else {
                //* if only decimal number or integer number exists

                num = +numWithoutCommas;
                if (num >= 1) input.value = num.toLocaleString();
                else input.value = num;
                output.value = convertNumberToPersianWords(num);
            }
        }
        return false;
    } else if (e.code == 'Period' || e.code == 'NumpadDecimal') {
        if (input.value.includes('.')) return false;
        input.value += '.';
    }

    let isItInAllowedKeys = false;

    for (let i = allowedKeys.length - 1; i >= 0; i--) {
        if (e.code.includes(allowedKeys[i])) {
            isItInAllowedKeys = true;
            break;
        }
    }

    if (!isItInAllowedKeys) {
        for (let i = numbers.length - 1; i >= 0; i--)
            if (e.code.includes(numbers[i])) {
                if (isNaN(e.key)) return false;
                numWithoutCommas = input.value.replaceAll(',', '');
                numWithoutCommas += e.key;
                if (numWithoutCommas.includes('.')) {
                    num = +numWithoutCommas.split('.')[0];
                    decimalNum = +numWithoutCommas.split('.')[1];
                    input.value = num.toLocaleString() + '.' + decimalNum;
                } else {
                    num = +numWithoutCommas;
                    input.value = num.toLocaleString();
                }
                output.value = convertNumberToPersianWords(
                    num + '.' + decimalNum
                );
                break;
            }
        return false;
    }
};

input.focus();
clear();
