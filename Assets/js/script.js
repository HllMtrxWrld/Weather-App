$(document).ready(function () {
    let cities = [];
    let todayContainer = $('#today');
    let forecastContainer = $('#forecast');
    let now = new Date();

    setCityList();
    ApiReques();
    // function checkCitiesSaved() {
    //     // потрібна провірка чи не пусте сховище
    // }
    $('#search-button').on('click', function (event) {
        event.preventDefault();
        setLocalStorage();
        });
        
function setLocalStorage() {
    
    if ($('#search-input').val().trim() !== "") {
        cities.push($('#search-input').val().trim());
        localStorage.setItem('cities', JSON.stringify(cities));
        $('#history-list').empty();
        setCityList();
}
};


function setCityList() {
    
    cities = JSON.parse(localStorage.getItem('cities'));
    
    for (let i = 0; i < cities.length; i++) {
        let li = $('<li>');
        let bu = $('<button>').text(cities[i]);
        li.append(bu);
        $('#history-list').append(li);
    };
};




function ApiReques() {
    for (let i = 0; i < cities.length; i++) {
        
        
    

    let ApiKey = '56a78a793108c0e303b74692464ee285';
    let Limit = 1;
//     let CityName = localStorage.getItem('Cities'); /*there is problem here*/
    let GeocoderApiURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cities[i] + "&limit=1&appid=" + ApiKey;
$.ajax({
    url: GeocoderApiURL,
    method: 'GET'
}).then(function (response) {
    console.log(response);
    let lat = response[0].lat;
    let lon = response[0].lon;
    console.log(lat, lon);


   let queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" +ApiKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        console.log(response.city.name);
        let todayName = $('<p>').text(response.city.name + now);
        todayContainer.append(todayName);
    });
});
};
};
});