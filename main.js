class Calculator {
    constructor(prev, current) {
      this.prev = prev;
      this.current = current;
      this.clear();
    }
  
    clear() {
      this.currentOperand = '';
      this.prevOperand = '';
      this.operation = undefined;
    }
  
    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
  
    appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return;
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }
  
    chooseOperation(operation) {
      if (this.currentOperand === '') return;
      if (this.prevOperand !== '') {
        this.compute();
      }
      this.operation = operation;
      this.prevOperand = this.currentOperand;
      this.currentOperand = '';
    }
  
    compute() {
      let computation;
      const prev = parseFloat(this.prevOperand);
      const current = parseFloat(this.currentOperand);
      if (isNaN(prev) || isNaN(current)) return;
      switch (this.operation) {
        case '+':
          computation = prev + current;
          break;
        case '-':
          computation = prev - current;
          break;
        case '*':
          computation = prev * current;
          break;
        case '÷':
          computation = prev / current;
          break;
        default:
          return;
      }
      this.currentOperand = computation;
      this.operation = undefined;
      this.prevOperand = '';
    }
  
    updateDisplay() {
      this.current.innerText = this.currentOperand;
      if (this.operation != null) {
        this.prev.innerText = `${this.prevOperand} ${this.operation}`;
      } else {
        this.prev.innerText = '';
      }
    }
  }
  
  const prev = document.querySelector('[data-previous]');
  const current = document.querySelector('[data-current]');
  const numberButtons = document.querySelectorAll('[data-number]');
  const operationButtons = document.querySelectorAll('[data-operation]');
  const equalsButton = document.querySelector('[data-equals]');
  const deleteButton = document.querySelector('[data-delete]');
  const allClearButton = document.querySelector('[data-all-clear]');
  
  const calculator = new Calculator(prev, current);
  
  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText);
      calculator.updateDisplay();
    });
  });
  
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText);
      calculator.updateDisplay();
    });
  });
  
  equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
  });
  
  allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
  });
  
  deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
  });
  