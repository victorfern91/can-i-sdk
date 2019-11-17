class WeatherSDK {
    constructor({ location = null, provider = null }) {
        this.location = location;
        this.api = WeatherSDK.getAPIFromProvider(provider);
    }

    static getAPIFromProvider(provider) {
        let ApiProvider = null;

        switch (provider.toLowerCase()) {
            case 'ipma':
                ApiProvider = require('./providers/ipma');
                break;
            default:
                throw new Error('You should initiate the WeatherSDK with a valid provider!');
        }

        return new ApiProvider();
    }

    async getWeatherForToday() {
        return this.api.getWeatherForToday(this.location);
    }
}

module.exports = WeatherSDK;
