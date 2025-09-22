import { useState } from 'react'

const App = () => {
  const [val, setVal] = useState('')
  const [evaluated, setEvaluated] = useState(null)

  const handleClick = (e) => {
    const operators = ['+', '-', 'x', '/', '.']
    const newChar = e.target.value

    setVal((prev) => {
      const lastChar = prev[prev.length - 1]
      const secondLastChar = prev[prev.length - 2]

      if (/^0$/.test(prev) && newChar === '0') return prev

      if (prev === '' && operators.includes(newChar) && newChar !== '-') {
        return ''
      }

      if (newChar === '.') {
        const parts = prev.split(/[\+\-x/]/)
        const lastNum = parts[parts.length - 1]
        if (lastNum.includes('.')) return prev
      }

      if (operators.includes(newChar)) {
        if (['+', 'x', '/'].includes(lastChar)) {
          if (newChar === '-') {
            return prev + newChar
          }
          return prev.slice(0, -1) + newChar
        } else if (lastChar === '-' && ['+', 'x', '/'].includes(secondLastChar) && ['+', 'x', '/'].includes(newChar)) {
          return prev.slice(0, -2) + newChar
        }
      }

      return prev + newChar
    })
  }

  const handleClear = () => {
    setVal('')
    setEvaluated(null)
  }

  const handleEvaluate = () => {
    if (!val) return

    try {
      const sanitizedVal = val.replaceAll('x', '*')
      const result = Function('"use strict";return (' + sanitizedVal + ')')()

      setEvaluated(result)
      setVal(result.toString())
    } catch (error) {
      setEvaluated('Error')
      setVal('')
    }
  }

  return (
    <div className='mx-auto d-flex justify-content-center align-items-center flex-column mt-5'>
      <div className='bg-black d-flex justify-content-center overflow-hidden align-items-center mt-5 flex-column'>
        <div className='text-white w-100 pe-1 fs-5 fw-semibold' style={{ height: '50px' }}>
          <span id='display' className='d-flex justify-content-end overflow-hidden text-warning'>
            {val || evaluated || 0}
          </span>
        </div>
        <div className='keys p-1'>
          <input type='button' id='clear' value='AC' onClick={handleClear} />
          <input type='button' id='divide' value='/' onClick={handleClick} />
          <input type='button' id='multiply' value='x' onClick={handleClick} />
          <input type='button' id='seven' value='7' onClick={handleClick} />
          <input type='button' id='eight' value='8' onClick={handleClick} />
          <input type='button' id='nine' value='9' onClick={handleClick} />
          <input type='button' id='subtract' value='-' onClick={handleClick} />
          <input type='button' id='four' value='4' onClick={handleClick} />
          <input type='button' id='five' value='5' onClick={handleClick} />
          <input type='button' id='six' value='6' onClick={handleClick} />
          <input type='button' id='add' value='+' onClick={handleClick} />
          <input type='button' id='one' value='1' onClick={handleClick} />
          <input type='button' id='two' value='2' onClick={handleClick} />
          <input type='button' id='three' value='3' onClick={handleClick} />
          <input type='button' id='equals' value='=' onClick={handleEvaluate} />
          <input type='button' id='zero' value='0' onClick={handleClick} />
          <input type='button' id='decimal' value='.' onClick={handleClick} />
        </div>
      </div>
      <p className='text-white'>By Abdulkadir Akmel</p>
    </div>
  )
}

export default App