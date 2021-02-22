import React, { useState } from 'react';
const api ={
  key:"7047d64e09cfd37300ef7d0afa092ac1",
  base:"http://api.openweathermap.org/data/2.5/"
}
function App() {

  const [query, setQuery] =useState('');
  const [weather,setWeather]=useState('');
  const search = evt =>{
    if (evt.key==="Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res=> res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
  
    let date = String(new window.Date());
    date = date.slice(0,15)
    return `${date}`
  }
  return (
    <div className= {(typeof weather.main != "undefined") 
      ? ((weather.main.temp >15) ? 'App warm' : 'App') 
      :'App' }>
      <main>
        <div className="search-box">
          <input type="text"
          className="search-bar"
          placeholder="Search..."
          onChange={e =>setQuery(e.target.value)}
          value={query}
          onKeyPress={search}/>
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>

          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°C
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>

          <div className="info">
              
              <div className="column left">Feels Like</div>
              <div className="column right">{Math.round(weather.main.feels_like)} °C</div>
              
              <div className="column left">High</div>
              <div className="column right">{Math.round(weather.main.temp_max)} °C</div>
              <div className="column left">Low</div>
              <div className="column right">{Math.round(weather.main.temp_min)} °C</div>
              <div className="column left">Humidity</div>
              <div className="column right">{Math.round(weather.main.humidity)}%</div>
              <div className="column left">Wind Speed</div>
              <div className="column right">{Math.round(weather.wind.speed)} km/h</div>


            </div>
        </div>

        ) : ('')}
        </main>      
    </div>
  );
}

export default App;
