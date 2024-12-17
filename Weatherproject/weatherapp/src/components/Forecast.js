// FiveDayForecast.js
import React, { useState, useEffect } from 'react';

const FiveDayForecast = ({ city, apiKey }) => {
  const [fiveDayForecast, setFiveDayForecast] = useState(null);

  useEffect(() => {
    const fetchFiveDayForecast = async () => {
      const get = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
      const jsonData = await get.json()
      setFiveDayForecast(jsonData);
    }
    fetchFiveDayForecast();
  }, [city, apiKey]);

  return (
    <div>
      {fiveDayForecast && (
        // render the 5-day forecast data here
        <ul>
          {fiveDayForecast.list.map((day, index) => (
            <li key={index}>
              <p>Day {index + 1}: {day.dt_txt}</p>
              <p>Temperature: {Math.trunc(day.main.temp)}°C</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default FiveDayForecast;