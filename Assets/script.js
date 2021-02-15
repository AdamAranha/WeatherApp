var weatherWeek
var weatherToday
var uvToday
var cityList = '[]'
var webList

// For today
var lon
var lat
var city
var temp
var humidity
var wind
var uv
// icon
// Registers what the user search
function registerSearch(event) {
    event.preventDefault()
    let query = document.querySelector('#citySearch').value
    getWeatherToday(query)
}
// Maps variables for the current weather
async function getWeatherToday(query) {
    weatherToday = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=d527e56ccdc4853efdf6570164c6eeab`).then(r => r.json())


    lon = weatherToday.coord.lon
    lat = weatherToday.coord.lat
    city = weatherToday.name
    temp = weatherToday.main.temp
    humidity = weatherToday.main.humidity
    wind = weatherToday.wind.speed
    console.log(cityList, typeof cityList)


    uvToday = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily,hourly,minutely&appid=d527e56ccdc4853efdf6570164c6eeab`).then(r => r.json())

    uv = uvToday.current.uvi
    displayToday()
    logCity(city)
}


function displayToday() {
    document.querySelector('#cityName').innerHTML = `${city} (${moment().format('MM/DD/YYYY')})`
    document.querySelector('#temp').innerHTML = `${temp} °C`
    document.querySelector('#humid').innerHTML = `${humidity}%`
    document.querySelector('#wind').innerHTML = `${wind} km/h`
    document.querySelector('#uv').innerHTML = `${uv}`

}


function logCity(tempObj) {

    tempObj = { city }
    localStorage.setItem()
    localStorage.cityList = JSON.stringify(cityList)
    console.log(cityList, typeof cityList)
    updateList()
}
function showCity() {
    temp = JSON.parse(localStorage.cityList || '[]')
    cityList = temp
    updateList()
}

function updateList() {
    for (let i = 0; i < cityList.length; i++) {
        document.querySelector('#cityList').innerHTML +=
            `<li onclick="getWeatherToday('${cityList[i]}')" class="list-group-item">${cityList[i]}</li>`
    }
}

showCity()
// THIS IS FOR THE 5 DAY FORECAST
// async function getWeather(query) {
//     weather = await fetch(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&appid=d527e56ccdc4853efdf6570164c6eeab`).then(r => r.json())

//     console.log(weather)
//     console.log(weather.list.filter(test => test.dt_txt.endsWith('12:00:00')))
// }