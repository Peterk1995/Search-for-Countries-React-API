import {useState, useEffect} from 'react';
import axios from 'axios';
import CountryDetails from './components/CountryDetails';

// REACT_APP_API_KEY=a65c2a20ad2da72bd59c579eb77795af npm start



const App = () => {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null); // new state variable for weather data
  const [city, setCity] = useState('');

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=4d9d68d4f238b77f21622e54aa23fbec`)
      .then(response => {
        // store the weather data in state
        setWeather(response.data);
      })
      .catch(error => {
        // handle error
      });
  }, [city]); // only re-fetch data when the city changes

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response =>
        setCountries(
          response.data.map(
            ({name, capital, area, languages, flags}) => ({
              name: name.common,
              capital,
              area,
              languages,
              flags,
            })
          )
        )
      );
  }, []); // Change to empty array when change

  const handleChange = event => {
    setQuery(event.target.value);
    setCity(event.target.value);
  };

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(query.toLowerCase())
  );

  console.log(filteredCountries);

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
          <button onClick={() => setSelectedCountry(country)}>
            {' '}
            Show Details{' '}
          </button>
        </div>
      ))}
      {selectedCountry && (
        <CountryDetails country={selectedCountry} weather={weather} />
      )}
    </div>
  );
};

export default App;
