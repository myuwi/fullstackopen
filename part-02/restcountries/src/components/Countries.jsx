const Countries = ({ countries, handleSelect }) => {
  return (
    <div>
      {countries.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : (
        countries.map((country) => {
          const show = () => handleSelect(country);
          return (
            <div key={country.name.common}>
              {country.name.common} <button onClick={show}>show</button>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Countries;
