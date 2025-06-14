maptilersdk.config.apiKey = cloudMapToken;
const map = new maptilersdk.Map({
  container: 'map', // container's id or the HTML element in which the SDK will render the map
  style: maptilersdk.MapStyle.STREETS,
  center: mapLocation.geometry.coordinates, // starting position [lng, lat]
  zoom: 15 // starting zoom
});


function createCustomImageMarker() {
  const el = document.createElement('div');
  el.className = 'custom-marker'
  return el;
}

const marker = new maptilersdk.Marker(
  {
    color: 'transparent', // hide default blue
    element: createCustomImageMarker()
  }
)
  .setLngLat(mapLocation.geometry.coordinates)
  .addTo(map);

