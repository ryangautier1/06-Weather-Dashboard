# 06-Weather-Dashboard

This application uses the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities. The user may type a city located in the United States, and the weather for the day of the search, and a five day forecast, are displayed. `localStorage` is used to store search history data, and the search history is displayed beneath the search bar. The user may click on a search history item to search that city again.

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

## Screenshot

![weather dashboard demo](https://github.com/ryangautier1/06-Weather-Dashboard/blob/master/Screenshot.PNG?raw=true)
