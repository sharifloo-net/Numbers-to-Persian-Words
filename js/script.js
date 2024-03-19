import { convertNumberToPersianWords } from '../num-to-words.js';
console.log(convertNumberToPersianWords(1234.5));

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
    let numWithoutCommas, num; //* Vars for Backspace & Number keys

    if ((e.code === 'KeyR' && e.ctrlKey) || e.metaKey || e.code === 'F5') {
        location.reload();
        return true;
    } else if ((e.code === 'F5' && e.ctrlKey) || e.metaKey) {
        location.reload(true);
        return true;
    } else if (e.code === 'Delete' || e.code === 'Escape') clear();
    else if (e.code === 'Backspace') {
        if (input.value.length === 1) clear();
        else {
            numWithoutCommas = input.value.replaceAll(',', '');
            numWithoutCommas = numWithoutCommas.replace(
                numWithoutCommas[numWithoutCommas.length - 1],
                ''
            );
            num = Number(numWithoutCommas);
            input.value = num.toLocaleString();
            output.value = convertNumberToPersianWords(num);
        }
        return false;
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
                numWithoutCommas = input.value.replaceAll(',', '');
                numWithoutCommas += e.key;
                num = Number(numWithoutCommas);
                input.value = num.toLocaleString();
                output.value = convertNumberToPersianWords(num);
                break;
            }
        return false;
    }
};
