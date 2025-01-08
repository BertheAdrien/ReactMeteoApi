import React, { useState } from 'react';

const CityForm = ({ onCitySubmit }) => {
  const [inputCity, setInputCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCitySubmit(inputCity);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputCity}
        onChange={(e) => setInputCity(e.target.value)}
        placeholder="Entrez une ville"
        className="input-field"
      />
      <button type="submit" className="submit-button">Rechercher</button>
    </form>
  );
};

export default CityForm;