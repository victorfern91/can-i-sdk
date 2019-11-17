const WeatherSDK = require('../bin/weather');

const weatherAPI = new WeatherSDK({
    location: 'Porto',
    provider: 'ipma'
});

(async () => {
    console.log(await weatherAPI.getWeatherForToday());
})();
