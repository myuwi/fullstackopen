import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import Countries from "./components/Countries";
import Country from "./components/Country";
import Filter from "./components/Filter";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  const filteredCountries = useMemo(() => {
    return countries.filter((c) =>
      c.name.common.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [countries, filter]);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((res) => setCountries(res.data));
  }, []);

  const handleFilterChange = (e) => setFilter(e.target.value);

  return (
    <div>
      <Filter value={filter} onChange={handleFilterChange} />
      {filteredCountries.length === 1 ? (
        <Country country={filteredCountries[0]} />
      ) : (
        <Countries countries={filteredCountries} />
      )}
    </div>
  );
};

export default App;
