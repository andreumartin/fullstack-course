import axios from "axios"
import { useState } from 'react'

const Countries = ({countries, onClick}) => {
    const [temp, setTemp] = useState(0)
    const [wnd, setWnd] = useState(0)
    const [icn, setIcn] = useState('')
    if(countries.length === 0){
        return <div>No country matching the filter</div>
    }
    if(countries.length > 10){
        return <div>Too many matches, specify another filter</div>
    } else {
        if(countries.length === 1){
            const country = countries[0]
            const apiKey = import.meta.env.VITE_SOME_KEY
            axios
                .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${apiKey}`)
                .then(response => {
                    setTemp(response.data.main.temp - 273.15)
                    setWnd(response.data.wind.speed)
                    setIcn(response.data.weather[0].icon)
                })
            return <div>
                <h1>{country.name.common}</h1>
                <div>Capital {country.capital}</div>
                <div>Area {country.area}</div>
                <h2>Languages</h2>
                <ul>
                    {Object.values(country.languages).map(lang => (
                        <li key={lang}>{lang}</li>
                    ))}
                </ul>
                <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width={200} />
                <h2>Weather in {country.capital}</h2>
                <div>Temperature of {temp} Celsius</div>
                <img src={`https://openweathermap.org/img/wn/${icn}@2x.png`} />
                <div>Wind {wnd} m/s</div>
            </div>
        } else {
            return countries.map(country => <div key={country.ccn3}>{country.name.common} {' '} <button onClick={() => onClick(country.name.common)}>Show</button></div>)
        }
    }
}

export default Countries;