class Forecast {
  constructor() {
    this.key = "Gygtz8SOed1WdIEgPU1OshRoMbvA1Wnw";
    this.weatherURI = "http://dataservice.accuweather.com/currentconditions/v1/";
    this.cityURI = "http://dataservice.accuweather.com/locations/v1/cities/search";
  }
  // in a class, to make the function async, you have to put it in the front
  async updateCity(city) {
    // it returns a promise, so we wait for the function to pass before  we place the value in the variable
    const cityDets = await this.getCity(city);
    const weather = await this.getWeather(cityDets.Key);
    // this will be the data when we fire the callback function
    return {
      // this is shorthand notation for cityDets : cityDets
      cityDets,
      weather
    };
  }
  async getCity(city) {
    const query = `?apikey=${this.key}&q=${city}`;
    // now we fetch those two together
    const response = await fetch(`${this.cityURI}${query}`);
    // we have to turn that into json data
    const data = await response.json();
    // there will be many elements that match up with manchester
    return data[0]; //  we will get the first one since it matches up the best
  }
  async getWeather(id) {
    // we need to output the id, then we begint the query perameter with a question mark
    const query = `${id}?apikey=${this.key}`;

    const response = await fetch(`${this.weatherURI}${query}`);
    const data = await response.json();
    return data[0];
  }
}

