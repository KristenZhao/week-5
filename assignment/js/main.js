/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
===================== */
// Interactive input
$(document).ready(function(){

  // Functions
  // parsedata takes json and returns objects
  var parseData = function(data) {
    var parsed = JSON.parse(data);
    return parsed;
  };

  // a function to plot L.markers onto map
  var plotMarkers = function(markers) {
    _.map(markers,function(marker){marker.addTo(map);
    });
  };

  // remove the markers
  var removeMarkers = function(markers) {
    _.map(markers,function(marker){map.removeLayer(marker);
    });
  };

  $("button").click(function(){
    // give a default for URL, easy to test
    $("#url-input").val("http://raw.githubusercontent.com/CPLN692-MUSA611/datasets/master/json/philadelphia-solar-installations.json");
    $("#lat-input").val("LAT");
    $("#long-input").val("LONG_");

    var targetURL = $("#url-input").val();
    var lat = $("#lat-input").val();
    var long = $("#long-input").val();
    console.log("url:",targetURL,"lat:",lat,"long:",long);

    var downloadData = $.ajax(targetURL);

    // convert parsed objects into L.marker object
    var makeMarkers = function(parsed) {
      var markersArray = _.map(parsed,function(parsedItem){
      //console.log('L.marker:',L.marker([parsedItem.LAT,parsedItem.LONG_]));
      return L.marker([parsedItem[lat],parsedItem[long]]);
      }); return markersArray;
    };

    // Code Execution
    downloadData.done(function(data) {
      //console.log(data);
      var parsed = parseData(data);
      console.log("parsed", parsed);
      var markers = makeMarkers(parsed);
      console.log('markers:',markers);
      plotMarkers(markers);
      removeMarkers(markers);
    });
  });
});

// We set this to HTTP to prevent 'CORS' issues
//var targetURL = "http://raw.githubusercontent.com/CPLN692-MUSA611/datasets/master/json/philadelphia-solar-installations.json";

//console.log(downloadData);


/* =====================
 Leaflet setup - feel free to ignore this
===================== */

var map = L.map('map', {
  center: [39.9522, -75.1639],
  zoom: 14
});
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

/* =====================
 CODE EXECUTED HERE!
===================== */
