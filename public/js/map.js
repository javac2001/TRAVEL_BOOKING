maptilersdk.config.apiKey = cloudMapToken;
const map = new maptilersdk.Map({
  container: 'map', // container's id or the HTML element in which the SDK will render the map
  style: maptilersdk.MapStyle.STREETS,
  center: mapLocation.geometry.coordinates, // starting position [lng, lat]
  zoom: 15 // starting zoom
});

const el = document.createElement('div');
el.className = 'custom-marker';

const marker = new maptilersdk.Marker()
  .setLngLat(mapLocation.geometry.coordinates)
  .setPopup(
    new maptilersdk.Popup({ offset: 25 })
      .setHTML("<strong>Kolkata</strong><br>City of Joy")
  )
  .addTo(map);

