function createCalculator() {
  const previousOperandElement = document.querySelector('.previous-op')
  const currentOperandElement = document.querySelector('.current-op')
  
  return {
    previousOperand: '', 
    currentOperand: '',
    operation: null,
    
    clear() {
      this.previousOperand = ''
      this.currentOperand = ''
      this.operation = null
    }, 
    
    deleteNumber() {
      this.currentOperand = this.currentOperand.slice(0, -1)
    },

    addNumber(number) {
      if(number === '.' && !this.currentOperand || number === '.' && this.currentOperand.includes('.')) return
      this.currentOperand += number
    },
    
    chooseOperation(operation) {
      if(!this.currentOperand) return
      if(this.previousOperand) this.calculate()
      
      this.operation = operation
      this.previousOperand = this.currentOperand
      this.currentOperand = ''
    },
    
    calculate() {
      let result;

      const previousOperandFloat = Number.parseFloat(this.previousOperand)
      const currentOperandFloat = Number.parseFloat(this.currentOperand)

      if(isNaN(previousOperandFloat) || isNaN(currentOperandFloat)) return

      if(this.operation === '+') result = previousOperandFloat + currentOperandFloat
      if(this.operation === '-') result = previousOperandFloat - currentOperandFloat
      if(this.operation === 'x') result = previousOperandFloat * currentOperandFloat
      if(this.operation === '÷') result = previousOperandFloat / currentOperandFloat

      this.clear()
      this.currentOperand = String(result)
    },

    formatNumber(number) {      
      const integerDigits = number.split('.')[0]
      const decimalDigits = number.split('.')[1]

      if(!integerDigits) return ''

      const integerDisplay = new Intl.NumberFormat('en-US', {maximumFractionDigits:0}).format(integerDigits)
  
      if (decimalDigits) return `${integerDisplay}.${decimalDigits}`
      if(number.includes('.')) return integerDisplay + '.'
      return integerDisplay
    },

    updateDisplay() {
      previousOperandElement.innerText = `${this.formatNumber(this.previousOperand)} ${this.operation || ''}`
      currentOperandElement.innerText = this.formatNumber(this.currentOperand)
    },
  }
}

const calculator = createCalculator()

document.addEventListener('click', (e) => {
  const el = e.target

  if(el.hasAttribute('data-all-clear')) calculator.clear()
  if(el.hasAttribute('data-delete')) calculator.deleteNumber()
  if(el.hasAttribute('data-number')) calculator.addNumber(el.innerText)
  if(el.hasAttribute('data-operator')) calculator.chooseOperation(el.innerText) 
  if(el.hasAttribute('data-equal')) calculator.calculate()
  
  calculator.updateDisplay()
})

document.addEventListener('keypress', (e) => {
  e.preventDefault()
  if (e.keyCode === 13) {
    calculator.calculate()
    calculator.updateDisplay()
  }
})
