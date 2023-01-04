const CountryDetails = ({country}) => (
    <>
          <h1>{country.name}</h1>
          <div>Capital: {country.capital} </div>
          <h2> Languages: </h2>
          <ul>
           {Object.values(country.languages).map(language => (
            <li key={language}> {language} </li>
            ))}
            </ul> 
            <div>
        Flag: <img src={country.flags.png} alt={`Flag of ${country.name}`} />
      </div>
        </>
)

export default CountryDetails