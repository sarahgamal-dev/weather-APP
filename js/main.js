const apiKey = "fae49cfd87414844a22160849251207";
// html
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {
    const city = searchInput.value.trim();
    if (city !== "") {
        getWeather(city);
    }
});





async function getWeather(city) {
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=no&alerts=no`
        );
        const data = await response.json();

        // today
        document.getElementById("today-city").innerText = data.location.name;
        document.getElementById("today-degree").innerHTML = `${data.current.temp_c}&deg;C`;
        document.getElementById("today-condition").innerText = data.current.condition.text;
        document.getElementById("today-icon").src = `https:${data.current.condition.icon}`;
        document.getElementById("today-wind-dir").innerText = data.current.wind_dir;
        document.getElementById("today-wind").innerText = `${data.current.wind_kph} km/h`;
        document.getElementById("today-rain").innerText = `${data.forecast.forecastday[0].day.daily_chance_of_rain}%`;

        const todayDate = new Date(data.forecast.forecastday[0].date);
        document.getElementById("today-day").innerText = todayDate.toLocaleDateString("en-US", { weekday: "long" });
        document.getElementById("today-date").innerText = todayDate.toLocaleDateString("en-US", { day: "numeric", month: "short" });

        // tomorrow
        const tomorrow = data.forecast.forecastday[1];
        document.getElementById("tomorrow-day").innerText = new Date(tomorrow.date).toLocaleDateString("en-US", { weekday: "long" });
        document.getElementById("tomorrow-degree").innerHTML = `${tomorrow.day.maxtemp_c}&deg;C`;
        document.getElementById("tomorrow-min").innerHTML = `${tomorrow.day.mintemp_c}&deg;C`;
        document.getElementById("tomorrow-condition").innerText = tomorrow.day.condition.text;
        document.getElementById("tomorrow-icon").src = `https:${tomorrow.day.condition.icon}`;


        // after
        const after = data.forecast.forecastday[2];
        document.getElementById("after-day").innerText = new Date(after.date).toLocaleDateString("en-US", { weekday: "long" });
        document.getElementById("after-degree").innerHTML = `${after.day.maxtemp_c}&deg;C`;
        document.getElementById("after-min").innerHTML = `${after.day.mintemp_c}&deg;C`;
        document.getElementById("after-condition").innerText = after.day.condition.text;
        document.getElementById("after-icon").src = `https:${after.day.condition.icon}`;

    } catch (error) {
        console.error("Error fetching weather:", error);
        alert("check your internet");
    }
}



// Show Cairo weather by default on page load
getWeather("Cairo");