import m03d from '/img/icons/03d.png'

const toggleClass = (item, targetItem) => {
  if (item.getAttribute('data-toggle')) {
    targetItem.classList.toggle('toggle')
  } else {
    targetItem.classList.remove('toggle')
  }
}

const toggleVisibility = () => {
  const toggleItems = Array.from(document.querySelectorAll('[data-toggle]'))

  toggleItems.forEach((toggle) => {
    const targetSelector = toggle.getAttribute('data-target')
    const targetPiece = document.querySelector(targetSelector)

    toggle.addEventListener('click', function () {
      toggleClass(this, targetPiece)
    })
  })
}

const AnchorJump = (function () {
  let links

  const setLinks = () => {
    links = Array.from(document.querySelectorAll('[data-link]'))
  }

  const linkAction = function (event) {
    event.preventDefault()

    const href = this.getAttribute('href')
    const target = document.querySelector(href)

    history.pushState(null, null, href)
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const setLinkAction = () => {
    links.forEach((link) => link.addEventListener('click', linkAction))
  }

  const init = () => {
    setLinks()
    setLinkAction()
  }

  return {
    init,
  }
})()

document.addEventListener('DOMContentLoaded', () => {
  AnchorJump.init()
  toggleVisibility()
})

// Weather API start - for now
// Tutorial by http://youtube.com/CodeExplained

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

// check if browser supports geolocation
if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError)
} else {
  notificationElement.style.display = 'block'
  notificationElement.innerHTML = "<p>Browser doesn't support geolocation</p>"
}

// user position
function setPosition(position) {
  let latitude = position.coords.latitude
  let longitude = position.coords.longitude

  getWeather(latitude, longitude)
}

// geolocation error message
function showError(error) {
  notificationElement.style.display = 'block'
  notificationElement.innerHTML = `<p>${error.message}</p>`
}

// API weather
function getWeather(latitude, longitude) {
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
    })
    .then(function () {
      displayWeather()
    })
}

// display weather
function displayWeather() {
  /* iconElement.innerHTML = `<img src="./img/icons/${weather.iconId}.png"/>` */
  /* iconElement.innerHTML = `<img src="/dist/${weather.iconId}.png"/>` */
  /* iconElement.innerHTML = `<img src="${m03d}" />` */
  iconElement.innerHTML = `<img src="${weather.iconId}.png" />`
  tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`
  descElement.innerHTML = weather.description
  locationElement.innerHTML = `${weather.city}, ${weather.country}`
}

// C to F conversion
function celsiusToFahrenheit(temperature) {
  return (temperature * 9) / 5 + 32
}

// temperatur change on click
tempElement.addEventListener('click', function () {
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
})
