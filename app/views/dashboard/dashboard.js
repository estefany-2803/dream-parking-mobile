"use strict";

var mapsModule = require("nativescript-google-maps-sdk");
var orientation = require('nativescript-orientation');
var geolocation = require("nativescript-geolocation");
var page;

exports.loaded = function(args) {
  page = args.object;
  orientation.disableRotation();
};


function onMapReady(args) {
  var mapView = args.object;
  var camera = args.camera;
  geolocation.getCurrentLocation({desiredAccuracy: 3, updateDistance: 10, timeout: 20000}).then(function(loc) {
      if (loc) {
        var marker = new mapsModule.Marker();
        marker.position = mapsModule.Position.positionFromLatLng(loc.latitude, loc.longitude);
        marker.title = "Aquí está usted";
        marker.snippet = "Ya sé donde vives pirobito";
        marker.userData = { index : 1};
        mapView.addMarker(marker);
        camera.latitude = loc.latitude;
        camera.longitude = loc.longitude;
      }
    }, function(e){
      console.log("Error: " + e.message);
    });
}

function onMarkerSelect(args) {
   console.log("Clicked on " +args.marker.title);
}

function onCameraChanged(args) {
    console.log("Camera changed: " + JSON.stringify(args.camera)); 
}

exports.onMapReady = onMapReady;
exports.onMarkerSelect = onMarkerSelect;
exports.onCameraChanged = onCameraChanged;