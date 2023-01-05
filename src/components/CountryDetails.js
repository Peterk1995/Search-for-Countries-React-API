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
  )
}

export default CountryDetails