//API SECTION
function ipApi() {
    let inputValue = document.querySelector('.input-ip');
    let ipValue = inputValue.value
    let ip = String(ipValue);
    const API_URL = `https://geo.ipify.org/api/v1?apiKey=at_xYKGt7mjKlD7VD0sAMOKUA3Cw5Jo6&ipAddress=${ip}&domain=${ip}`;
    //DOM classes
    const ipAddress = document.querySelector('.ip-address');
    const location = document.querySelector('.location-ip');
    const timezone = document.querySelector('.time-zone');
    const isp = document.querySelector('.isp-ip');
    //Fetch API
    fetch(API_URL)
        .then(function (res) {
            const processingRes = res.json();
            return processingRes;
        })
        .then(function (jsonRes) {
            ipAddress.innerText = jsonRes.ip;
            location.innerText = `${jsonRes.location.city}, 
            ${jsonRes.location.region}, ${jsonRes.location.postalCode}`;
            timezone.innerText = `UTC: ${jsonRes.location.timezone}`;
            isp.innerText = jsonRes.isp
            longitude = jsonRes.location.lng;
            latitude = jsonRes.location.lat;
            initMap();
        })
};
//MAP SECTION
let map;
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: latitude, lng: longitude },
        zoom: 12,
        disableDefaultUI: true,
    });
    const image = './images/icon-location.svg'
    new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map,
        icon: image
    });

};
//MAP variables for locations.
var longitude;
var latitude;
//EVENT for submit
let submit = document.querySelector('.submit-btn');
submit.addEventListener('click', function () {
    ipApi();
    initMap();
});

// INITIAL STATE
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(ipApi);
    } else {
        console.log('error');
    }
};
//Asks user on page load for location permission.
window.onload = getLocation();



