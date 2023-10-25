import { useEffect, useState } from "react"
// import {Forecast7day} from "./components/Forecast7day.jsx"

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [location, setLocation] = useState({});
  const [isListVisible, setListVisible] = useState(true);
  const [forecastData, setForecastData] = useState([]);
  const [toStringDate, setToStringDate] = useState([]);


  const API_KEY = '540416586e4c4990b7d144004231910';
  const API_URL = `https://api.weatherapi.com/v1/current.json`;
  const API_AUTOCOMPLETE_URL = `https://api.weatherapi.com/v1/search.json`;
  const API_FORECAST_URL = `https://api.weatherapi.com/v1/forecast.json`;

  // AUTOCOMPLETE REQUEST FROM THE API
  useEffect(() => {
    if (typeof city === 'string' && city.trim() !== '') {
      fetch(`${API_AUTOCOMPLETE_URL}?key=${API_KEY}&q=${city}}`)
        .then((response) => response.json())
        .then((data) => setSuggestions(data))
        .catch((error) => console.error('Error fetching city:', error))
    } else {
      // Clear suggestions when the input is empty
      setSuggestions([]);
    }
  }, [city])

  // Handle user input change
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setCity(inputValue);
    setListVisible(true);
  };

  // SETTING LOCATION
  const handleSuggestionSelect = (suggestion) => {
    setLocation(suggestion.url);
    setCity(suggestion.name + " " + suggestion.region + " " + suggestion.country);
    setListVisible(false); //UNHIDE THE SUGGESTIONS LIST
  };

  // GETTING THE DATA FROM THE API 
  function handleSubmit(e) {
    e.preventDefault();

    // Define the 'location' variable here or obtain it from your form input

    console.log(location);

    fetch(`${API_URL}?key=${API_KEY}&q=${location}&aqi=yes`)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
        // Log 'weatherData' or perform further actions here
      })
      .catch((error) => console.error('Error fetching weather data:', error));

    // GETTING 7-DAY FORECAST FROM THE API
    fetch(`${API_FORECAST_URL}?key=${API_KEY}&q=${location}&days=7&aqi=yes&alerts=no`)
      .then((response) => response.json())
      .then((data) => {
        setForecastData(data);
        console.log(forecastData);
      })
      .catch((error) => console.error('Error fetching forecast data:', error));
  }


  return (
    <div className=" bg-blue-300">
      <div className=" min-h-1/2 flex items-center justify-center  p-8 ">
        <div className="bg-white p-8 rounded shadow-lg">
          <h1 className="text-2xl font-semibold mb-4">Weather App made with ReactJS, Tailwind, and API-integrated</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter City"
              className="w-full p-2 border rounded shadow-sm mb-4"
              value={city}
              onChange={handleInputChange}
            />
            <div className="fixed max-h-[500px] max-w-[350px] overflow-y-auto scroll-auto">
              <ul className="list-none p-0 bg-slate-100" style={{ display: isListVisible ? 'block' : 'none' }}>
                {suggestions.map((suggestion, index) => (
                  <button key={index} className="text-left w-full hover:bg-gray-300 p-2"
                    onClick={
                      () => handleSuggestionSelect(suggestion)
                    }
                    data-url={suggestion.url}>
                    - {suggestion.name}, {suggestion.region}, {suggestion.country}
                  </button>
                ))}
              </ul>
            </div>

            {/* <button className="w-full bg-blue-500 text-white p-2 rounded hover-bg-blue-600">
              Get Weather
            </button> */}
          </form>
        </div>
      </div>
      {/* RESULTS */}
      {weatherData.current && (
        <div className="bg-gray-100 font-sans m-auto min-w-sm p-8 md:max-w-[1240px] lg:max-w-[960px] border border-gray-100 rounded shadow-lg">
          <div className="text-center">
            <div>
              {/* weatyher image condition */}
              <div className="p-1 mb-4 border rounded-full shadow-lg shadow-slate-300 w-16 h-16 m-auto">
                {weatherData.current.condition && (
                  <img className="w-full h-full" src={weatherData.current.condition.icon} alt="Weather Icon" />
                )}
              </div>

              {/* city */}
              <p className="text-2xl md:text-3xl lg:text-5xl font-light">{weatherData.location.name}</p>

              {/* weather condition */}
              <p className="text-2xl font-extralight">{weatherData.current.condition.text}</p>

              {/* weather temperature */}
              <div id="temperature" className="my-8 ">
                <h2 className="text-2xl font-light">{weatherData.location.localtime.toLocaleString('en-US', { weekday: 'long' })}</h2>
                <h2 className="text-6xl md:text-7xl lg:text-9xl font-normal">{weatherData.current.temp_c}°</h2>
                <h3 className="text-2xl font-light">{weatherData.current.temp_f}°F</h3>
              </div>
            </div>

            {weatherData.location && (
              <div>
                <p className="text-2xl font-light">{weatherData.location.region}, {weatherData.location.country}</p>
              </div>
            )}
          </div>

          {/* START OF FORECAST Weather */}

          <div className="m-2 flex justify-center">
            <div className="text-center w-full grid md:grid-cols-7  lg:grid-cols-7">
              {forecastData && forecastData.forecast && forecastData.forecast.forecastday ? (
                forecastData.forecast.forecastday.map((dayData, index) => (
                  <div key={index} className="border border-gray-300 border-solid py-3 w-full text-1xl font-extralight"
                    onClick={() => handleDayClick(dayData.date)}>
                    <div>
                      <h2 className="font-normal">Day {index + 1}</h2>
                      <div className="p-1 mb-4 border rounded-full shadow-lg shadow-blue-100 w-16 h-16 m-auto">
                        {dayData.day.condition ? (
                          <img className="" src={dayData.day.condition.icon} alt="Weather Icon" />
                        ) : (
                          <p>No weather icon available</p>
                        )}
                      </div>

                      <p className="font-semibold">{dayData.day.avgtemp_c}°</p>
                      <p className="font-extralight">{dayData.day.avgtemp_f}</p>
                      <p className="font-extralight">{dayData.day.temperature}</p>
                    </div>

                    {/* You can access other properties like dayData.astro, dayData.hour, etc. */}
                  </div>
                ))
              ) : (
                <p className="text-center">Loading forecast data...</p>
              )}
            </div>
          </div>

          {/* END OF FORECAST Weather */}

          {/* START OTHER WEATHER DETAILS */}
          <div>{weatherData.current && (
            <div className="shadows-lg my-4 grid grid-rows-2 md:grid-cols-2 lg:grid-cols-2  max-w-[600px] m-auto text-center">
              <div>
                <h3 className="text-2xl font-light  flex justify-evenly">Other weather details:</h3>
                <p className="text-1xl font-extralight lg:pl-3">Humidity: {weatherData.current.humidity}</p>
              </div>

              <div className="">
                <h3 className="text-2xl font-light flex justify-evenly">Air Quality</h3>
                {/* FIX THIS NO AQI REQUEST SHOWING UP */}
                <div className="lg:pl-3">
                  <p className="text-1xl font-extralight">Carbon Monoxide: {weatherData.current.air_quality.co}</p>
                  <p className="text-1xl font-extralight">Nitrogen dioxide: {weatherData.current.air_quality.no2}</p>
                  <p className="text-1xl font-extralight">US - EPA standard: {weatherData.current.air_quality["us-epa-index"]} (
                    {weatherData.current.air_quality["us-epa-index"] === 1
                      ? "Good"
                      : weatherData.current.air_quality["us-epa-index"] === 2
                        ? "Moderate"
                        : weatherData.current.air_quality["us-epa-index"] === 3
                          ? "Unhealthy for sensitive group"
                          : weatherData.current.air_quality["us-epa-index"] === 4
                            ? "Unhealthy"
                            : weatherData.current.air_quality["us-epa-index"] === 5
                              ? "Very Unhealthy"
                              : weatherData.current.air_quality["us-epa-index"] === 6
                                ? "Hazardous"
                                : "Unknown"
                    })
                  </p>
                </div>

              </div>
            </div>
          )}
          </div>
          {/* END OF OTHER WEATHER DETAILS */}
        </div>)}
    </div>

  );
};

export default WeatherApp;