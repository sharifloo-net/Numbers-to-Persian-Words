import { convertNumberToPersianWords } from '../num-to-words.js';
console.log(convertNumberToPersianWords(203000));

const getInput = document.querySelector('body'),
    input = document.getElementById('input');
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
    'Backspace',
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
const clear = () => {
    input.value = output.value = '';
};
document.getElementById('clear').onclick = () => {
    clear();
};
getInput.onkeydown = (e) => {
    if ((e.code === 'KeyR' && e.ctrlKey) || e.metaKey || e.code === 'F5') {
        location.reload();
        return true;
    } else if ((e.code === 'F5' && e.ctrlKey) || e.metaKey) {
        location.reload(true);
        return true;
    } else if (e.code === 'Delete' || e.code === 'Escape') clear();
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
                let numWithoutCommas = input.value.replaceAll(',', '');
                numWithoutCommas += e.key;
                let num = Number(numWithoutCommas);
                input.value = num.toLocaleString();
                break;
            }
        return false;
    }
};
