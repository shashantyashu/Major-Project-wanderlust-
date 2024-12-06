maptilersdk.config.apiKey = 'VQrE5zh7MPkBFVjZGsEz';
const map = (window.map = new maptilersdk.Map({
container: 'map', // container's id or the HTML element to render the map 
style: maptilersdk.MapStyle.STREETS, // stylesheet location 
zoom: 7,
center: coordinates,

}));
const gc = new maptilersdkMaptilerGeocoder.GeocodingControl({}); map.addControl(gc, 'top-left');

console.log(coordinates);

let marker = new maplibregl.Marker({
    opacity: 0.5,
})
.setLngLat(coordinates)
.addTo(map)

let lngLat = marker.getLngLat({
});

map.on("click", () => {
    new maplibregl.Popup().setHTML(`<br><h5>${CoUntry}</h5><p>${LoCation}</p>`).setLngLat(lngLat).addTo(map);
});
