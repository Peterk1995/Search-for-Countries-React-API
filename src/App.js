import {useState, useEffect} from 'react';
import axios from 'axios';

// REACT_APP_API_KEY=a65c2a20ad2da72bd59c579eb77795af npm start

const CountryDetails = ({country, weather}) => {
  return (
    <>
      <h1>{country.name}</h1>
      <div>Capital: {country.capital} </div>
      <div> Area: {country.area} </div>
      <h2> Languages: </h2>
      <ul>
        {Object.values(country.languages).map(language => (
          <li key={language}> {language} </li>
        ))}
      </ul>
      <div>
        Flag: <img src={country.flags.png} alt={`Flag of ${country.name}`} />
      </div>
      {weather && (
        <>
          <h2>Weather in {country.capital}:</h2>
          <div>Temperature: {weather.main.temp} °C</div>
          <div>Description: {weather.weather[0].description}</div>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
        </>
      )}
    </>
  );
};

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
  }, []);

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
