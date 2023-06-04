let myMap = L.map("map", {
    center: [25, -100],
    zoom: 4
  });
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  
  d3.json(url).then(function(response) {
  
    //console.log(response);
    features = response.features;
  
    //console.log(features);
  
    for (let i = 0; i < features.length; i++) {
  
      let location = features[i].geometry;
      if(location){
        L.circleMarker([features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]], {
          radius: features[i].properties.mag * 4,
          color: "black",
          fillColor: getColor(features[i].geometry.coordinates[2]),
          fillOpacity: features[i].properties.mag * 0.12,
          weight: 1,
          opacity: 1
      }).bindPopup("<h3>" + features[i].properties.mag + " Magnitute, " + features[i].properties.place + "</h3><hr><p>" + new Date(features[i].properties.time) + "</p>").addTo(myMap);
      }
    
    }
  
    function getColor(d) {
  
      return d > 90  ? '#00FF00' :
             d > 70  ? '#99FF00' :
             d > 50  ? '#FFFF00' :
             d > 30  ? '#FFCC00' :
             d > 10  ? '#FF6600' :
             d > -10 ? '#FF0000' :
                       '#FED976' ;
    };
  
    // Set up the legend with the color ranges and depths
// Create a legend
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (myMap) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [90, 70, 50, 30, 10, -10, -30],
        labels = [];

    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(myMap);;

    });


    
  