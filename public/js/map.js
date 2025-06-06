maptilersdk.config.apiKey = cloudMapToken;
const map = new maptilersdk.Map({
  container: 'map', // container's id or the HTML element in which the SDK will render the map
  style: maptilersdk.MapStyle.STREETS,
  center: [88.3629, 22.5744], // starting position [lng, lat]
  zoom: 14 // starting zoom
});