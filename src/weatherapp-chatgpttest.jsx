
// this is my actual code
import { useState } from 'react'
import './App.css'

function App() {
  const [weather, setWeather] = useState(null);
  const [news, setNews] = useState(null);

  useEffect(() => {
    // Example weather API request
    fetch('http://api.weatherapi.com/v1/current.json?key=540416586e4c4990b7d144004231910&q=London&aqi=no')
      .then((response) => response.json())
      .then((data) => setWeather(data))
      .catch((error) => console.error('Error fetching weather data:', error));
    
    // Example news API request
    // fetch('https://api.example.com/news?category=technology&apiKey=your-news-api-key')
    //   .then((response) => response.json())
    //   .then((data) => setNews(data))
    //   .catch((error) => console.error('Error fetching news data:', error));
  }, []);
    console.log()
  return (
    <>
      {/* START OF HEADER */}
      <nav className=" w-full h-auto p-8  md:h-24 lg:h-24 flex justify-center items-center bg-slate-800">
        <h1 className="text-center text-2xl md:text-3xl lg:text-4xl text-gray-200 font-bold">Welcome to WeatherApp made with
          <span className="text-red-400 md:text-3xl lg:text-4xl"> ReactJS </span>and
          <span className="text-blue-300 md:text-3xl lg:text-4xl"> TailwindCSS </span>
        </h1>
      </nav>
      {/* END OF HEADER */}

      {/* START OF SEARCH BAR */}
      <div className='text-center mt-8' id="searchBar">
        <form className="w-full p-8 md:p-4 lg:p-4">
          <input className="rounded-md bg-gray-100 m-1 p-2 px-3 w-72 lg:max-w-[9/12] border border-gray-200" type="search" name="{}" id="" placeholder='Search location...' />
          <button className="m-1 p-2 w-auto lg:max-w-[3/12] border bg-slate-700 border-slate-400 rounded-md text-gray-200 font-bold">
            Search
          </button>
        </form>
      </div>
      {/* END OF SEARCH BAR */}

      {/* START OF MAIN BODY */}
      <div className='mt-8 bg-blue-100 max-w-7xl m-auto'>
        <div>
          <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form className="bg-white p-8 rounded shadow-lg">
              <h1 className="text-2xl font-bold mb-4">Weather App</h1>
              <input
                type="text"
                placeholder="Enter Location"
                className="w-full p-2 border rounded shadow-sm mb-4"
              />
              <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                Get Weather
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* END OF MAIN BODY */}
    </>
  )
}

export default App
