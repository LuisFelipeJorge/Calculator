// As we are working with JSX sintax we need to import React
// And as we want to make a dynamic code we need to work with classes and states, therefore we must import Component as well
import React, {Component} from 'react'
import './Calculator.css' // Import the Cascading Style Sheets file

import Button from '../components/Button' // import the button component
import Display from '../components/Display' // import the display component

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {

    state = { ...initialState}

    constructor (props) {
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)

    }
    clearMemory() {
        this.setState({ ...initialState})
    }

    setOperation(operation){
        if (this.state.current === 0) { // first input
            this.setState({ operation, current: 1, clearDisplay: true})
        } else { // following inputs
            const equals = operation === '='
            const currentOperation = this.state.operation

            const values = [ ...this.state.values]
            try{
                switch (currentOperation) {
                    case '+':
                        values[0] = values[0] + values[1] 
                    break;
                    case '-':
                        values[0] = values[0] - values[1]                         
                    break;
                    case '*':
                        values[0] = values[0]*values[1]                         
                    break;
                    case '/':
                        values[0] = values[0]/values[1]                         
                    break;
                    default:
                        break;
                }
                // values[0] = eval( `${values[0]} ${currentOperation} ${values[1]}` )

                // values[0] receive the result of the operation
            } catch(e){
                values[0] = this.state.values[0]
            }
            values[1] = 0

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    addDigit(n){
        if( n === '.' && this.state.displayValue.includes('.')){
            return
        } // this does not allow two dots to be printed in the same input

        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay  // reset the display and does not allow to put left zeros in the number 
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n 
        this.setState({displayValue, clearDisplay: false}) // update the display value after input 

        if (n !== '.') {
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [ ...this.state.values]
            values[i] = newValue
            this.setState({values})

        }
    }

    // We use 'render()' function to render the component, 
    render(){
        // there must be some return to the function 
        return(
            <div className="calculator">
                <Display value={this.state.displayValue} /> {/* set the initial value of the display */}
                <Button label="AC" click={this.clearMemory} triple/>
                <Button label="/" click={this.setOperation} operation />
                <Button label="7" click={this.addDigit} />
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit} />
                <Button label="*" click={this.setOperation} operation/>
                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button label="-" click={this.setOperation} operation/>
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />
                <Button label="+" click={this.setOperation} operation/>
                <Button label="0" click={this.addDigit} double/>
                <Button label="." click={this.addDigit} />
                <Button label="=" click={this.setOperation} operation/>
            </div>
        ) 
         
    }
}