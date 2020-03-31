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

        // get current sky id
        var currentSky = response.weather[0].id;
        
        // get current date
        var currentDate = moment().format('l');
        
        // get current temp
        var currentTemp = response.main.temp;
        // Convert from kelvin to farenheit
        currentTemp = (currentTemp - 273.15) * (9 / 5) + 32 + " °F";


    });

    // call for forecast
    $.ajax({
        url: forecastQueryUrl,
        method: "GET"
    }).then(function (response) {
        cityName = response.city.name;

        // initialize arrays
        var sky = new Array();
        var temp = new Array();
        var humidity = new Array();
        var date = new Array();

        // console.log(response);

        for (var i = 0; i < 4; i++) {

            // get sky data for each day
            // (8*i + 4) will return the data from each day at noon
            sky[i] = response.list[(8 * i) + 4].weather[0].id;

            // get temp data for each day
            temp[i] = response.list[8 * i + 4].main.temp;
            // Convert from kelvin to farenheit
            temp[i] = (temp[i] - 273.15) * (9 / 5) + 32 + " °F";

            // get humidity data for each day
            humidity[i] = response.list[8 * i + 4].main.humidity;

            // get date data for each day
            date[i] = response.list[8 * i + 4].dt_txt;
            date[i] = date[i][5] + date[i][6] + "/" + date[i][8] + date[i][9] + "/" + date[i][0] + date[i][1] + date[i][2] + date[i][3];
        }
    });


});


// // get sky data for each day
// var day1sky = response.list[4].weather[0].main;
// var day2sky = response.list[12].weather[0].main;
// var day3sky = response.list[20].weather[0].main;
// var day4sky = response.list[28].weather[0].main;
// var day5sky = response.list[36].weather[0].main;

// // get temp data for each day
// var day1temp = response.list[4].main.temp;
// var day2temp = response.list[12].main.temp;
// var day3temp = response.list[20].main.temp;
// var day4temp = response.list[28].main.temp;
// var day5temp = response.list[36].main.temp;

// // get humidity data for each day
// var day1humidity = response.list[4].main.humidity;
// var day2humidity = response.list[12].main.humidity;
// var day3humidity = response.list[20].main.humidity;
// var day4humidity = response.list[28].main.humidity;
// var day5humidity = response.list[36].main.humidity;

// // get date data for each day
// var day1date = response.list[4].dt_txt;
// day1date = day1date[5] + day1date[6] + "/" + day1date[8] + day1date[9] + "/" + day1date[0] + day1date[1] + day1date[2] + day1date[3];

// var day1date = response.list[4].dt_txt;
// day1date = day1date[5] + day1date[6] + "/" + day1date[8] + day1date[9] + "/" + day1date[0] + day1date[1] + day1date[2] + day1date[3];

// var day1date = response.list[4].dt_txt;
// day1date = day1date[5] + day1date[6] + "/" + day1date[8] + day1date[9] + "/" + day1date[0] + day1date[1] + day1date[2] + day1date[3];

// var day1date = response.list[4].dt_txt;
// day1date = day1date[5] + day1date[6] + "/" + day1date[8] + day1date[9] + "/" + day1date[0] + day1date[1] + day1date[2] + day1date[3];

// var day1date = response.list[4].dt_txt;
// day1date = day1date[5] + day1date[6] + "/" + day1date[8] + day1date[9] + "/" + day1date[0] + day1date[1] + day1date[2] + day1date[3];

// console.log(day1date);