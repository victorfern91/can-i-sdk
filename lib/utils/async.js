"use strict";

var _require = require('lodash'),
    isObject = _require.isObject;

function isRunningOnBrowser() {
  try {
    isObject(window);
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = {
  waitUntil: function waitUntil(conditionChecker) {
    var delayTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
    return new Promise(function (resolve) {
      var interval = setInterval(function () {
        if (conditionChecker()) {
          resolve();
          clearInterval(interval);
        }
      }, delayTime);
    });
  },
  fetch: isRunningOnBrowser() ? window.fetch : require('node-fetch')
};