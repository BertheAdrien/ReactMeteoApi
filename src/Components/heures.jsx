import React, { useState, useEffect } from 'react';

const Heures = ({ city, submitted }) => {
  const [hourlyData, setHourlyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHourlyData = async () => {
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
        setHourlyData(data);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (city && submitted) {
      fetchHourlyData();
    }
  }, [city, submitted]);

  if (!submitted) return null;
  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;
  if (!hourlyData) return <p>Aucune donnée disponible</p>;

  return (
    <div className="forecast-container">
        <h2 className="forecast-title">Temps de la semaine sur {city}</h2>
        <div className="hourly-forecast">
        {hourlyData.list.slice(0, 9).map((hour, index) => (
            
            <div key={index} className="forecast-card">
            <h5>{new Date(hour.dt * 1000).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</h5>
            <p>{Math.round(hour.main.temp)}°C</p>
            <p>{hour.weather[0].description}</p>
            </div>
        ))}
        </div>
    </div>
  );
};

export default Heures;