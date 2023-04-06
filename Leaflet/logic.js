function createMap(houseInfo) {
    // Create the tile layer that will be the background of our map.
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  // Create a baseMaps object to hold the streetmap layer.
  let baseMaps = {
    "Steet Map": streetmap
  };

  // Create an overlayMap object to hold the houseInfo layer.
  let overlayMap = {
    "House Info": houseInfo
  };

  // Create the map object with options.
  let map = L.map("map", {
    center: [-31.953512, 115.857048 ],
    zoom:12,
    layers: [streetmap, houseInfo]
  });

  // Add the layers control to the map
  L.control.layers(baseMaps, overlayMap).addTo(map);
}

function createMarkers(locations) {
  // Initialize an array to hold location markers.
  console.log(locations)
  let locationMarkers = [];

  // Create a red marker icon with the home icon. 
  let homeIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
    className: 'fa fa-home'
  });
  // Loop through the locations array.
  for (let index = 0; index < locations.length; index++) {
    let location = locations[index];

    // For each location, create a marker, and bind a popup with the location's address and price.
    let locationMarker = L.marker([location.LATITUDE, location.LONGITUDE],  { icon: homeIcon })
      .bindPopup("<h3>" + location.ADDRESS + "</h3><p>Price: $" + location.PRICE + "</p>");

    // Add the marker to the locationMarkers array.
    locationMarkers.push(locationMarker);
  }

  // Create a layer group that's made from the location markers array.
  let locationsLayer = L.layerGroup(locationMarkers);

  // Pass the location markers layer to the createMap function.
  createMap(locationsLayer);
}

// Get the data
d3.json("http://127.0.0.1:5000/api/v1.0/coordinate").then(createMarkers);