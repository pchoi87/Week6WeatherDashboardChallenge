function fetchWeatherData(cityName) {
    const apiKey = '';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            return response.json();
        })
        .then(data => {
            displayWeatherData(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function displayWeatherData(data) {
    const currentWeather = data.list[0];
    const cityName = data.city.name;
    const temperature = currentWeather.main.temp;
    const humidity = currentWeather.main.humidity;
    const windSpeed = currentWeather.wind.speed;

    document.getElementById('city-name').textContent = cityName;
    document.getElementById('temperature').textContent = temperature;
    document.getElementById('humidity').textContent = humidity;
    document.getElementById('wind-speed').textContent = windSpeed;

    const forecastList = data.list.slice(1, 6);
    const forecastContainer = document.getElementById('forecast-info');

    forecastContainer.innerHTML = '';

    forecastList.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const temperature = forecast.main.temp;
        const humidity = forecast.main.humidity;
        const windSpeed = forecast.wind.speed;

        const forecastCard = document.createElement('div');
        forecastCard.classList.add('forecast-card');

        forecastCard.innerHTML = `
            <h3>${date.toDateString()}</h3>
            <p>Temperature: ${temperature}</p>
            <p>Humidity: ${humidity}</p>
            <p>Wind Speed: ${windSpeed}</p>
        `;

        forecastContainer.appendChild(forecastCard);
    });
}

document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const cityName = document.getElementById('city-input').value;
    fetchWeatherData(cityName);
});
