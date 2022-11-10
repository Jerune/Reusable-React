// @ts-nocheck
import React, { useReducer } from 'react'
import friendlyWords from 'friendly-words'

// Custom Hook
function useCharacterSheet () {
  const [state, dispatch] = useReducer((state, action) => {
    return { ...state, [action.type]: action.value }
  }, {
    darkMode: false,
    name: '',
    background: '',
    error: ''
  })
  return [state, dispatch]
}

const backgrounds = [
  'Noble',
  'Urchin',
  'Folk Hero',
  'Acolyte',
  'Criminal',
  'Hermit',
  'Guild Artisan',
  'Sage'
]

function randomBackground () {
  return backgrounds[Math.floor(Math.random() * backgrounds.length)]
}

function randomName () {
  const array = friendlyWords.predicates
  const string = array[Math.floor(Math.random() * array.length)]
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// Component
export default function CharacterSheet () {
  const [state, dispatch] = useCharacterSheet()

  function handleBackgroundSelect (event) {
    const value = event.target.value
    dispatch({ type: 'background', value })
    if (!backgrounds.includes(value)) {
      dispatch({ type: 'error', value: 'This background does NOT exist.' })
    } else {
      dispatch({ type: 'error', value: '' })
    }
  }

  const { darkMode, name, background, error } = state

  return (
    <>
      <div className={`Character ${darkMode ? 'darkmode' : ''}`}>
        <button
          onClick={() => {
            dispatch({ type: 'darkMode', value: !darkMode })
          }}
        >
          Dark Mode {darkMode ? 'ON' : 'OFF'}
        </button>{' '}
        <br />
        <input
          type="text"
          placeholder="Type your name"
          value={name}
          onChange={(event) => {
            dispatch({ type: 'name', value: event.target.value })
            if (event.target.value.length > 15) {
              dispatch({ type: 'error', value: 'Name is WAY too long, bucko.' })
            }
          }}
        />
        <select value={background} onChange={handleBackgroundSelect}>
          {backgrounds.map((b) => {
            return <option key={`bg-${b}`}>{b}</option>
          })}
        </select>
        {error && (
          <div className="error">
            {error}
            <button
              onClick={() => {
                dispatch({ type: 'error', value: '' })
              }}
            >
              Dismiss
            </button>
          </div>
        )}
        <div className="sheet">
          <h3>Name: {name}</h3>
          <h3>Background: {background}</h3>
        </div>
        <button
          onClick={() => {
            dispatch({ type: 'name', value: randomName() })
            dispatch({ type: 'background', value: randomBackground() })
          }}
        >
          Do it all for me instead
        </button>
      </div>
    </>
  )
}
