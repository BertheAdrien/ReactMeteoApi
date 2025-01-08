import React, { useState, useEffect } from 'react';

const Semaine = ({ city, submitted }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const apiKey = "bc2fe2ab317fd391ca9683c0f45aa957";
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&lang=fr&units=metric`;

      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();
        setWeatherData(data);
        console.log(data)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (city && submitted) {
      fetchWeatherData();
    }
  }, [city, submitted]);

  const getDayName = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('fr-FR', { weekday: 'long' });
  };

  const getDateNumber = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const day = date.getDate().toString().padStart(2, '0'); 
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    return `${day}/${month}`;
  };

  const filterDailyForecasts = (list) => {
    const filtered = [];
    const datesSeen = new Set();

    for (const day of list) {
      const forecastTime = day.dt * 1000;
      const forecastDate = new Date(forecastTime).toLocaleDateString('fr-FR');

      if (!datesSeen.has(forecastDate)) {
        datesSeen.add(forecastDate);
        filtered.push(day);
      }
    }
    
    return filtered;
  };

  if (!submitted) return null;
  if (loading) return <p className="loading">Chargement...</p>;
  if (error) return <p className="error">Erreur : {error}</p>;
  if (!weatherData || !weatherData.list) return <p className="no-data">Aucune donnée disponible</p>;

  return (
    <div className="forecast-container">
      {/* Ajout du titre bien séparé */}
      <h2 className="forecast-title">Temps de la semaine sur {city}</h2>
      
      {/* Utilisation d'un conteneur flex en colonne */}
      <div className="forecast-cards">
        {filterDailyForecasts(weatherData.list).slice(0, 7).map((day, index) => (
          <div key={index} className="forecast-card">
            <h5 className="day-name">{getDayName(day.dt)}</h5>
            <h5 className="date-number">{getDateNumber(day.dt)}</h5>
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              alt={day.weather[0].description}
              className="weather-icon"
            />
            <p className="temp">{Math.round(day.main.temp)}°C</p>
            <p className="description">{day.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
);

};

export default Semaine;
