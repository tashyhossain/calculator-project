const keys = document.querySelectorAll('.btn');
const input = document.querySelector('#input');
const result = document.querySelector('#result');

let history = [];
let operand1 = '';
let operand2 = '';
let operator = '';
let operation = '';
let ready = false;

keys.forEach(key => {
  key.addEventListener('click', event => {
    let last = history[history.length - 1];
    let type = key.dataset.type;

    if (type === 'num') {
      let num = key.dataset.key;
      if (!history.length) {
        operand1 = num;
        input.textContent = num;
        history.push(type);
      } else if (last === 'num' && !history.includes('op')) {
        operand1 += num;
        input.textContent += num;
        history.push(type);
      } else if (last === 'op') {
        operand2 = num;
        input.textContent += num;
        history.push(type);
      } else if (last === 'num' && history.includes('op')) {
        operand2 += num;
        input.textContent += num;
        history.push(type);
      } 
    }

    if (type === 'op') {
      let op = key.dataset.key;
      let calc = key.dataset.calc;
      if (!history.includes('op')) {
        operator = op;
        operation = calc;
        input.textContent += ` ${op} `;
        history.push(type);
        if (!operand1) {
          operand1 = '0';
          input.textContent = `${operand1} ${op} `;
        }
      } else if (history.includes('op') && last === 'num') {
        history = history.slice(last);
        let res = operate(operation, operand1, operand2);
        operand1 = res;
        operand2 = '';
        operator = op;
        operation = calc;
        input.textContent = `${operand1} ${op} `;
        result.textContent = '';
      }
    }

    if (operand1 && operand2 && operator) {
      result.textContent = operate(operation, operand1, operand2);
    }

    if (operand1 == '0' && operand2 == '0' && operator == '/') {
      result.textContent = '( #`⌂´)/┌┛';
    }

    if (type === 'equal') {
      if (operand1 && operand2 && operator) {
        result.textContent = operate(operation, operand1, operand2);
      }
    }

    if (type === 'clear') {
      history = [];
      input.textContent = '';
      result.textContent = '';
      operand1 = '';
      operand2 = '';
      operator = '';
      operation = '';
    }

    if (type === 'undo') {
      let undo = history.pop();
      let length = input.textContent.length;
      if (input.textContent[length - 1] === ' ') {
        input.textContent = input.textContent.slice(0, length - 2);
      } else {
        input.textContent = input.textContent.slice(0, length - 1);
      }
    }

    console.log(history);
    console.log(operand1, operation, operand2);

  });
})

function operate(calc, n1, n2) {
  if (calc === 'add') {
    return Number(n1) + Number(n2);
  } else if (calc === 'subtract') {
    return n1 - n2;
  } else if (calc === 'multiply') {
    return n1 * n2;
  } else if (calc === 'divide') {
    return n1 / n2;
  } else if (calc === 'remainder') {
    return n1 % n2;
  } else if (calc === 'exponent') {
    return n1 ** n2;
  } 
}