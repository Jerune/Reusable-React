// @ts-nocheck
import React, { useReducer } from 'react'
import friendlyWords from 'friendly-words'

// Custom Hook
function useCharacterSheetState () {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'SET_BACKGROUND': {
        return { ...state, background: action.value, error: null }
      }
      case 'NONEXISTENT_BACKGROUND': {
        return { ...state, error: 'This background does NOT exist.' }
      }
      case 'TOGGLE_DARK_MODE': {
        return { ...state, darkMode: !state.darkMode }
      }
      case 'INPUT_NAME': {
        if (action.value.length > 15) {
          return { ...state, name: action.name, error: 'Name is WAY too long, bucko' }
        } else {
          return { ...state, name: action.value }
        }
      }
      case 'DISMISS_ERROR': {
        return { ...state, error: null }
      }
      case 'RANDOMIZE_VALS': {
        return { ...state, name: randomName(), background: randomBackground() }
      }
    }
  }, {
    darkMode: false,
    name: '',
    background: '',
    error: null
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
  const [{ darkMode, name, background, error }, dispatch] = useCharacterSheetState()

  function handleBackgroundSelect (event) {
    const value = event.target.value
    // setBackground(value)
    dispatch({ type: 'SET_BACKGROUND', value })
    if (!backgrounds.includes(value)) {
      // setError('This background does NOT exist.')
      dispatch({ type: 'NONEXISTENT_BACKGROUND' })
    }
  }

  return (
    <>
      <div className={`App ${darkMode ? 'darkmode' : ''}`}>
        <button
          onClick={() => {
            // setDarkMode(!darkMode)
            dispatch({ type: 'TOGGLE_DARK_MODE' })
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
            dispatch({ type: 'INPUT_NAME', value: event.target.value })
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
                // setError(null)
                dispatch({ type: 'DISMISS_ERROR' })
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
            dispatch({ type: 'RANDOMIZE_VALS' })
            // setName(randomName())
            // setBackground(randomBackground())
          }}
        >
          Do it all for me instead
        </button>
      </div>
    </>
  )
}
