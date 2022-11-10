/* eslint-disable react/display-name */
// @ts-nocheck
import React, { useState, useRef, forwardRef, useEffect, createElement } from 'react'
import PropTypes, { element } from 'prop-types'

const ReusableForm = () => {
  const data = [
    { name: 'Log in', component: LoginForm },
    { name: 'Sign up', component: SignupForm }
  ]
  return (
    <section>
      <h2>Log in / Sign up</h2>
      <ToggleableForm options={data} />
    </section>
  )
}

const ToggleableForm = ({ options }) => {
  const [currentForm, setCurrentForm] = useState(0)
  const focusRef = useRef(null)

  return <>
    {options.map((el, index) => {
      return <ButtonToggle key={`button${index}`} toggleForm={() => {
        setCurrentForm(index)
      }}>{el.name}</ButtonToggle>
    })}
    <FormToggle currentIndex={currentForm}>
      {options.map((el, index) => {
        return <div key={`form${index}`}>
          {createElement(el.component, { ref: focusRef })}
        </div>
      })}
    </FormToggle>
  </>
}

ToggleableForm.propTypes = {
  options: PropTypes.array
}

const ButtonToggle = ({ children, toggleRef, toggleForm }) => {
  return <button onClick={() => {
    toggleForm()
  }}>{children}</button>
}

ButtonToggle.propTypes = {
  children: PropTypes.string,
  toggleRef: PropTypes.node,
  toggleForm: PropTypes.func
}

const FormToggle = ({ children, currentIndex }) => {
  if (Array.isArray(children)) {
    return <div>{children[currentIndex]}</div>
  }
  return null
}

FormToggle.propTypes = {
  children: PropTypes.arrayOf(element),
  currentIndex: PropTypes.number
}

const LoginForm = forwardRef((props, ref) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    ref.current.focus()
  }, [])

  return <>
    <input type="text" value={username} ref={ref} placeholder="Username" onChange={(e) => {
      setUsername(e.target.value)
    }} /><br />
    <input type="password" value={password} placeholder="Password" onChange={(e) => {
      setPassword(e.target.value)
    }} /><br />
    <button>Submit</button>
  </>
})

const SignupForm = forwardRef((props, ref) => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    ref.current.focus()
  }, [])

  return <>
    <input type="email" value={email} ref={ref} placeholder="Email" onChange={(e) => {
      setEmail(e.target.value)
    }} /><br />
    <input type="text" value={username} placeholder="Username" onChange={(e) => {
      setUsername(e.target.value)
    }} /><br />
    <input type="password" value={password} placeholder="Password" onChange={(e) => {
      setPassword(e.target.value)
    }} /><br />
    <button>Submit</button>
  </>
})

export default ReusableForm
