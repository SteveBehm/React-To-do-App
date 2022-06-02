const $weatherDisplay = document.querySelector('.weather')
const $weatherForm = document.querySelector('#weather-form')
const $cityInput = document.querySelector('#city-input')
const $weatherTitle = document.querySelector('.weather-city')
const $weatherTemp = document.querySelector('.temp')
const $weatherDescription = document.querySelector('.description')

// Fecth the weather data from the API
const fetchWeather = async (city) => {
  const url = `/api?q=${city}`

  const res = await fetch(url)
  const data = await res.json()

  if (data.cod === '404') {
    alert('City not found')
    return
  }

  if (data.cod === '401') {
    alert('Invalid API Key')
    return
  }

  const displayData = {
    city: data.name,
    temp: kelvinToFarenheit(data.main.temp),
    description: data.weather[0].description
  }

  addWeatherToDOM(displayData)
}

// Add display data to the DOM
const addWeatherToDOM = (data) => {
  $weatherTitle.textContent =`Weather in ${data.city}`
  $weatherTemp.textContent = `${data.temp} F`
  $weatherDescription.textContent = data.description

  $cityInput.value = ''
}

// Convert Kelvin to Fahrenheit
const kelvinToFarenheit = (temp) => {
  return Math.ceil(((temp - 273.15) * 9) / 5 + 32)
}

// Event listener for form submission
$weatherForm.addEventListener('submit', (event) => {
  event.preventDefault()

  if ($cityInput.value === '') {
    alert('Please enter a city')
  } else {
    fetchWeather($cityInput.value)
  }
})

// Initial Fetch to show example data
fetchWeather('Miami')
