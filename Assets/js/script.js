$(document).ready(function () {

    let cities = [];
    let todayContainer = $('#today');
    let forecastContainer = $('#forecast');
    let currentDate = moment().format('DD/MM/YYYY');

   
    // function checkCitiesSaved() {
    //     // потрібна провірка чи не пусте сховище
    // }
    $('#search-button').on('click', function (event) {
        event.preventDefault();
        setLocalStorage();
        });
        
function setLocalStorage() {
    
    if ($('#search-input').val().trim() !== "") {
        cities.unshift($('#search-input').val().trim());
        localStorage.setItem('cities', JSON.stringify(cities));
        $('#history-list').empty();
        setCityList();
}
};


function setCityList() {
    
    cities = JSON.parse(localStorage.getItem('cities'));
    // if (cities === []) {
    //     return;
    // }
    for (let i = 0; i < cities.length; i++) {
        let li = $('<li>');
        let bu = $('<button>').text(cities[i]);
        li.append(bu);
        $('#history-list').append(li);
    };
};



//  Function to get weather info about current request
function getCurrentWeather() {
    
    let ApiKey = '56a78a793108c0e303b74692464ee285';
    let Limit = 1;
    let GeocoderApiURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cities[0] + "&limit=1&appid=" + ApiKey;
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
            console.log(response);

            let iconIndex = response.list[0].weather[0].icon;
            let iconURL = 'http://openweathermap.org/img/w/' + iconIndex + ".png";
            let weaterIcon = $('<img>').attr("src", iconURL);
            let todayName = $('<h3>').text(response.city.name + ' ' + currentDate);
            todayName.append(weaterIcon);
            todayContainer.append(todayName);
            let temp = $('<p>').text('Temp: ' + Math.round(response.list[0].main.temp) + '°C');
            todayContainer.append(temp);
            let wind = $('<p>').text('Wind: ' + response.list[0].wind.speed + ' KPH');
            todayContainer.append(wind);
            let humidity = $('<p>').text('Humidity: ' + response.list[0].main.humidity + '%');
            todayContainer.append(humidity);
        }); 
    });
};


function getForecast() {

    for (let i = 1; i < cities.length; i++) {
            
        let ApiKey = '56a78a793108c0e303b74692464ee285';
        let Limit = 1;
        let GeocoderApiURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cities[i] + "&limit=1&appid=" + ApiKey;
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
                console.log(response);
                // for (let i = 0; i < 5; i*8) {
        
//                  let iconIndex = response.list[0].weather[0].icon;
//     let iconURL = 'http://openweathermap.org/img/w/' + iconIndex + ".png";
    
//     let weaterIcon = $('<img>').attr("src", iconURL);
//     
//     let todayName = $('<h3>').text(response.city.name + ' ' + currentDate + ' ' + weaterIcon);
   
//     let singleDayCard = $('<div>').addClass('card col-2 bg-primary');

//     todayContainer.append(todayName);
// }


                // let iconIndex = response.list[0].weather[0].icon;
                // let iconURL = 'http://openweathermap.org/img/w/' + iconIndex + ".png";
                // let weaterIcon = $('<img>').attr("src", iconURL);
                // let todayName = $('<h3>').text(response.city.name + ' ' + currentDate);
                // todayName.append(weaterIcon);
                // todayContainer.append(todayName);
                // let temp = $('<p>').text('Temp: ' + Math.round(response.list[0].main.temp) + '°C');
                // todayContainer.append(temp);
                // let wind = $('<p>').text('Wind: ' + response.list[0].wind.speed + ' KPH');
                // todayContainer.append(wind);
                // let humidity = $('<p>').text('Humidity: ' + response.list[0].main.humidity + '%');
                // todayContainer.append(humidity);
            }); 

        });
    };
};


setCityList(); /* проблема з пустим значенням cities */
getCurrentWeather();
getForecast();
});







