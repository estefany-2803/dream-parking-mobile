"use strict";

var mapsModule = require("nativescript-google-maps-sdk");
var geolocation = require("nativescript-geolocation");
var orientation = require('nativescript-orientation');
var page;

const UserModel = require("../../shared/models/user.js");
const user = new UserModel();

exports.loaded = function(args) {
  orientation.disableRotation();
  page = args.object;
  page.bindingContext = user; 
};


function onMapReady(args) {
  var camera = args.camera;
  var mapView = args.object;

  geolocation.getCurrentLocation({desiredAccuracy: 3, updateDistance: 10, timeout: 20000}).then(function(loc) {
    if(loc) {
      var userMarker = new mapsModule.Marker();
      userMarker.position = mapsModule.Position.positionFromLatLng(loc.latitude, loc.longitude);
      userMarker.title = "Aquí estoy yo";
      userMarker.snippet = "";
      userMarker.userData = { index : 1};
      mapView.addMarker(userMarker);

      var parkingMarker = new mapsModule.Marker();
      parkingMarker.position = mapsModule.Position.positionFromLatLng(4.812557, -74.352839);
      parkingMarker.title = "El puerquito SAS";
      parkingMarker.snippet = "8am - 11pm";
      parkingMarker.userData = { index : 1};
      mapView.addMarker(parkingMarker);


      return loc;
    }
  }).then((loc) => {
    user.set("latitude", loc.latitude);
    user.set("longitude", loc.longitude);
  }).catch((err) => {
    console.log("ERROR:", err)
  });
}

function onMarkerSelect(args) {
  
}

function onCameraChanged(args) {
  
}

exports.onMapReady = onMapReady;
exports.onMarkerSelect = onMarkerSelect;
exports.onCameraChanged = onCameraChanged;