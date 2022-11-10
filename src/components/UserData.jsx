// @ts-nocheck
import React, { useEffect, useReducer } from 'react'

// Custom Hook for API Calls
function useAuth (url) {
  const apiURL = url
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'LOADING': {
        return { ...state, loading: true }
      }
      case 'RESOLVED': {
        return {
          ...state,
          loading: false,
          response: action.response,
          error: null
        }
      }
      case 'ERROR': {
        return {
          ...state,
          loading: false,
          response: null,
          error: action.error
        }
      }
      default:
        return state
    }
  }, {
    loading: false,
    response: null,
    error: null
  })

  useEffect(() => {
    let isCurrent = true
    dispatch({ type: 'LOADING' })
    fetch(apiURL)
      .then(response => response.json())
      .then(json => {
        if (isCurrent) {
          dispatch({ type: 'RESOLVED', response: json })
        }
      }).catch(error => {
        dispatch({ type: 'ERROR', error })
      })
    return () => {
      isCurrent = false
    }
  }, [])

  // The hook returns only the needed data that we are actually using
  return [state.loading, state.response, state.error]
}

const UserData = () => {
  const [loading, response, error] = useAuth('https://jsonplaceholder.typicode.com/todos/1')

  return (
    <section>
      <h2>Get User Data</h2>
      <div className="user">
        { loading && <div>Loading...</div> }
        { error && <div className="error">ERROR OH NO</div> }
        {response && <>
          User ID: {response.id} <br />
          User Title: {response.title}
        </>}
      </div>
    </section>
  )
}

export default UserData
