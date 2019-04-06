import React from "react";

import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "2dbc31b14fc6414683e0672efb3df7b3";

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    state: undefined,
    country: undefined,
    description: undefined,
    icon: undefined,
    error: undefined
  }
    getWeather = async (e) => {
      e.preventDefault();
      const city = e.target.elements.city.value;
      const state =  e.target.elements.state.value;
      const country = e.target.elements.country.value;
      const api_call = await fetch(`https://api.weatherbit.io/v2.0/current?city=${city}&state=${state}&country=${country}&key=${API_KEY}&units=I`);
      const data = await api_call.json();
      if (city && country) {
          console.log(data);
          this.setState({
          temperature: data.data[0].app_temp,
          city: data.data[0].city_name,
          state: data.data[0].state_code,
          country: data.data[0].country_code,
          description: data.data[0].weather.description,
          //icon: data.data[0].weather.code,
          error: ""
        });
      } else {
        this.setState({
          temperature: undefined,
          city: undefined,
          state: undefined,
          country: undefined,
          description: undefined,
          icon: undefined,
          error: "Please enter the values."
        });
      }
  }
  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
                <div className="col-xs-7 form-container">
                  <Form getWeather={this.getWeather} />
                  <Weather
                    temperature={this.state.temperature}
                    city={this.state.city}
                    state={this.state.state}
                    country={this.state.country}
                    description={this.state.description}
                    icon={this.state.icon}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default App;
