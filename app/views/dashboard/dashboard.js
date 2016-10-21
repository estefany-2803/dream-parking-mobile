"use strict";

var mapsModule = require("nativescript-google-maps-sdk");
var geolocation = require("nativescript-geolocation");
var orientation = require('nativescript-orientation');
var page;

const UserModel = require("../../shared/models/user.js");
const user = new UserModel();
const http = require("http");



function getPlazas() {
  http.request({
    url: "http://dreamparking.padduk.tech/api/plazas/disponibles",
    method: "GET",
    headers: { "Content-Type": "application/json" }
  }).then((response) => {
    var data = JSON.parse(response.content);

    data.datos.map((plaza) => {
      plaza.valorHora = `Valor hora: COP$ ${plaza.valorHora}`;
      return plaza;
    })

    user.set("plazas", data.datos);
  })
}

function getRandomInRange(from, to, fixed) {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}


exports.loaded = function(args) {
  orientation.disableRotation();
  page = args.object;
  page.bindingContext = user; 
  getPlazas()
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


      return loc;
    }
  }).then((loc) => {
    user.set("latitude", loc.latitude);
    user.set("longitude", loc.longitude);
  }).catch((err) => {
    console.log("ERROR:", err)
  });


  http.request({
    url: "http://dreamparking.padduk.tech/api/parqueaderos",
    method: "GET",
    headers: { "Content-Type": "application/json" }
  }).then((response) => {
    var data = JSON.parse(response.content);
    data.datos.map((parqueadero) => {
     parqueadero.location = {
       latitude: getRandomInRange(4.812557, 4.832557, 6),
       longitude: getRandomInRange(-74.352839,-74.35589, 6)
     };

     return parqueadero;      
    })

    data.datos.forEach(function (parqueadero) {
      var parkingMarker = new mapsModule.Marker();
      parkingMarker.position = mapsModule.Position.positionFromLatLng(parqueadero.location.latitude, parqueadero.location.longitude);
      parkingMarker.title = parqueadero.nombre;
      parkingMarker.snippet = `${parqueadero.horaAbierto} - ${parqueadero.horaCierre}`;
      parkingMarker.userData = { index : 1};
      mapView.addMarker(parkingMarker);
    })
  }).catch((err) => {
    console.log("err", err)
  })
}

function onMarkerSelect(args) {
  
}

function onCameraChanged(args) {
  
}

exports.onMapReady = onMapReady;
exports.onMarkerSelect = onMarkerSelect;
exports.onCameraChanged = onCameraChanged;
exports.onUpdatePlazas = getPlazas;