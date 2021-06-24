const add = function(a, b) {
  return a + b;
};

const subtract = function(a, b) {
  return a - b;
};

const multiply = function(a, b) {
  return a * b;
};

const divide = function(a, b) {
  return a / b;
};

const remainder = function(a, b) {
  return a % b;
};

const exponent = function(a, b) {
  return a ** b;
}

function operate(state) {
  return state.operation(state.operand1, state.operand2);
};

const input = document.querySelector('#input');
const result = document.querySelector('#result');
const clear = document.querySelector('#clear');
const numbers = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.op');

let start = {
  reaady: false,
  operand1: 0,
  operand2: 0,
  operator: {
    add: add(),
    subtract: subtract(),
    multiply: multiply(),
    divide: divide()
  }
}