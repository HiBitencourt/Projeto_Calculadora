'use strict';

const display = document.getElementById('display');
const numbers = document.querySelectorAll('[id*=key]');
const operators = document.querySelectorAll('[id*=Operator]');

let newNumber = true;
let operator;
let previousNumber;

const pendingOperation = () => operator !== undefined;

const calcular = () => {
    if (pendingOperation()){
        const currentNumber = parseFloat(display.textContent.replace(',','.'));
        newNumber = true;
    const resultado = eval(`${previousNumber}${operator}${currentNumber}`);
        updateDisplay(resultado);
    }
}

const updateDisplay = (text) => {
    if (newNumber) {
        display.textContent = text.toLocaleString('BR');
        newNumber = false;
    }else {
        display.textContent += text.toLocaleString('BR');
    } 
}

const insertNumber = (evento) => updateDisplay(evento.target.textContent);
numbers.forEach(number => number.addEventListener('click', insertNumber));


const selectOperator = (evento) => {
    if (!newNumber) {
        calcular();
        newNumber = true;
        operator = evento.target.textContent;
        previousNumber = parseFloat(display.textContent.replace(',','.'));
    }
}
operators.forEach(operator => operator.addEventListener('click', selectOperator));

const activeIqual = () => {
    calcular();
    operator = undefined;
}
document.getElementById('iqual').addEventListener('click', activeIqual);

const clearDisplay = () => display.textContent = '';
document.getElementById('clearDisplay').addEventListener('click', clearDisplay);

const clearCal = () => {
    clearDisplay();
    operator = undefined;
    newNumber = true;
    previousNumber = undefined;
}
document.getElementById('clearCal').addEventListener('click', clearCal);

const removeLastNumber = () => display.textContent = display.textContent.slice(0,-1);
document.getElementById('backspace').addEventListener('click', removeLastNumber);

const reverseSignal = () => {
    newNumber = true
    updateDisplay(display.textContent * -1);
} 
document.getElementById('reverse').addEventListener('click', reverseSignal);


const existeDecimal = () => display.textContent.indexOf(',') != -1;
const existeValor = () => display.textContent.length > 0;
const insertDecimal = () => {
    if (!existeDecimal()){
        if (existeValor()){
            updateDisplay(',');
        }else{
            updateDisplay('0,');
        }
    }
}
document.getElementById('decimal').addEventListener('click', insertDecimal);


const keyboardMap = {
    '0'         : 'key0',
    '1'         : 'key1',
    '2'         : 'key2',
    '3'         : 'key3',
    '4'         : 'key4',
    '5'         : 'key5',
    '6'         : 'key6',
    '7'         : 'key7',
    '8'         : 'key8',
    '9'         : 'key9',
    '/'         : 'divOperator',
    '*'         : 'multOperator',
    '-'         : 'subOperator',
    '+'         : 'addOperator',
    '='         : '#iqual',
    'Enter'     : '#iqual',
    'Backspace' : '#backspace',
    'C'         : '#clearDisplay',
    'Escape'    : '#clearCal',
    ','         : '#decicmal'
}

const keyboardMaps = (evento) => {
    const key = evento.key;
    const allowedKey = () => Object.keys(keyboardMap).indexOf(key) !== -1;
    if (allowedKey()) document.getElementById(keyboardMap[key]).click();
}
document.addEventListener('keydown', keyboardMaps);