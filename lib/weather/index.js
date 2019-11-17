"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var WeatherSDK =
/*#__PURE__*/
function () {
  function WeatherSDK(_ref) {
    var _ref$location = _ref.location,
        location = _ref$location === void 0 ? null : _ref$location,
        _ref$provider = _ref.provider,
        provider = _ref$provider === void 0 ? null : _ref$provider;

    _classCallCheck(this, WeatherSDK);

    this.location = location;
    this.api = WeatherSDK.getAPIFromProvider(provider);
  }

  _createClass(WeatherSDK, [{
    key: "getWeatherForToday",
    value: function getWeatherForToday() {
      return regeneratorRuntime.async(function getWeatherForToday$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", this.api.getWeatherForToday(this.location));

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }], [{
    key: "getAPIFromProvider",
    value: function getAPIFromProvider(provider) {
      var ApiProvider = null;

      switch (provider.toLowerCase()) {
        case 'ipma':
          ApiProvider = require('./providers/ipma');
          break;

        default:
          throw new Error('You should initiate the WeatherSDK with a valid provider!');
      }

      return new ApiProvider();
    }
  }]);

  return WeatherSDK;
}();

module.exports = WeatherSDK;