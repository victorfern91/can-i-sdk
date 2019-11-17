const { isToday, isTomorrow } = require('date-fns');

const adaptor = require('./adaptor');
const { waitUntil, fetch } = require('../../../utils/async');

class IpmaProvider {
    constructor() {
        this.weatherTypes = null;

        this.setWeatherTypes();
    }

    async setWeatherTypes() {
        const request = await fetch('http://api.ipma.pt/open-data/weather-type-classe.json');
        const { data } = await request.json();

        const weatherTypes = new Map();

        data.forEach(type => {
            weatherTypes.set(type.idWeatherType, type.descIdWeatherTypeEN);
        });

        this.weatherTypes = weatherTypes;
    }

    async checkAsyncDataFromProvider() {
        if (this.weatherTypes !== null) {
            return true;
        }

        await waitUntil(() => this.weatherTypes !== null);

        return true;
    }

    async getWeatherInfo(location) {
        await this.checkAsyncDataFromProvider();

        const { id } = adaptor.locations.get(location.toLowerCase());

        const request = await fetch(`http://api.ipma.pt/public-data/forecast/aggregate/${id}.json`);
        const data = await request.json();

        return adaptor.convertInformation(data, this.weatherTypes);
    }

    async getWeatherForToday(location) {
        const forecast = await this.getWeatherInfo(location);

        return forecast.filter(forecast => isToday(forecast.date));
    }

    async getWeatherForTomorrow(location) {
        const forecast = await this.getWeatherInfo(location);

        return forecast.filter(forecast => isTomorrow(forecast.date));
    }
}

module.exports = IpmaProvider;
