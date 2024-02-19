const map = L.map('map');
map.setView([24.63674,46.7845629], 14);
let myFeatuers_no = L.layerGroup();
var myFeatuersGeojson;


const lyr = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {"attribution": "Esri", "detectRetina": false, "maxNativeZoom": 18, "maxZoom": 19, "minZoom": 0, "noWrap": false, "opacity": 1, "subdomains": "abc", "tms": false}
    ).addTo(map);

myFeatuersGeojson = L.geoJSON(myFeatuers,{
    style: {  color: '#5a5e53',
            fillColor: '#235ba5',
            fillOpacity: 0.4,
            weight: 1},
    onEachFeature: function(feature, layer) {
        let pName = L.divIcon({
        "className": 'my-txt-div',
        "html" : '<p>'+ feature.properties["Parcel_No"] +'</p>',
        "iconAnchor": [100, 20],
        "iconSize": [200, 20]
        });
        var mrk = L.marker(layer.getBounds().getCenter(), {icon: pName});
        myFeatuers_no.addLayer(mrk)
    }
});

myFeatuersGeojson.addTo(map);

map.fitBounds(myFeatuersGeojson.getBounds());

map.on('zoomend', function() {
    if (map.getZoom() >= 17) {
        myFeatuers_no.addTo(map);
    } else {
            map.removeLayer(myFeatuers_no); 
        }
    });