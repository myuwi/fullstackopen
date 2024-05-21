const Countries = ({ countries }) => {
  return (
    <div>
      {countries.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : (
        countries.map((country) => (
          <div key={country.name.common}>{country.name.common}</div>
        ))
      )}
    </div>
  );
};

export default Countries;
