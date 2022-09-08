> Nitya M:
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400;500;600;700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Outfit', 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

p {
  font-size: 1.6rem;
}

h1 {
  font-size: 6rem;
}

.app {
  width: 100%;
  height: 100vh;
  position: relative;
  background-color: rgba(0,0,0,0.4);
  background: url('./assets/sunset.jpg') no-repeat center center/cover;
  color: #fff;
}

.app:before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
}

.app .search {
  text-align: center;
  padding: 1rem;
}

.app input {
  padding: .7rem 1.5rem;
  font-size: 1.2rem;
  border-radius: 25px;
  border: 1px solid rgba(255,255,255, 0.8);
  background: rgba(255,255,255, 0.1);
  color: #f8f8f8;
}

::placeholder {
  color: #f8f8f8;
}

.container {
  max-width: 700px;
  height: 100%;
  margin: auto;
  padding: 0 1rem;
  position: relative;
  top: 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.app .top {
  width: 70%;
  margin: 1rem auto;
}

.app .description {
  position: relative;
  right: -90%;
  transform-origin: 0 0;
  transform: rotate(269deg);
}

.app .bottom {
  display: flex;
  text-align: center;
  width: 100%;
  margin: 1rem auto;
  padding: 1rem;
  border-radius: 12px;
  justify-content: space-between;
  align-content: flex-end;
  flex-direction: row;
}

.bold {
  font-weight: 700;
}

> Nitya M:
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? (
              <h1>{data.main.temp.toFixed()}°F</h1>
            ) : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="container bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">
                  {data.main.feels_like.toFixed()}°F
                </p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? (
                <p className="bold">{data.main.humidity}%</p>
              ) : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">
                  {data.wind.speed.toFixed()} MPH
                </p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
