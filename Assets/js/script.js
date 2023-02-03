// ApiKey = 56a78a793108c0e303b74692464ee285;
$(document).ready(function () {
    var Limit = 1;
    var CityName = $('#search-input').val();
    var GeocoderApiURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + CityName + "&limit=" + Limit + "&appid=56a78a793108c0e303b74692464ee285";
$.ajax({
    url: GeocoderApiURL,
    method: 'GET'
}).then(function (response) {
    console.log(response);
})

// $("button").on("click", function() {
//     // var person = $(this).attr("data-person");
//     var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat="{lat}"&lon="{lon}"&appid=56a78a793108c0e303b74692464ee285";
//     $.ajax({

//     })
// });






});