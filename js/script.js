//locations cordinates
const locations = {
    'Mexico City, Mexico': { lat: 19.4326, lon: -99.1332 },
    'Paris, France': { lat: 48.8534, lon: 2.3486 },
    'Positano, Italy': { lat: 40.6281, lon: 14.4842 },
    'San Juan, Puerto Rico': { lat: 18.4655, lon: -66.1057 },
    'Chicago': { lat: 41.8781, lon: -87.6298 }
};

//event listener
document.getElementById('locations').addEventListener('change', function () {
    const selectedOption = this.options[this.selectedIndex];
    const { lat, lon } = locations[selectedOption.value];
    getLocation(lat, lon);
});
//results display
function setResults(elementId, text, color) {
    const element = document.getElementById(elementId);
    element.innerText = text;
    element.style.color = color;
}


//getting from pi
function getLocation(lat, lon) {
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
            setResults('todaySunrise', `${data.results.sunrise}`, 'grey');
            setResults('todaySunset', `${data.results.sunset}`, 'grey');
            setResults('todayDusk', ` ${data.results.civil_twilight_end}`, 'grey');
            setResults('todayDawn', `${data.results.civil_twilight_begin}`, 'grey');
        })
        .catch(error => {
            console.error('Error fetching today data:', error);
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
            setResults('tomorrowSunrise', `${data.results.sunrise}`, 'grey');
            setResults('tomorrowSunset', `${data.results.sunset}`, 'grey');
            setResults('tomorrowDusk', `${data.results.civil_twilight_end}`, 'grey');
            setResults('tomorrowDawn', `${data.results.civil_twilight_begin}`, 'grey');
        })
        .catch(error => {
            console.error('Error fetching tomorrow data:', error);
        });
}
//call
getLocation(locations['Mexico City, Mexico'].lat, locations['Mexico City, Mexico'].lon);