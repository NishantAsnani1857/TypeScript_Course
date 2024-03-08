console.log("This is from typescript");

import * as L from 'leaflet';
const form = document.querySelector('form')!
const map = L.map('map').setView([51.505, -0.09], 13);
const input = <HTMLInputElement>document.getElementById('address')!


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


var marker = L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();


function updateMap(lat: any, long: any) {
    map.setView([lat, long], map.getZoom());
    marker.setLatLng([lat, long]);
}

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const [city, countryCode] = input.value.split(',')
    console.log(countryCode);
    const api = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${countryCode}&limit=5&appid=623e06613cb158b93fd820439476c384`
    try {
        const response = await fetch(api)
            .then((data) => data.json())
            .then((response) => {
                console.log(response[0]);
                const lat = response[0].lat
                const lng = response[0].lon
                updateMap(lat, lng)
            })
    }
    catch (err) {
        console.log("Oh no error ", err);
    }
})


