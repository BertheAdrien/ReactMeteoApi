import { useState, useEffect } from 'react';

export default function Semaine({ datas }) {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            const apiKey = "bc2fe2ab317fd391ca9683c0f45aa957";
            const city = "Paris";
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=en&units=metric`;
            
            try {
                setLoading(true);
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }

                const data = await response.json();
                setWeatherData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchWeatherData();
    }, []);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error}</p>;

    return (
        <div>
            <h1>Données Météo</h1>
            {weatherData ? (
                <p>Température : {weatherData.main.temp} °C</p>
            ) : (
                <p>Aucune donnée disponible</p>
            )}
        </div>
    );

}