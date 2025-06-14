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
  // el.style.backgroundImage = 'url("/img/mapLogo.png")';
  // el.style.width = '40px';
  // el.style.height = '50px';
  // el.style.backgroundSize = 'cover';
  return el;
}

const marker = new maptilersdk.Marker(
  {
    color: 'transparent', // hide default blue
    element: createCustomImageMarker()
  }
)
  .setLngLat(mapLocation.geometry.coordinates)
  .setPopup(
    new maptilersdk.Popup({ offset: 25 })
      .setHTML("<strong>Kolkata</strong><br>City of Joy")
  )
  .addTo(map);

