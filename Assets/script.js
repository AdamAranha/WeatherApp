var weatherWeek
var weatherToday
var uvToday
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


}
// Updates the current session cityList with localStorage.cityList
function updateCurrentList() {
    let cloudList = JSON.parse(localStorage.cityList)
    cityList = cloudList
}

updateCurrentList()


// THIS IS FOR THE 5 DAY FORECAST
// async function getWeather(query) {
//     weather = await fetch(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&appid=d527e56ccdc4853efdf6570164c6eeab`).then(r => r.json())

//     console.log(weather)
//     console.log(weather.list.filter(test => test.dt_txt.endsWith('12:00:00')))
// }