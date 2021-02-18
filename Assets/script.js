var weatherWeek
var weatherToday
var uvToday
var workingWeek
var cityList = []
var webList

// For today
var lon
var lat
var city
var temp
var humidity
var wind
var uv
var iconToday
// icon

// Registers what the user search
function registerSearch(event) {
    event.preventDefault()
    let query = document.querySelector('#citySearch').value
    getWeatherToday(query)
}
// Maps variables for the current weather
async function getWeatherToday(query) {
    weatherToday = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=d527e56ccdc4853efdf6570164c6eeab`).then(r => r.json())


    lon = weatherToday.coord.lon
    lat = weatherToday.coord.lat
    city = weatherToday.name
    country = weatherToday.sys.country
    temp = weatherToday.main.temp
    humidity = weatherToday.main.humidity
    wind = weatherToday.wind.speed
    iconToday = weatherToday.weather[0].icon


    uvToday = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily,hourly,minutely&appid=d527e56ccdc4853efdf6570164c6eeab`).then(r => r.json())

    uv = uvToday.current.uvi

    if (uv > 3) { document.querySelector("#uv").style.backgroundColor = "rgb(216, 25, 25)", document.querySelector("#uv").style.color = "white" }
    else { document.querySelector("#uv").style.backgroundColor = "white", document.querySelector("#uv").style.color = "black" }

    weatherWeek = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&appid=d527e56ccdc4853efdf6570164c6eeab`).then(r => r.json())
    workingWeek = weatherWeek.list.filter(test => test.dt_txt.endsWith('12:00:00'))

    document.querySelector('#weatherRow').innerHTML = ''
    for (let i = 0; i < workingWeek.length; i++) {
        let dayOfWeek = workingWeek[i].dt_txt.slice(0, 10)
        let feelsLike = workingWeek[i].main.temp
        let currentHumidity = workingWeek[i].main.humidity
        let iconWeek = workingWeek[i].weather[0].icon
        displayWeek(dayOfWeek, feelsLike, currentHumidity, iconWeek)
    }
    displayToday()
    logCity(city)
}


function displayToday() {
    document.querySelector('#cityName').innerHTML = `${city}, `
    document.querySelector('#countryName').innerHTML = `${country} (${moment().format('MM/DD/YYYY')}) <img src="https://openweathermap.org/img/w/${iconToday}.png" style="width:50px;">`
    document.querySelector('#temp').innerHTML = `${temp} °C`
    document.querySelector('#humid').innerHTML = `${humidity}%`
    document.querySelector('#wind').innerHTML = `${wind} km/h`
    document.querySelector('#uv').innerHTML = `${uv}`


}

function displayWeek(dayOfWeek, feelsLike, currentHumidity, iconWeek) {

    document.querySelector('#weatherRow').innerHTML +=

        `
        <div class="col-2 mx-1">
        <div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
            <div id="thisDate" class="card-header"><strong>${dayOfWeek}</strong></div>
            <div class="card-body">
            <img src="https://openweathermap.org/img/w/${iconWeek}.png" style="width:50px;">
                <p id="thisTemp" class="card-text">Temp: ${feelsLike} °C</p>
                <p id="thisHumidity">Humidity: ${currentHumidity}%</p>
            </div>
        </div>
    </div>
        `
}

function logCity(cityName) {
    // Checks if the user searched city is already in the cityList Array
    // If not, then the city is added to the list
    if (!cityList.includes(cityName)) {
        console.log('City added to cityList')
        cityList.push(cityName)
    }
    else {
        console.log('City already in cityList')
    }
    // cityList array in localStorage in updated
    localStorage.setItem('cityList', JSON.stringify(cityList))
    // Updates the visible List of Cities on the web page
    showCityList()


}
// Updates the current session cityList with localStorage.cityList
function updateCurrentList() {
    let cloudList = JSON.parse(localStorage.cityList || '[]')
    cityList = cloudList
}

// Creates a visible list of Cities
function showCityList() {
    document.querySelector('#cityList').innerHTML = ''
    for (let i = 0; i < cityList.length; i++) {
        document.querySelector('#cityList').innerHTML +=
            `<li onclick="getWeatherToday('${cityList[i]}')" class="list-group-item">${cityList[i]}</li>`
    }
}

updateCurrentList()
showCityList()


// THIS IS FOR THE 5 DAY FORECAST
// async function getWeather(query) {
//     weather = await fetch(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&appid=d527e56ccdc4853efdf6570164c6eeab`).then(r => r.json())

//     console.log(weather)
//     console.log(weather.list.filter(test => test.dt_txt.endsWith('12:00:00')))
// }