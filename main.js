// Calling In Elements Via DOM
const prevNum = document.querySelector('.prev-num');
const currentNum = document.querySelector('.current-num');
const clearBtn = document.querySelector('.clear');
const deleteBtn = document.querySelector('.delete');
const equalsBtn = document.querySelector('.equal');
const numbersBtn = document.querySelectorAll('.number');
const operatorsBtn = document.querySelectorAll('.operator');

// Adding Functionality To All Buttons
numbersBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.number(btn.innerHTML);
        calculator.display();
    })
})

operatorsBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.operator(btn.innerHTML);
        calculator.display();
    })
})

clearBtn.addEventListener('click', () => {
    calculator.clear();
    calculator.display();
})

deleteBtn.addEventListener('click', () => {
    calculator.delete();
    calculator.display();
})

equalsBtn.addEventListener('click', () => {
    calculator.equal();
    calculator.display();
})

class Calculator {
    constructor(prevNum, currentNum) {
        this.prevNum = prevNum;
        this.currentNum = currentNum;
        this.clear();
    }

    // This Funciton Will Display The Previous And Current Numbers
    display() {
        this.prevNum.innerHTML = this.prev;
        this.currentNum.innerHTML = this.current;
    }

    // Clears Display
    clear() {
        this.current = '';
        this.prev = '';
        this.operation = null;
    }

    // Deletes Last Character
    delete() {
        // If Current Is Empty Will Take Away Operator From Previous And Make Previous Current 
        if(this.current === '' && this.prev !== '') {
            this.current = this.prev;
            this.prev = '';
        }

        this.current = this.current.toString().substring(0, this.current.length -1);
    }

    equal() {
        let equal;
        let prevNum = parseFloat(this.prev);
        let currentNum = parseFloat(this.current);

        // Will Not Run If Current Empty
        if(this.current === '') {
            return;
        }

        switch (this.operation) {
            case '+':
                equal = prevNum + currentNum;
                break;
            case '-':
                equal = prevNum - currentNum;
                break;
            case '*':
                equal = prevNum * currentNum;
                break;
            case '÷':
                equal = prevNum / currentNum;
                break;
            default:
                return;
        }

        this.current = equal.toString();
        this.prev = '';
        this.operation = null;
    }

    // Input Number Function
    number(number) {
        if(this.current === '.' && number === '.') {
            return;
        }

        this.current = this.current.toString() + number.toString();
    }

    // Input Operator Function
    operator(operation) {
        if(this.current === '' || this.current === '.') {
            return;
        }
        if(this.current !== '' && this.prev !== '') {
            this.equal();
        }
        this.prev = this.current + operation;
        this.operation = operation;
        this.current = '';
    }

}

const calculator = new Calculator(prevNum, currentNum);