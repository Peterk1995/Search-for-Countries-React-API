import {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')
  

  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => 
      setCountries(response.data.map(({name, capital, area, languages, flags}) => 
      ({name: name.common, 
        capital, area, 
        languages, flags 
      }))))

  }, []) 

 

  const handleChange = (event) => {
    setQuery(event.target.value)
  }
  

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(query.toLowerCase())
  )

  console.log(filteredCountries)

  return (
    <div>
      <p>
        find countries <input value={query} onChange={handleChange} />
      </p>
      {filteredCountries.length > 10 && (
        <div> Too many matches, specify another filter </div>
      )}
      {filteredCountries.length <= 10 &&
      filteredCountries.length >= 1 &&
      filteredCountries.map(country => (
      <div>
        {country.name}
        </div>))}
      {filteredCountries.length === 1 && (
        <>
          <h1>{filteredCountries[0].name}</h1>
          <div>Capital: {filteredCountries[0].capital} </div>
          <h2> Languages: </h2>
          <ul>
           {Object.values(filteredCountries[0].languages).map(language => (
            <li key={language}> {language} </li>
            ))}
            </ul> 
            <div>
        Flag: <img src={filteredCountries[0].flags.png} alt={`Flag of ${filteredCountries[0].name}`} />
      </div>
        </>
      )}
      
    </div>
  )
}
export default App