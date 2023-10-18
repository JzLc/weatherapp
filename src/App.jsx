import { useState } from 'react'
import './App.css'

function App() {

  return (
    <>
      <nav className=" w-full h-auto p-8  md:h-24 lg:h-24 flex justify-center items-center bg-slate-800">
        <h1 className="text-center text-2xl md:text-3xl lg:text-4xl text-gray-200 font-bold">Welcome to WeatherApp made with
          <span className="text-red-400 md:text-3xl lg:text-4xl"> ReactJS </span>and
          <span className="text-blue-300 md:text-3xl lg:text-4xl"> TailwindCSS </span>
        </h1>
      </nav>
      <div className='text-center mt-8' id="searchBar">
        <form className="w-full p-8 md:p-4 lg:p-4">
          <input className="rounded-md bg-gray-100 m-1 p-2 px-3 w-72 lg:max-w-[9/12] border border-gray-200" type="search" name="{}" id="" placeholder='Search location...'/>
          <button className="m-1 p-2 w-auto lg:max-w-[3/12] border bg-slate-700 border-slate-400 rounded-md text-gray-200 font-bold">
            Search
          </button>
        </form>
      </div>
      <div className='mt-8 bg-blue-100 max-w-7xl m-auto'>
        <div>
          <h3>Result</h3>
        </div>
      </div>
    </>
  )
}

export default App
