let valueSearch = document.getElementById('valueSearch');
let city = document.getElementById('place__name');
let temperature = document.getElementById('place__temperature');
let description = document.querySelector('.weather__description')

let clouds = document.getElementById('clouds');
let humidity = document.getElementById('humidity');
let pressure = document.getElementById('pressure')
let main = document.querySelector('main');

let form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    searchWeather();
})

let id = '7aeff5bb26683828cd32952fa3872533';
let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + id;
let searchWeather = () => {
    fetch(url + '&q=' + valueSearch.value).then(response => response.json()
        .then(data => {
            console.log(data);
            if (data.cod === 200) {
                city.querySelector('figcaption').innerText = data.name;
                city.querySelector('img').src = 'https://flagsapi.com/' + data.sys.country + '/shiny/32.png';


                temperature.querySelector('img').src = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@4x.png';

                temperature.querySelector('figcaption span').innerText = data.main.temp;

                description.innerText = data.weather[0].description;

                clouds.innerText = data.clouds.all;
                humidity.innerText = data.main.humidity;
                pressure.innerText = data.main.pressure;

            } else {
                main.classList.add('error');
                setTimeout(() => {
                    main.classList.remove('error')
                }, 500)
            }
        }))
}

const initApp = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // Now, use lat and lon to get the city name
            getCityName(lat, lon);
        }, error => {
            console.error("Geolocation error:", error);
            // Fallback to a default city
            valueSearch.value = 'Bahawalpur';
            searchWeather();
        });
    } else {
        console.error("Geolocation is not supported by this browser.");
        // Fallback to a default city
        valueSearch.value = 'Bahawalpur';
        searchWeather();
    }
}
const getCityName = async (lat, lon) => {
    const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${id}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data && data.length > 0) {
            const cityName = data[0].name.split(' ')[0];
            valueSearch.value = cityName;
            searchWeather();
        } else {
            console.error("City not found.");
            valueSearch.value = 'Bahawalpur'; // Fallback
            searchWeather();
        }
    } catch (error) {
        console.error("Error fetching city name:", error);
        valueSearch.value = 'Bahawalpur'; // Fallback
        searchWeather();
    }
};
initApp();