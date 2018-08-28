// Creating a variable and storing our API endpoint as queryUrl.  Collecting data for all earthquakes in the past one day
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";


// Perform a GET request to the query URL on the earthquake data
d3.json(queryUrl, function(data) {
    // Passing the data.features data to the createFeatures function once we receive the data from the API
    createFeatures(data.features);
    console.log(data.features);
});

//Function to define the marker size based on the magnitude of the earthquake
function markerSize(earthquakeData) {
    return feature.properties.mag/10;
}

// Defining and creating the map for the tectonic plates

// creating a variable and storing our API endpoint for the data on tectonic plates
var queryUrl1 = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json";

var tectonicData;

// Performing a GET request to the query URL on the tectonic plates
 d3.json(queryUrl1, function(data) {
    createTectonicFeatures(data.features);
    console.log(data.features);
   });

function createTectonicFeatures(tectonicData) {
    function onEachFeature(feature, layer) {
       layer.bindPopup();
    }
      
var tectonics = L.geoJSON(tectonicData, {
    onEachFeature: onEachFeature,

})
}

//defining arrays to hold our earthquake and tectonic markers
earthquakes = [];
tectonics = [];

var earthquakes = L.layerGroup(earthquakeData);
var tectonics = L.layerGroup(tectonicData);

var earthquakeData;

function createFeatures(earthquakeData) {

// Defining a function that will run once for each feature in the features array of the earthquake data
// This function also defines and binds a popup for each earthquake occurance
function onEachFeature(feature,layer) {
        layer.bindPopup("<h2>" + "Magnitude:" + "" + feature.properties.mag  + "</h2>" + "<h2>" + feature.properties.place + "</h2><hr><p>" + new Date(feature.properties.time) + "</p>");       
        
        L.circle(earthquakeData, {
                    radius: 20,
                    stroke: true,
                    color: 'black',
                    opacity: 1,
                    weight: 1,
                    fill: true,
                    fillColor: "red",
                    fillOpacity: 0.3
                })
                            
                  
}

// Running the onEachFeature function once for each data in the array
var earthquakes = L.geoJSON(earthquakeData, {
       onEachFeature: onEachFeature,
   });

// Defining streetmap and darkmap layers
var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token={accessToken}",
{
  accessToken: API_KEY
});

var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}",
{
  accessToken: API_KEY
});

var satellitemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}",
{
  accessToken: API_KEY
});

var grayscalemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}",
{
  accessToken: API_KEY
});


// Defining and creating a baseMaps object to hold our base layer
var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap,
    "Satellite Map": satellitemap,
    "Gray Scale Map": grayscalemap
};

// creating an overlay object to hold our overlay earthquake layer
var overlayMaps = {
    "Earthquakes": earthquakes,
    "Tectonic": tectonics
};

// Create a new map which gives the default map when the program is first run
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [streetmap, darkmap, satellitemap, grayscalemap ]
  });

  // Create a layer control containing our baseMaps
  // Be sure to add an overlay Layer containing the earthquake GeoJSON
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
    }).addTo(myMap);
}
