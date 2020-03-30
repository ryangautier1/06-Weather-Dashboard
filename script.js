var apiKey = "&appid=adb745e5a94210b177a3d627e6b9f105";

var cityName;



$("#search-btn").on("click", function (event) {
    event.preventDefault;
    cityName = $("#city-input").val();
    // query url for current weather
    var currentQueryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + apiKey;

    //query url for 5 day forecast
    var forecastQueryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + apiKey;

    // call for current weather
    $.ajax({
        url: currentQueryUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        cityName = response.city.name;
        var day1data = response.list[4];
        var day2data = response.list[12];
        var day1data = response.list[20];
        var day1data = response.list[28];
        var day1data = response.list[36];

    });

    // call for forecast
    $.ajax({
        url: forecastQueryUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        cityName = response.city.name;

    });

    
});