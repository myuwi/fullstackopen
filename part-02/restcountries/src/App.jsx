import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import Countries from "./components/Countries";
import Country from "./components/Country";
import Filter from "./components/Filter";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  const filteredCountries = useMemo(() => {
    return countries.filter((c) =>
      c.name.common.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [countries, filter]);

  const shownCountry =
    filteredCountries.length === 1 ? filteredCountries[0] : selectedCountry;

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((res) => setCountries(res.data));
  }, []);

  const handleFilterChange = (e) => {
    setSelectedCountry(null);
    setFilter(e.target.value);
  };

  return (
    <div>
      <Filter value={filter} onChange={handleFilterChange} />
      {shownCountry ? (
        <Country country={shownCountry} />
      ) : (
        <Countries
          countries={filteredCountries}
          handleSelect={setSelectedCountry}
        />
      )}
    </div>
  );
};

export default App;
