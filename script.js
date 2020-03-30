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
      

    });

    // call for forecast
    $.ajax({
        url: forecastQueryUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        cityName = response.city.name;

          // get sky data for each day
          var day1sky = response.list[4].weather[0].main;
          var day2sky = response.list[12].weather[0].main;
          var day3sky = response.list[20].weather[0].main;
          var day4sky = response.list[28].weather[0].main;
          var day5sky = response.list[36].weather[0].main;
          console.log(day1sky);
  
          // get temp data for each day
          var day1temp = response.list[4].main.temp;
          var day2temp = response.list[12].main.temp;
          var day3temp = response.list[20].main.temp;
          var day4temp = response.list[28].main.temp;
          var day5temp = response.list[36].main.temp;
          console.log(day1temp);
  
          // get humidity data for each day
          var day1humidity = response.list[4].main.humidity;
          var day2humidity = response.list[12].main.humidity;
          var day3humidity = response.list[20].main.humidity;
          var day4humidity = response.list[28].main.humidity;
          var day5humidity = response.list[36].main.humidity;
          console.log(day1humidity);
  
          // // get date data for each day
          
    });

    
});