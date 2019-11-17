"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('date-fns'),
    isToday = _require.isToday,
    isTomorrow = _require.isTomorrow;

var adaptor = require('./adaptor');

var _require2 = require('../../../utils/async'),
    waitUntil = _require2.waitUntil,
    fetch = _require2.fetch;

var IpmaProvider =
/*#__PURE__*/
function () {
  function IpmaProvider() {
    _classCallCheck(this, IpmaProvider);

    this.weatherTypes = null;
    this.setWeatherTypes();
  }

  _createClass(IpmaProvider, [{
    key: "setWeatherTypes",
    value: function setWeatherTypes() {
      var request, _ref, data, weatherTypes;

      return regeneratorRuntime.async(function setWeatherTypes$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(fetch('http://api.ipma.pt/open-data/weather-type-classe.json'));

            case 2:
              request = _context.sent;
              _context.next = 5;
              return regeneratorRuntime.awrap(request.json());

            case 5:
              _ref = _context.sent;
              data = _ref.data;
              weatherTypes = new Map();
              data.forEach(function (type) {
                weatherTypes.set(type.idWeatherType, type.descIdWeatherTypeEN);
              });
              this.weatherTypes = weatherTypes;

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "checkAsyncDataFromProvider",
    value: function checkAsyncDataFromProvider() {
      var _this = this;

      return regeneratorRuntime.async(function checkAsyncDataFromProvider$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(this.weatherTypes !== null)) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return", true);

            case 2:
              _context2.next = 4;
              return regeneratorRuntime.awrap(waitUntil(function () {
                return _this.weatherTypes !== null;
              }));

            case 4:
              return _context2.abrupt("return", true);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getWeatherInfo",
    value: function getWeatherInfo(location) {
      var _adaptor$locations$ge, id, request, data;

      return regeneratorRuntime.async(function getWeatherInfo$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(this.checkAsyncDataFromProvider());

            case 2:
              _adaptor$locations$ge = adaptor.locations.get(location.toLowerCase()), id = _adaptor$locations$ge.id;
              _context3.next = 5;
              return regeneratorRuntime.awrap(fetch("http://api.ipma.pt/public-data/forecast/aggregate/".concat(id, ".json")));

            case 5:
              request = _context3.sent;
              _context3.next = 8;
              return regeneratorRuntime.awrap(request.json());

            case 8:
              data = _context3.sent;
              return _context3.abrupt("return", adaptor.convertInformation(data, this.weatherTypes));

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getWeatherForToday",
    value: function getWeatherForToday(location) {
      var forecast;
      return regeneratorRuntime.async(function getWeatherForToday$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(this.getWeatherInfo(location));

            case 2:
              forecast = _context4.sent;
              return _context4.abrupt("return", forecast.filter(function (forecast) {
                return isToday(forecast.date);
              }));

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getWeatherForTomorrow",
    value: function getWeatherForTomorrow(location) {
      var forecast;
      return regeneratorRuntime.async(function getWeatherForTomorrow$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(this.getWeatherInfo(location));

            case 2:
              forecast = _context5.sent;
              return _context5.abrupt("return", forecast.filter(function (forecast) {
                return isTomorrow(forecast.date);
              }));

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    }
  }]);

  return IpmaProvider;
}();

module.exports = IpmaProvider;