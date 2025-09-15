import personService from '../services/persons.js'

const Persons = ({ persons, onDelete }) => {
  return <div>
    {persons.map(person => 
      <div key={person.id}>
        {person.name} {person.number} {' '}
        <button onClick={() => onDelete(person)}>delete</button>
        
      </div>)}
  </div>
}

export default Persons