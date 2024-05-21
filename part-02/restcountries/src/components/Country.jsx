import React from "react";

const Country = ({ country }) => {
  const {
    name: { common: name },
    capital: [capital],
    area,
    languages,
    flags: flag,
  } = country;

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
    </div>
  );
};

export default Country;
