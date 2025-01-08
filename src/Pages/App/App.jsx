import React, { useState } from 'react';
import './App.css';
import Heures from '../../Components/heures.jsx';
import Semaine from '../../Components/semaine.jsx';
import CityForm from '../../Components/cityForm.jsx';

function App() {
  const [affichage, setAffichage] = useState(false);
  const [city, setCity] = useState("");
  const [submitted, setSubmitted] = useState(false); 

  const handleCitySubmit = (newCity) => {
    setCity(newCity);
    setSubmitted(true);
  };

  const changeAffichage = () => {
    setAffichage((val) => !val);
  };

  return (
    <div className="App">
      <h1>MÉTÉO</h1>
      
      <CityForm onCitySubmit={handleCitySubmit} />

      <button onClick={changeAffichage} className="toggle-button">
        Passer en affichage par {affichage ? "heures" : "semaine"}
      </button>

      {!affichage ? 
        <Heures city={city} submitted={submitted} /> : 
        <Semaine city={city} submitted={submitted} />
      }
    </div>
  );
}

export default App;