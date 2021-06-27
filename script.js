const keys = document.querySelectorAll('.btn');
const btns = document.querySelectorAll('[data-code]')
const operand1 = document.querySelector('#operand1');
const operand2 = document.querySelector('#operand2');
const operator = document.querySelector('#operator');
const result = document.querySelector('#result');

let history = [];
let n1 = '';
let n2 = '';
let symbol = '';
let operation = '';

function operate(calc, n1, n2) {
  if (calc === 'add') {
    return Number(n1) + Number(n2);
  } else if (calc === 'sub') {
    return n1 - n2;
  } else if (calc === 'mul') {
    return n1 * n2;
  } else if (calc === 'div') {
    return n1 / n2;
  } else if (calc === 'pow') {
    return n1 ** n2;
  } else if (calc === 'sqr') {
    return Math.sqrt(n1);
  }
}

keys.forEach(key => {
  let type = key.dataset.type;
  key.addEventListener('click', () => pressKey(key, type));
})

window.addEventListener('keydown', e => {
  let key = document.querySelector(`[data-code="${e.keyCode}"]`);
  let type = key.dataset.type;
  pressKey(key, type);
});


function pressKey(key, type) {
  let last = history[history.length - 1];
  let total = operand1.textContent.length + operand2.textContent.length + 
              operator.textContent.length;

  if (total < 16) {
    if (type === 'num') {
      let num = key.dataset.key;
      if (!history.length) {
        if (num === '.') {
          n1 = '0' + num;
        } else {
          n1 = num;
        }
      } else if (!history.includes('op')) {
        if (num === '.' && Number(n1) % 1 !== 0) return;
        n1 += num;
      } 
      operand1.textContent = n1;
      if (last === 'op') {
        if (num === '.') {
          n2 = '0' + num;
        }
        else n2 = num;
      } else if (n2) { 
        if (num === '.' && Number(n2) % 1 !== 0) return;
        n2 += num;
      }
      operand2.textContent = n2;
      history.push(type);
    }

    if (type === 'op') {
      let op = key.dataset.key;
      let calc = key.dataset.calc;
      if (n1 === '0.' || n2 === '0.') return;
      if (!history.length && op === '√') return;
      if (!history.includes('op') && op !== '√') {
        symbol = op;
        operation = calc; 
        operator.textContent = op;
        history.push(type);
      } else if (last === 'op' && op !== '√') {
        symbol = op;
        operation = calc;
        operator.textContent = op;
      } else if (last === 'num' && n2) {
        let x = operate(operation, n1, n2);
        if (x.length < 16) {
          clear(x);
        } else {
          let round = Math.round(Number(x) * 100000) / 100000;
          clear(round);
        }
        symbol = op;
        operation = calc; 
        operator.textContent = op;
        history.push(type);
      }
      if (last === 'num' && op === '√') {
        n2 = 0;
        symbol = op;
        operation = calc;
        operand1.textContent = '';
        operand2.textContent = n1;
        operator.textContent = op;
        history.push(type);
        let x = Math.round(operate(operation, n1, n2) * 100000) / 100000;
        return clear(x);
      }
    }
  }

  if (type === 'sign') {
    if (last === 'num' && !n2) {
      n1 = Number(n1) * -1;
      operand1.textContent = n1;
    } else if (last === 'num' && n2) {
      n2 = Number(n2) * -1;
      operand2.textContent = n2;
    }
  }

  if (type === 'equal') {
    let x = result.textContent;
    let round = 0;
    if (x < 0 && x % 1 !== 1) round = Math.round(Number(x) * 100000) / 100000;
    else if (x > 0 && x % 1 !== 1) round = Math.round(Number(x) * 100000) / 100000;
    else round = result.textContent;
    return clear(round);
  }

  if (type === 'clear') {
    return clear(0);
  }

  if (type === 'undo') {
    if (last === 'num' && !history.includes('op')) {
      let length = operand1.textContent.length;
      operand1.textContent = operand1.textContent.slice(0, length - 1);
    } else if (last === 'num' && history.includes('op')) {
      let length = operand2.textContent.length;
      operand2.textContent = operand2.textContent.slice(0, length - 1);
    } else if (last === 'op') {
      operator.textContent = '';
    }
    history.pop();
  }

  if (n1 && n2 && symbol) {
    let x = operate(operation, n1, n2);
    result.textContent = Math.round(Number(x) * 100000000) / 100000000;
  }

  if (n1 == '0' && n2 == '0' && symbol == '/') {
    result.textContent = '( #`⌂´)/┌┛';
  }

  if (!history.length) {
    clear(0);
  }
  
  console.log(history);
}

function clear(op1) {
  history = [];
  operand1.textContent = op1;
  operand2.textContent = '';
  operator.textContent = '';
  result.textContent = '';
  n1 = op1;
  n2 = '';
  symbol = '';
  operation = '';
}