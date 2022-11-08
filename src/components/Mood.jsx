import React, { useState } from 'react'
import PropTypes from 'prop-types'

export default function Mood ({ text, defaults }) {
  const [inputValue, setInputValue] = useState('')
  const maxLength = 100

  function handleChange (event) {
    setInputValue(event.target.value)
  }

  function pushInput (value) {
    setInputValue(value)
  }

  function countCharacters () {
    return inputValue.split(' ').join('').length
  }

  return <div className={`counterInput ${inputValue.length > maxLength ? 'tooLong' : ''}`}>
    <div>
      {defaults.map((value, index) => {
        return <button onClick={() => pushInput(value)} key={index}>{value}</button>
      })}
    </div>
    <textarea
      placeholder={text}
      value={inputValue}
      onChange={handleChange}
    />
    <div>{countCharacters()}/{maxLength}</div>
  </div>
}

Mood.propTypes = {
  text: PropTypes.string.isRequired,
  defaults: PropTypes.array
}
