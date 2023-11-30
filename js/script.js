
// locations coordinates
const locations = {
    'Mexico City, Mexico': { lat: 19.4326, lon: -99.1332 },
    'Paris, France': { lat: 48.8534, lon: 2.3486 },
    'Positano, Italy': { lat: 40.6281, lon: 14.4842 },
    'San Juan, Puerto Rico': { lat: 18.4655, lon: -66.1057 },
    'Current Location': null, // Placeholder for current location
};

// event listener
document.getElementById('locations').addEventListener('change', function () {
    const selectedOption = this.options[this.selectedIndex];
    const { lat, lon } = locations[selectedOption.value];
    getLocation(lat, lon);
});

// results display
function setResults(elementId, text, color) {
    const element = document.getElementById(elementId);
    element.innerText = text;
    element.style.color = color;
}

// function to get current location 
function updateCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
        function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            // Update the 'Current Location' option directly
            locations['Current Location'] = { lat: latitude, lon: longitude };
            const locationsDropdown = document.getElementById('locations');
            locationsDropdown.options[locationsDropdown.options.length - 1].value = 'Current Location';
            locationsDropdown.options[locationsDropdown.options.length - 1].text = 'Current Location';
            locationsDropdown.dispatchEvent(new Event('change'));
        },
        function (error) {
            console.error('Error', error.message);
        }
    );
}

// call
updateCurrentLocation();

// getting from API
function getLocation(lat, lon) {
    if (!lat || !lon) {
        console.error('Invalid coordinates');
        return;
    }

    const todayUrl = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&date=today`;
    const tomorrowUrl = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&date=tomorrow`;

    fetch(todayUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network error ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Today API Response:', data);
            setResults('todaySunrise', data.results.sunrise, 'grey');
            setResults('todaySunset', data.results.sunset, 'grey');
            setResults('todayDusk', data.results.civil_twilight_end, 'grey');
            setResults('todayDawn', data.results.civil_twilight_begin, 'grey');
            setResults('todayDayLength', data.results.day_length, 'grey');
            setResults('todaySolarNoon', data.results.solar_noon, 'grey');
            setResults('todayTimeZone', "UTC", 'grey');
        })
        .catch(error => {
            console.error('Error fetching today\'s data:', error);
        });

    fetch(tomorrowUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network error ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Tomorrow API Response:', data);
            // Add the following lines for tomorrow's sun times
            setResults('tomorrowSunrise', data.results.sunrise, 'grey');
            setResults('tomorrowSunset', data.results.sunset, 'grey');
            setResults('tomorrowDusk', data.results.civil_twilight_end, 'grey');
            setResults('tomorrowDawn', data.results.civil_twilight_begin, 'grey');
            setResults('tomorrowDayLength', data.results.day_length, 'grey');
            setResults('tomorrowSolarNoon', data.results.solar_noon, 'grey');
            setResults('tomorrowTimeZone', "UTC", 'grey');
        })
        .catch(error => {
            console.error('Error fetching tomorrow\'s data:', error);
        });
}

// calling Mexico City
getLocation(19.4326, -99.1332);
