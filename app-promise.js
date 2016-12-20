const yargs = require('yargs');
const axios = require('axios')
const tuc = require('temp-units-conv');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS'){
    throw new Error('Unable to find that address');
  }

  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var weatheUrl = `https://api.darksky.net/forecast/0afd7ced0cfba7b5925c8bcadecc6554/${lat},${lng}`
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatheUrl);
}).then((response) => {
  var temperature = tuc.fahrenheitToCelsius(response.data.currently.temperature);
  var apparentTemperature = tuc.fahrenheitToCelsius(response.data.currently.apparentTemperature);
  console.log(`Its currently ${temperature}.  It feels like ${apparentTemperature}.`);
}).catch((e) => {
  if (e.code === 'ENOTFOUND'){
    console.log('Unable to connect to API servers');
  }
  else {
    console.log(e.message);
  }

});
