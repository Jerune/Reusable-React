import React from 'react'
import Badge from './components/Badge'
import CharacterSheet from './components/CharacterSheet'
import Mood from './components/Mood'
import ReusableForm from './components/ReusableForm'
import UserData from './components/UserData'

function App () {
  const defaultMoods = ['Great', 'Okay', 'Bad']

  return (
    <section>
      <h2>Check out these badges!</h2>
      <Badge color="green">Success</Badge> This is operational. <br />
      <Badge color="red">Removed</Badge> This is critical. <br />
      <Badge color="yellow">Warning</Badge> This is a warning. <br />
      <Badge color="blue">Beta</Badge> This is in progress. <br />

      <h2>Mood Tracker</h2>
      <Mood text={'How was your day?'} defaults={defaultMoods}/>

      <h2>Togglable Form</h2>
      <ReusableForm />

      <h2>Character Sheet</h2>
      <CharacterSheet />

      <UserData />
    </section>
  )
}

export default App
