var width = 1100,
    height = 640,
    active = d3.select(null);

// Set map wrapper size.
d3.select('#map')
  .style('width', width + 'px')
  .style('height', height + 'px');


// Create Leftlet map and center in the desired position.
var map = L.map('map').setView([34.0000, -118.300], 10);

// Mapbox
var tiles = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
//var tiles = 'https://{s}.tiles.mapbox.com/v3/examples.map-i87786ca/{z}/{x}/{y}.png';
// Openstreetmap
//var tiles = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

// Add openstreetmap tile layer.
L.tileLayer(tiles, { maxZoom: 18 }).addTo(map);
// add a marker
	L.marker([34.0559, -118.2386], 10)
	.bindPopup("Los Angeles!")
	.addTo(map)
	.openPopup();
	

/* Initialize the SVG layer */
map._initPathRoot();

// D3 Projection
var projection = d3.geo.mercator();

// Create the svg element inside the div.
//var svg = d3.select("#map").select("svg");
var svg = d3.select(map.getPanes().overlayPane).append("svg");
var g = svg.append("g").attr("class", "leaflet-zoom-hide");

// Initialize tooltips.
var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) { return d.properties.name; });
svg.call(tip);


// Use Leaflet to implement a D3 geometric transformation.
function projectPoint(x, y) {
  var point = map.latLngToLayerPoint(new L.LatLng(y, x));
  this.stream.point(point.x, point.y);
}
// Create a d3.geo.path to convert GeoJSON to SVG.
var transform = d3.geo.transform({point: projectPoint}),
    path = d3.geo.path().projection(transform);

// Random color function.
var color = function(d) {
  return 'blue';
};


d3.json("data.json", function(data) {
		svg.selectAll(".shapes")
			.data(data.data)
			.enter()
			.append(function(d){
				L.circle([d.Location[0],d.Location[1]], 1).bindPopup(d.AreaName+"<br/>Crime: "+d.CrimeCodeDescription).addTo(map);
				return document.createElementNS('http://www.w3.org/2000/svg', "circle");
			})
      .attr("class", "shapes")
    
   /* svg.selectAll("circle")
			.attr("class", "circle")
			.attr("cx", function(d) {
				return projection([d.Location[1], d.Location[0]])[0];
			})
			.attr("cy", function(d) {
				console.log("cy:"+projection([d.Location[1], d.Location[0]])[1]);
				return projection([d.Location[1], d.Location[0]])[1];
			})
			.attr("r", "1")
    .on("mouseover", function(d) {
       
       div.transition()
         .duration(200)
         .style("opacity", .9);
       
       div.html(d.AreaName+"<br/>Crime: "+d.CrimeCodeDescription)
         .style("left", (d3.event.pageX) + "px")
         .style("top", (d3.event.pageY - 28) + "px");
       })
     .on("mouseout", function(d) {
       div.transition()
         .duration(500)
         .style("opacity", 0);
       });
*/
   
	});
	
	