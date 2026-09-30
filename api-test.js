const claveApi = '421f8a09d4aa4e8ab9645323262109';
const idioma = 'es';

const input_city = document.getElementById('input-ciudad');

async function obtenerClima() {

    const city = input_city.value;

    if (!city) {
        alert('Por favor, ingresa una ciudad');
        return;
    }

    const apiClimaActual =
        `https://api.weatherapi.com/v1/current.json?key=${claveApi}&q=${city}&lang=${idioma}&aqi=no`;

    try {

        const response = await fetch(apiClimaActual);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();

        mostrarClima(data);

    } catch (error) {

        console.error('Ocurrió un error:', error);
        alert('No se pudo obtener el clima');

    }
}

function mostrarClima(data) {

    document.querySelector('.clima-icon').src =
        'https:' + data.current.condition.icon;

    document.querySelector('.texto').innerHTML =
        data.current.condition.text;

    document.querySelector('.temp').innerHTML =
        data.current.temp_c + '°C';

    document.querySelector('.ciudad').innerHTML =
        data.location.name;

    document.querySelector('.humedad').innerHTML =
        data.current.humidity + '%';

    document.querySelector('.viento').innerHTML =
        data.current.wind_kph + ' km/h';
}