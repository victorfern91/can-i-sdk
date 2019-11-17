const weather = require('../weather');

const weatherAPI = weather
    .setLocation('porto')
    .setProvider('ipma');

(async () => {
    console.log(await weatherAPI.getWeatherForToday())
})();
