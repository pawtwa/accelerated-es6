export class WeatherData {
  constructor(cityName, description) {
    this.cityName = cityName;
    this.description = description;
    this.temperature = '';
  }
}

export const WEATHER_DATA_PROXY_HANDLER = {
  get: function(target, property) {
    return Reflect.get(target, property);
  },
  set: function(target, property, value) {
    if (property === 'temperature' && Reflect.has(target, property)) {
      return Reflect.set(target, property, value);
    }
  }
}