document.addEventListener('DOMContentLoaded', async () => {
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
    const apiUrl = 'https://api.openweathermap.org/data/2.5/onecall';
    const locationElement = document.getElementById('location');
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('description');
    const humidityElement = document.getElementById('humidity');
    const windSpeedElement = document.getElementById('wind-speed');

    try {
        // Get user's location
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;

        // Fetch weather data
        const response = await fetch(`${apiUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        locationElement.textContent = data.timezone;
        temperatureElement.textContent = `Temperature: ${data.current.temp}°C`;
        descriptionElement.textContent = `Description: ${data.current.weather[0].description}`;
        humidityElement.textContent = `Humidity: ${data.current.humidity}%`;
        windSpeedElement.textContent = `Wind Speed: ${data.current.wind_speed} m/s`;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
});
