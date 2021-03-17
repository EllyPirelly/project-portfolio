import icons from '../img/icons/*.png'

const WeatherApp = (function () {
  // API key
  const key = 'a662bc31b2ba6bfbd3bf6288c5394603'

  // select elements to manipulate
  const locationElement = document.querySelector('.wea-location p')
  const iconElement = document.querySelector('.wea-icon')
  const tempMainElement = document.querySelector('.wea-temp-main p')
  const weatherWindspeed = document.querySelector('.wea-wind-speed span')
  const weatherWinddir = document.querySelector('.wea-wind-dir span')
  const descElement = document.querySelector('.wea-desc span')
  const weatherSunrise = document.querySelector('.wea-sunrise span')
  const weatherSunset = document.querySelector('.wea-sunset span')

  // API data object to fill
  const weather = {}

  weather.temperature = {
    unit: 'celsius',
  }

  // display weather
  const displayWeather = () => {
    locationElement.innerHTML = `${weather.city}, ${weather.country}`
    iconElement.innerHTML = `<img src="${icons[weather.iconId]}" />`
    tempMainElement.innerHTML = `${weather.temperature.value}°<span>C</span>`
    weatherWindspeed.innerHTML = weather.windspeed
    weatherWinddir.innerHTML = weather.winddir
    descElement.innerHTML = weather.description
    weatherSunrise.innerHTML = weather.sunrise
    weatherSunset.innerHTML = weather.sunset
  }

  // API weather
  const getWeather = () => {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=52.5145&lon=13.3501&units=metric&appid=${key}`

    fetch(api)
      .then(function (response) {
        let data = response.json()
        return data
      })
      .then(function (data) {
        weather.city = data.name
        weather.country = data.sys.country
        weather.iconId = data.weather[0].icon
        weather.temperature.value = Math.floor(data.main.temp)
        weather.pressure = data.main.pressure
        weather.windspeed = data.wind.speed
        weather.winddir = data.wind.deg
        weather.description = data.weather[0].description
        weather.sunrise = data.sys.sunrise
        weather.sunset = data.sys.sunset
        /*weather.sunrise = new Date((data.sys.sunrise + data.timezone) * 1000)
        weather.sunset = new Date((data.sys.sunset + data.timezone) * 1000) */

        displayWeather()
      })
      .catch((error) => {
        throw error
      })
  }

  // degree to compass
  const degreeToCompass = (num) => {
    var val = Math.floor(num / 22.5 + 0.5)
    var arr = [
      'N',
      'NNE',
      'NE',
      'ENE',
      'E',
      'ESE',
      'SE',
      'SSE',
      'S',
      'SSW',
      'SW',
      'WSW',
      'W',
      'WNW',
      'NW',
      'NNW',
    ]
    return arr[val % 16]
  }

  // celsius to fahrenheit conversion
  const celsiusToFahrenheit = (temperature) => {
    return (temperature * 9) / 5 + 32
  }

  // toggle temperature celsius to fahrenheit
  const toggleTemperature = () => {
    if (weather.temperature.value === undefined) return

    if (weather.temperature.unit == 'celsius') {
      let fahrenheit = celsiusToFahrenheit(weather.temperature.value)
      fahrenheit = Math.floor(fahrenheit)
      tempMainElement.innerHTML = `${fahrenheit}°<span>F</span>`
      weather.temperature.unit = 'fahrenheit'
    } else {
      tempMainElement.innerHTML = `${weather.temperature.value}°<span>C</span>`
      weather.temperature.unit = 'celsius'
    }
  }

  const init = () => {
    getWeather()

    // temperature change on click
    tempMainElement.addEventListener('click', toggleTemperature)
  }

  return {
    init,
  }
})()

document.addEventListener('DOMContentLoaded', WeatherApp.init)
