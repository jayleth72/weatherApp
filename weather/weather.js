const request = require('request');
const tuc = require('temp-units-conv');

var getWeather = (lat, long, callback) => {
  request({
    url: `https://api.darksky.net/forecast/0afd7ced0cfba7b5925c8bcadecc6554/${lat},${long}`,
    json: true
  }, (error, response, body) => {
      if (!error && response.statusCode === 200)
      {
        callback(undefined, {
          temperature: tuc.fahrenheitToCelsius(body.currently.temperature),
          apparentTemperature: tuc.fahrenheitToCelsius(body.currently.apparentTemperature)
        });

      }
      else
      {
        callback('Unable to fetch weather');
      }

  });
};

module.exports.getWeather = getWeather;
