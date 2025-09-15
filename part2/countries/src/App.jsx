import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [searched, setSearched] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
        console.log(response.data)
      })
  }, [])
  
  const findCountries = (event) => {
    console.log(event.target.value)
    setValue(event.target.value)
    const filtered = countries.filter(country =>
      country.name.common.toLowerCase().includes(event.target.value.toLowerCase())
    )
    setSearched(filtered)
  }

  const setCountry = (countryName) => {
    console.log(countryName)
    setValue(countryName)
    const filtered = countries.filter(country =>
      country.name.common.toLowerCase().includes(countryName.toLowerCase())
    )
    setSearched(filtered)
  }

  return (
    <div>
      {`find countries `}
      <input value={value} onChange={findCountries}/>
      <Countries countries={searched} onClick={setCountry} />
    </div>
  )
}

export default App