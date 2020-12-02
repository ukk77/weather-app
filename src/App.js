import React, { useState} from 'react'
import './App.css';

function App() {
  const [city, setCity] = useState("")
  const [display, setDisplay] = useState(false)
  const [data, setData] = useState({})
  const [weather, setWeather] = useState([])
  const api_key = "a67e838fb54bdc0156e62e57e6423d3f";
  const api = "https://api.openweathermap.org/data/2.5/weather"
  const [location, setLocation] = useState("")

  const handleCityChange = (e) => {
    // console.log(e.target.value)
    setCity(e.target.value)
  }
  
  const getData = async (e) => {
    if(e.key === "Enter"){
      if(e.target.value !== ""){
        await fetch(api + "?q=" + city + "&units=metric&appid=" + api_key)
        .then(response => response.json())
        .then(data => {
          if(data.cod !== "404"){
            setData(data.main)
            setWeather(data.weather)
            setLocation("" + data.name + "," + data.sys.country)
            e.target.value = ""
            setDisplay(true)
          }
          else{
            alert("city not found")
            e.target.value = ""
          }
        })
      }
      else {
        alert("Please enter city name")
      }     
  }
}

  return (
    <div className="App">
      <div className={data.temp>16? "weather-form-display-warm" : "weather-form-display"}>
        <div className="search-form">
          <div className="search-bar">
            <input 
              type="text"  
              className="search-bar"
              placeholder="Search"
              onChange={handleCityChange}
              onKeyDown={getData}
              ></input>
          </div>
        </div>
        <div className="weather-display">
          {display?
          <div className="display-section">
            <div className="location">
              {location}
            </div>
            <div className="all-temp">
            <div className="temp">
              {data.temp + "°c"}<br/>
            </div>
            <div className="feels-like">
              Feels like {data.feels_like + "°c"}<br/>
            </div>
            </div>
            <div>
            {weather.map((weather_obj) => (
              <div className="current-conditions">
                {weather_obj.description}  
              </div>

            ))}
            </div>
          </div>: null
          }
        </div>
      </div>
    </div>
  );
}

export default App;
