import React,{useState, useEffect} from 'react';
import Clouds from "../images/Clouds.png"
import err from "../images/error.png"
import rain from "../images/rain.png"
import raining from "../images/raining.png"
import sunny from "../images/sunny.png"


const Myapp = () => {

    const[search, setSearch]=useState("New York");
    const [ data, setData] = useState();
    const[ error, setError] =useState();

    const API_KEY="cdc8f298113b83345bc8e27ee69043e5"
    const API="https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}"

const handleInput = (event)=>{
    setSearch(event.target.value)
    console.log(event.target.value);
    

}

const myfun = async () =>{
    const get =  await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`)
    const jsonData = await get.json()
    console.log(jsonData);
    setData(jsonData);
    
    if(search == ""){
        //alert("Enter name")
        setError("Plese Enter  Name")
    }
    else if(jsonData.cod == '404'){
        setError("City Not Found")
    }else{
        setError("")
    }
    setSearch("")
}

useEffect(() => {
  myfun();
}, []);

  return (
    <>
    <div className="container">
    <div className='inputs'>
    <input placeholder='Enter City, Country' value={search} onChange={handleInput}/>
    <button onClick={myfun}><i className="fas fa-search"></i></button>
    </div>
      <div>
      {
        error ?
        <div className='errorPage'>
        <p>{error}</p>
        <img src ={err}/>

        </div>:""
      }
        {
            data && data.weather ?
            <div className='weathers'>
            <h2 className='cityName'>{data.name}</h2>
            <img src={data.weather[0].main === "Clouds"? Clouds : ""}/>
            <img src={data.weather[0].main === "Rain"? rain : ""}/>
            <img src={data.weather[0].main === "Clear"? sunny : ""}/>
            <img src={data.weather[0].main === "Mist"? raining : ""}/>
            <img src={data.weather[0].main === "Haze"? Clouds : ""}/>
            <h2 className='temperature'>{Math.trunc(data.main.temp)}°C</h2>
            <p className='climate'>{data.weather[0].description}</p>
            
            </div> : ""
        }
      </div>
      
      </div>
    </>
  )
}

export default Myapp;