import { useEffect, useState } from "react";
import axios from "axios";

const api_key = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

const Country = ({ country }) => {
  const {
    name: { common: name },
    capital: [capital],
    area,
    languages,
    flags: flag,
  } = country;

  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`,
      )
      .then((res) => setWeather(res.data));
  }, [capital]);

  return (
    <div>
      <h2>{name}</h2>
      <div>capital {capital}</div>
      <div>area {area}</div>
      <h3>languages:</h3>
      <ul>
        {Object.values(languages).map((language) => {
          return <li key={language}>{language}</li>;
        })}
      </ul>
      <img src={flag.svg || flag.png} alt={flag.alt} width="240" />
      {weather && (
        <>
          <h2>Weather in {capital}</h2>
          <div>temperature {weather.main.temp} Celcius</div>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <div>wind {weather.wind.speed} m/s</div>
        </>
      )}
    </div>
  );
};

export default Country;
