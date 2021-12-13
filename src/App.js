import React from 'react';
import './App.css';
import Weather from './Components/weather.component';
import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.css";
import Form from './Components/form-component';
const API_key = "aaa165501f8bee670262de650d7b4b92";

//api.openweathermap.org/data/2.5/weather?q=London
class App extends React.Component{
  constructor(){
    super();
    this.state={
      city : undefined,
      country : undefined,
      icon : undefined,
      main : undefined,
      celsius : undefined,
      temp_max : undefined,
      temp_min : undefined,
      description :undefined,
      error :true

    };
    

    this.weatherIcon = {
      ThunderStorm: "wi-thunderstorm",
      Drizzle : "wi-sleet",
      Rain : " wi-storm-showers",
      Snow : "wi-snow",
      Atmosphere : "wi-fog",
      clear : "wi-day-sunny",
      Clouds : "wi-day-fog"

    }
  }

  calculateCelsius(temp){
    let cell =Math.floor(temp-273.15) 
    return cell
  }

  getWeatherIcon(icons,id){
    switch(true){
      case id >= 200 && id<=232:
        this.setState({icon:this.weatherIcon.ThunderStorm})
        break;
      case id >= 300 && id<=321:
        this.setState({icon:this.weatherIcon.Drizzle})
        break;
      case id >= 500 && id<=532:
        this.setState({icon:this.weatherIcon.Rain})
        break;
      case id >= 600 && id<=632:
        this.setState({icon:this.weatherIcon.Snow})
        break;
      case id >= 701 && id<=781:
        this.setState({icon:this.weatherIcon.Atmosphere})
        break;
      case id === 801:
        this.setState({icon:this.weatherIcon.clear})
        break;
      case id >= 801 && id<=804:
        this.setState({icon:this.weatherIcon.Clouds})
        break;
        default:
          this.setState({icon:this.weatherIcon.Clouds})
    }
  }
  getWeather = async(e)=>{
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.city.value;

    
    if(city && country){
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`)
      
    
    const response = await api_call.json();
    console.log(response)
    
    this.setState({
      city: `${response.name},${response.sys.country}`,
      celsius : this.calculateCelsius(response.main.temp),
      temp_max : this.calculateCelsius(response.main.temp_max),
      temp_min : this.calculateCelsius(response.main.temp_min),
      description : response.weather[0].description,
     
    })
    
    this.getWeatherIcon(this.weatherIcon,response.weather[0].id)
    }else {
      this.setState({error:true})
    }
  };

  render(){
    return (
    <div className="App">
      <Form 
      loadWeather= {this.getWeather}
      error ={this.state.error}
      />


     <Weather 
     city={this.state.city} 
     country={this.state.country} 
     temp_celsius={this.state.celsius}
     temp_max = {this.state.temp_max}
     temp_min ={this.state.temp_min}
     description = {this.state.description}
     weatherIcon = {this.state.icon}
     />
    </div>
    );
  }
    
}




export default App;
