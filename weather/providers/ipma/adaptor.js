const { parseISO } = require('date-fns');

function getRainProbability(arr, index) {
    if (arr[index].probabilidadePrecipita !== '-99.0') {
        return Number.parseFloat(arr[index].probabilidadePrecipita);
    }

    for(let i = index; i < arr.length; ++i) {
        if (arr[i].probabilidadePrecipita !== '-99.0') {
            return Number.parseFloat(arr[i].probabilidadePrecipita);
        }
    }
}

module.exports = {
    locations: new Map([
        ['porto', { id: 1131200, acronym: 'PTR' }]
    ]),

    convertInformation: (forecastData, weatherTypes) => {
        return forecastData.map((forecast, index, arr) => ({
            temperature: Number.parseFloat(forecast.tMed),
            date: parseISO(forecast.dataPrev),
            wind: {
                direction: forecast.ddVento.toLowerCase(),
                speed: Number.parseFloat(forecast.ffVento)
            },
            rain: {
                probability: getRainProbability(arr, index)
            },
            description: weatherTypes.get(forecast.idPeriodo)
        }));
    }
}
