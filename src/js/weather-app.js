import icons from '../img/icons/*.png'

const WeatherApp = (function () {
  // API key
  const key = 'a662bc31b2ba6bfbd3bf6288c5394603'

  // select elements to manipulate
  const locationElement = document.querySelector('.wea-location p')
  const notificationElement = document.querySelector('.wea-error-note')
  const iconElement = document.querySelector('.wea-icon')
  const tempElement = document.querySelector('.wea-temp-val p')
  const descElement = document.querySelector('.wea-desc p')

  const KELVIN = 273

  // API data object to fill
  const weather = {}

  weather.temperature = {
    unit: 'celsius',
  }

  // display weather
  const displayWeather = () => {
    iconElement.innerHTML = `<img src="${icons[weather.iconId]}" />`
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`
    descElement.innerHTML = weather.description
    locationElement.innerHTML = `${weather.city}, ${weather.country}`
  }

  // geolocation error message
  const showError = (error) => {
    notificationElement.style.display = 'block'
    notificationElement.innerHTML = `<p>${error.message}</p>`
  }

  // API weather
  const getWeather = (latitude = '52.5244', longitude = '13.4105') => {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`

    fetch(api)
      .then(function (response) {
        let data = response.json()
        return data
      })
      .then(function (data) {
        weather.temperature.value = Math.floor(data.main.temp - KELVIN)
        weather.description = data.weather[0].description
        weather.iconId = data.weather[0].icon
        weather.city = data.name
        weather.country = data.sys.country
        displayWeather()
      })
      .catch((error) => {
        showError('API failure' + error)
      })
  }

  // user position
  const setPosition = (position) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude

    getWeather(latitude, longitude)
  }

  // C to F conversion
  const celsiusToFahrenheit = (temperature) => {
    return (temperature * 9) / 5 + 32
  }

  const toggleTemperature = () => {
    if (weather.temperature.value === undefined) return

    if (weather.temperature.unit == 'celsius') {
      let fahrenheit = celsiusToFahrenheit(weather.temperature.value)
      fahrenheit = Math.floor(fahrenheit)

      tempElement.innerHTML = `${fahrenheit}°<span>F</span>`
      weather.temperature.unit = 'fahrenheit'
    } else {
      tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`
      weather.temperature.unit = 'celsius'
    }
  }

  const init = () => {
    // check if browser supports geolocation
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(setPosition, showError)
    } else {
      notificationElement.style.display = 'block'
      notificationElement.innerHTML =
        "<p>Browser doesn't support geolocation</p>"
    }

    getWeather()

    // temperature change on click
    tempElement.addEventListener('click', toggleTemperature)
  }

  return {
    init,
  }
})()

document.addEventListener('DOMContentLoaded', WeatherApp.init)
