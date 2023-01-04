import {useState, useEffect} from 'react'
import axios from 'axios'
import CountryDetails from './components/CountryDetails'



const App = () => {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  

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
        <button onClick={() => setSelectedCountry(country)}> Show Details </button>

        </div>))}
        {filteredCountries.length === 1 && <CountryDetails country={filteredCountries[0]} /> }
      {selectedCountry && <CountryDetails country={selectedCountry} />}  
      
    </div>
  )
}
export default App