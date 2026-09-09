/* eslint-disable */
export const displayMap = locations => {
  // Create Leaflet map instance centered on map container
  const map = L.map('map', { zoomControl: false, scrollWheelZoom: false });

  // Add OpenStreetMap tile layer (free, no API key required)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  const points = [];

  // Custom pin icon matching Natours pin design
  const customIcon = L.icon({
    iconUrl: '/img/pin.png',
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -35]
  });

  locations.forEach(loc => {
    // GeoJSON is [lng, lat], Leaflet expects [lat, lng]
    const coords = [loc.coordinates[1], loc.coordinates[0]];
    points.push(coords);

    // Add marker and popup
    L.marker(coords, { icon: customIcon })
      .addTo(map)
      .bindPopup(`<p>Day ${loc.day}: ${loc.description}</p>`, {
        autoClose: false,
        closeOnClick: false,
        className: 'map-popup'
      })
      .openPopup();
  });

  // Fit map bounds to encompass all tour locations
  const bounds = L.latLngBounds(points);
  map.fitBounds(bounds, {
    padding: [100, 100]
  });
};
