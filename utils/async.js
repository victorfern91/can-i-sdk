const { isObject } = require('lodash');

function isRunningOnBrowser() {
    try {
        isObject(window);

        return true;
    } catch (e) {
        return false;
    }
}

module.exports = {
    waitUntil: (conditionChecker, delayTime = 100) => {
        return new Promise((resolve) => {
            const interval = setInterval(() => {
                if (conditionChecker()) {
                    resolve();
                    clearInterval(interval);
                }
            }, delayTime);
        });
    },

    fetch: isRunningOnBrowser() ? window.fetch : require('node-fetch')
}
