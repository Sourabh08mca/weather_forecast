import axios from 'axios';
import React, {  useState } from 'react';
import Clouds from '../Images/Clouds.png'
import Clear from '../Images/Clear.png'
import Drizzle from '../Images/Drizzle.png'
import Rain from '../Images/Rain.jpg'
import Mist from '../Images/Mist.jpg'



function Home() {
  const [data, setData] = useState({
    celcius:10,
    name:'Londen',
    humidity:10,
    speed:2,
    image: (Clouds)

  })
  const [name, setName] = useState('');

 
  const handleClick = () => {
    if(name !== "") {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=fdeb86b7906b2dc82c8c7e3038ff3f91&&units=metric`;
     axios.get(apiUrl)
     .then(res => {
        let imagePath = '';
        if(res.data.weather[0].main == "Clouds"){
            imagePath = (Clouds)
        }else if(res.data.weather[0].main == "Clear"){
            imagePath = (Clear)
        }else if(res.data.weather[0].main == "Rain"){
            imagePath = (Rain)
        }else if(res.data.weather[0].main == "Drizzle"){
            imagePath = (Drizzle)
        }else if(res.data.weather[0].main == "Mist"){
            imagePath = (Mist)
        }else{
            imagePath = (Clouds)
        }
        console.log(res.data);
        setData({...data, celcius: res.data.main.temp, name: res.data.name,
             humidity: res.data.main.humidity, speed: res.data.wind.speed,
            image: imagePath})
     })
     .catch(err => console.log(err))
    }
  }

 

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-200 to-blue-500 px-4">
      {/* Search Bar */}
      <div className="mb-6 w-full max-w-md">
        <div className="flex bg-white rounded-xl overflow-hidden shadow-lg">
          <input
            type="text"
            placeholder="Enter city"
            className="flex-grow px-4 py-2 text-gray-700 focus:outline-none"
            onChange={e => setName(e.target.value)}
          />
          <button
            
            className="bg-blue-600 text-white px-4 hover:bg-blue-700 transition"
            onClick={handleClick}
          >
            Search
          </button>
        </div>
      </div>

      {/* Weather Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 w-80 space-y-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800">{data.name}</h1>
        <img src={data.image} alt='' className='icon'/>

        <div className="text-5xl font-semibold text-blue-600">{Math.round(data.celcius)}°C</div>

        <div className="flex justify-between text-gray-600 text-sm px-4">
          <div>
            <p className="font-bold text-2xl">Humidity</p>
            <p className='font-bold' >{Math.round(data.humidity)}</p>
          </div>
          <div>
            <p className="font-bold text-2xl">Wind</p>
            <p className='font-bold'>{Math.round(data.speed)} km/h</p>
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default Home;
