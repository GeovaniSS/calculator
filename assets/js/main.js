function createCalculator() {
  const numberBtns = document.querySelectorAll('[data-number]')
  const operatorBtns = document.querySelectorAll('[data-operator]')
  const clearBtn = document.querySelector('[data-all-clear]')
  const deleteBtn = document.querySelector('[data-delete')
  const equalBtn = document.querySelector('[data-equal]')
  const previousOp = document.querySelector('.previous-op')
  const currentOp = document.querySelector('.current-op')

  return {
    startCalculator() {
      this.handleButtonClick()
    },

    handleButtonClick() {
      document.addEventListener('click', (e) => {
        const el = e.target

        if(el.hasAttribute('data-all-clear')) this.clearDisplay()
        if(el.hasAttribute('data-delete'))    this.deleteNumber()
        if(el.hasAttribute('data-operator'))  this.addOperatorDisplay(el.innerText)
        if(el.hasAttribute('data-number'))    this.addNumberDisplay(el.innerText)
        if(el.hasAttribute('data-equal'))     this.showResult()
      })
    },
    
    clearDisplay() {
      currentOp.innerText = ''
      previousOp.innerText = ''
    }, 

    deleteNumber() {
      currentOp.innerText = currentOp.innerText.slice(0, -1)
    },

    addOperatorDisplay(operator) {
      currentOp.innerText += operator
    },

    addNumberDisplay(number) {
      currentOp.innerText += number
    },

    showResult() {
      const result = eval(currentOp.innerText)

      currentOp.innerText = result
    }
  }
}

const calculator = createCalculator()
calculator.startCalculator()