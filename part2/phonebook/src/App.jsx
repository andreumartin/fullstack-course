import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import personService from './services/persons.js'
import Notification from './components/Notification.jsx'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [filtered, setFiltered] = useState(persons)
  const [errorMessage, setErrorMessage] = useState({ message: null, type: null })

  const hook = () => {
    console.log('effect')
    personService
      .getAll()
      .then(returnedPersons => {
        console.log('promise fulfilled')
        setPersons(returnedPersons)
        setFiltered(returnedPersons)
      })
  }
  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: `${persons.length + 1}`
    }
    if(persons.every((person) => person.name != personObject.name)){
      personService
        .create(personObject)
        .then(returnedPerson => {
          setFiltered(persons.concat(returnedPerson))
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setSearchValue('')
          setErrorMessage(
            { message: `Added ${personObject.name}`, type: 'success' }
          )
          setTimeout(() => {
            setErrorMessage({ message: null, type: null })
          }, 5000)
        })
    } else {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const updateP = persons.find(p => p.name === newName)
        const updatedObject = {
          ...updateP,
          name: newName,
          number: newNumber
        }
        personService
          .update(updatedObject.id, updatedObject)
          .then(returnedPerson => {
            const newPersons = persons.map(person => person.name === newName ? returnedPerson : person)
            setFiltered(newPersons)
            setPersons(newPersons)
            setNewName('')
            setNewNumber('')
            setSearchValue('')
            setErrorMessage(
              { message: `Modified ${personObject.name}`, type: 'success' }
            )
            setTimeout(() => {
              setErrorMessage({ message: null, type: null })
            }, 5000)
          }).catch(error => {
            setErrorMessage(
              { message: `Information of ${newName} has already been removed from server`, type: 'error' }
            )
            setPersons(persons.filter(n => n.name !== newName))
            setFiltered(filtered.filter(n => n.name !== newName))
            setNewName('')
            setNewNumber('')
            setTimeout(() => {
              setErrorMessage({ message: null, type: null })
            }, 5000)
          })
      } else {
        console.log('Addition canceled')
        setNewName('')
          setNewNumber('')
      }
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleDeletePerson = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.deletePerson(person.id).then(() => {
        const updatedPersons = persons.filter(p => p.id !== person.id)
        setPersons(updatedPersons)
        setFiltered(updatedPersons.filter(p => p.name.toLowerCase().includes(searchValue.toLowerCase())))
      })
    }
  }

  const filterPersons = (event) => {
    setSearchValue(event.target.value)
    setFiltered(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage.message} type={errorMessage.type}/>
      <Filter value ={searchValue} onChange={filterPersons}/>
      <h3>Add a new</h3>
      <div>debug: {newName}</div>
      <PersonForm 
        onSubmit={addPerson} 
        value1={newName} onChange1={handleNameChange} 
        value2={newNumber} onChange2={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={filtered} onDelete={handleDeletePerson}/>
    </div>
  )
}

export default App