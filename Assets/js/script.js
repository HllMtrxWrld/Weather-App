let ApiKey = '56a78a793108c0e303b74692464ee285';
let city = '';
let todayContainer = $('#today');
let forecastContainer = $('#forecast');
let currentDate = moment().format('DD/MM/YYYY');



// Function to get current weather

function getCurrentDay(city) {
    let GeocoderApiURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + ApiKey;
    $.ajax({
        url: GeocoderApiURL,
        method: 'GET'
}).then(function (response) {
    let lat = response[0].lat;
    let lon = response[0].lon;
    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + ApiKey + "&units=metric";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        let iconIndex = response.list[0].weather[0].icon;
        let iconURL = 'https://openweathermap.org/img/w/' + iconIndex + ".png";
        let weaterIcon = $('<img>').attr("src", iconURL);
        let todayName = $('<h3>').text(response.city.name + ' ' + currentDate).addClass('todayEl');
        todayName.append(weaterIcon);
        todayContainer.append(todayName);
        let temp = $('<p>').text('Temp: ' + Math.round(response.list[0].main.temp) + '°C').addClass('todayEl');
        todayContainer.append(temp);
        let wind = $('<p>').text('Wind: ' + response.list[0].wind.speed + ' KPH').addClass('todayEl');
        todayContainer.append(wind);
        let humidity = $('<p>').text('Humidity: ' + response.list[0].main.humidity + '%').addClass('todayEl');
        todayContainer.append(humidity);
        $('#today').addClass('today')

    }); 
});
};





//  Function to get 5 day weather forecast

function getForecast(city) {
    let GeocoderApiURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + ApiKey;
    $.ajax({
        url: GeocoderApiURL,
        method: 'GET'
}).then(function (response) {
    let lat = response[0].lat;
    let lon = response[0].lon;
    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + ApiKey + "&units=metric";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        for (let i = 0; i < 40; i+=8) {
        let iconIndex = response.list[i].weather[0].icon;
        let iconURL = 'https://openweathermap.org/img/w/' + iconIndex + ".png";
        let weatherIcon = $('<img>').attr("src", iconURL);
        let day = $('<h3>').text(response.list[i].dt_txt.split(' ', 1)).addClass('todayEl');
        let cardContainer = $('<div>').addClass('cardContainer');
        cardContainer.append(day);
        cardContainer.append(weatherIcon);
        forecastContainer.append(cardContainer);
        let temp = $('<p>').text('Temp: ' + Math.round(response.list[0].main.temp) + '°C').addClass('todayEl');
        cardContainer.append(temp);
        let wind = $('<p>').text('Wind: ' + response.list[0].wind.speed + ' KPH').addClass('todayEl');
        cardContainer.append(wind);
        let humidity = $('<p>').text('Humidity: ' + response.list[0].main.humidity + '%').addClass('todayEl');
        cardContainer.append(humidity);
        }
    }); 
});
};


// Function to save searching history
function setLocalStorage() {
    let cities = JSON.parse(localStorage.getItem('cities'));
    if (cities === null) {
        let cities = [];
        cities.push($('#search-input').val().trim());
        localStorage.setItem('cities', JSON.stringify(cities));
        let bu = $('<button>').text($('#search-input').val().trim()).addClass('history_button');
        $('#history').append(bu);
    } else if (cities.includes($('#search-input').val().trim())) {
        
    } else {
        cities.push($('#search-input').val().trim());
        localStorage.setItem('cities', JSON.stringify(cities));
        let bu = $('<button>').text($('#search-input').val().trim()).addClass('history_button');
        $('#history').append(bu);
    };
};


// Function to clear containers
function cleanWeather() {
    $('#today').empty();
    $('#forecast').empty();
}

// Start function
 function startPage() {
    cleanWeather();
    let cities = JSON.parse(localStorage.getItem('cities'));
    if (cities !== null) {
        for (let i = 0; i < cities.length; i++) {
            
            let bu = $('<button>').text(cities[i]).addClass('history_button');
            $('#history').append(bu);
            
 }};
 };


//  Event listners for search button and history buttons
 $(document).ready( function(){
    startPage();
$('#search-button').on('click', function (event) {
    event.preventDefault();
    cleanWeather();
    getCurrentDay($('#search-input').val());
    getForecast($('#search-input').val());
    setLocalStorage();
    $('#search-input').val('');
});
$('#history').on('click', 'button', function (event) {
    event.preventDefault();
    city = event.target.innerText.trim();
    cleanWeather();
    getCurrentDay(city);
    getForecast(city);
    $('#search-input').val('');
})
    
 });