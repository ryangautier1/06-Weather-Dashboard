var apiKey = "&appid=adb745e5a94210b177a3d627e6b9f105";

var cityName;
var searchHistory = [];

var lat;
var lon;

// Get search history and print it to buttons
searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
// skip this step if there is no search history
if (searchHistory) {
    for (var i = 0; i < searchHistory.length; i++) {
        var newBtn = $("<button>");
        newBtn.text(searchHistory[i]);
        newBtn.addClass("btn btn-lg btn-block search-history-btn")
        $("#search-history").append(newBtn);
    }
}

// clear all text
function clearContents() {
    $("#current-city").text("");
    $("#current-sky-icon").attr("src", "");
    $("#current-temp").text("");
    $("#current-humidity").text("");
    $("#current-wind").text("");
    $("#current-uv").text("");
    $("#current-uv-value").removeClass();
    $("#current-uv-value").text("");
    $("city-5-day").addClass("hidden");
    $(".forecast-date").text("");
    $(".forecast-temp").text("");
    $(".forecast-icon").attr("src", "");
    $(".forecast-humidity").text("");
}

// get UV class based on UV index
function getUvClass(a) {
    a = parseInt(a);
    if (a < 3) {
        return "very-low-uv";
    }
    else if (a < 5) {
        return "low-uv";
    }
    else if (a < 7) {
        return "moderate-uv";
    }
    else if (a < 10) {
        return "high-uv";
    }
    else {
        return "very-high-uv";
    }
}

// get weather condition code for icon from https://openweathermap.org/weather-conditions
function getSkyIcon(b) {
    var a = b.toString();
    if (a[0] == "2") {
        return "11d";
    }
    else if (a[0] == "3") {
        return "09d";
    }
    else if (a[0] == 5 && a[1] == 0) {
        return "10d";
    }
    else if (a == 511 || a[0] == 6) {
        return "13d";
    }
    else if (a[0] == 5 && a[1] == 2) {
        return "09d";
    }
    else if (a == 531) {
        return "09d";
    }
    else if (a[0] == 7) {
        return "50d";
    }
    else if (a == 800) {
        return "01d";
    }
    else if (a == 801) {
        return "02d";
    }
    else if (a == 802) {
        return "03d";
    }
    else if (a == 803 || a == 804) {
        return "04d";
    }
}

$("#search-btn").on("click", function (event) {
    event.preventDefault;
    clearContents();
    cityName = $("#city-input").val();

    // store cityName in search history if it's not already there
    if (!searchHistory) {
        searchHistory = [cityName];
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
        // prepend new search hitory button to screen
        var newBtn = $("<button>");
        newBtn.text(searchHistory[0]);
        newBtn.addClass("btn btn-primary btn-lg btn-block search-history-btn")
        $("#search-history").prepend(newBtn);
    }
    else if (!searchHistory.includes(cityName)) {
        searchHistory.unshift(cityName);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
        // prepend new search hitory button to screen
        var newBtn = $("<button>");
        newBtn.text(searchHistory[0]);
        newBtn.addClass("btn btn-lg btn-block search-history-btn")
        $("#search-history").prepend(newBtn);
    }
    runSearch();
});

$(".search-history-btn").on("click", function (event) {
    event.preventDefault;
    clearContents();
    cityName = $(this).text();
    runSearch();
});

function runSearch(){

    // query url for current weather
    var currentQueryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + apiKey;

    //query url for 5 day forecast
    var forecastQueryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + apiKey;

    // call for current weather
    $.ajax({
        url: currentQueryUrl,
        method: "GET"
    }).then(function (response) {

        // get current sky id
        var currentSky = response.weather[0].id;
        var iconCode = getSkyIcon(currentSky);
        $("#current-sky-icon").attr("src", "http://openweathermap.org/img/wn/" + iconCode + "@2x.png");

        // get current date
        var currentDate = moment().format('l');
        // add current date to heading of current city stats
        $("#current-city").append(currentDate);

        // get current temp
        var currentTemp = response.main.temp;
        // Convert from kelvin to farenheit
        currentTemp = (currentTemp - 273.15) * (9 / 5) + 32;
        currentTemp = Math.round(currentTemp);
        $("#current-temp").append("Temperature: " + currentTemp + " °F");

        // get current humidity
        var currentHumidity = response.main.humidity;
        $("#current-humidity").append("Humidity: " + currentHumidity + "%");

        // get current wind speed
        var currentWind = response.wind.speed;
        $("#current-wind").append("Wind Speed: " + currentWind + " MPH");

        // get coordinates
        lat = response.coord.lat;
        lon = response.coord.lon;

        // call for UV index
        uvQueryUrl = "https://api.openweathermap.org/data/2.5/uvi?appid=adb745e5a94210b177a3d627e6b9f105&lat=" + lat + "&lon=" + lon;
        $.ajax({
            url: uvQueryUrl,
            method: "GET"
        }).then(function (response) {
            var uvValue = response.value;
            var uvClass = getUvClass(uvValue);
            $("#current-uv-value").addClass(uvClass);
            $("#current-uv").append("UV Index: ");
            $("#current-uv-value").append(uvValue);
        });
    });

    // call for forecast
    $.ajax({
        url: forecastQueryUrl,
        method: "GET"
    }).then(function (response) {
        // Add city name to heading of current city stats
        cityName = response.city.name;
        $("#current-city").prepend(cityName + " ");

        // initialize arrays
        var sky = new Array();
        var temp = new Array();
        var humidity = new Array();
        var date = new Array();

        $("#city-5-day").removeClass("hidden");
        $("#city-5-day").addClass("inline-block");

        for (var i = 0; i < 5; i++) {
            var currentClass = "#" + (i + 1);
            

            // get sky data for each day
            // (8*i + 4) will return the data from each day at noon
            sky[i] = response.list[(8 * i) + 4].weather[0].id;
            sky[i] = getSkyIcon(sky[i]);
            $(currentClass).children(".forecast-icon").attr("src", "http://openweathermap.org/img/wn/" + sky[i] + "@2x.png");

            // get temp data for each day
            temp[i] = response.list[8 * i + 4].main.temp;
            // Convert from kelvin to farenheit
            temp[i] = (temp[i] - 273.15) * (9 / 5) + 32;
            temp[i] = Math.round(temp[i]);
            $(currentClass).children(".forecast-temp").append("Temp: " + temp[i] + " °F");

            // get humidity data for each day
            humidity[i] = response.list[8 * i + 4].main.humidity;
            $(currentClass).children(".forecast-humidity").append("Humidity: " + humidity[i] + "%");


            // get date data for each day
            date[i] = response.list[8 * i + 4].dt_txt;
            date[i] = date[i][5] + date[i][6] + "/" + date[i][8] + date[i][9] + "/" + date[i][0] + date[i][1] + date[i][2] + date[i][3];
            $(currentClass).children(".forecast-date").append(date[i]);
        }
    });
}