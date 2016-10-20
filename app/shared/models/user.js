"use strict";

var LocationManager = require("location").LocationManager;
var appSettings = require("application-settings");
var dialogs = require("ui/dialogs");
var geolocation = require("nativescript-geolocation");
var Observable = require("data/observable").Observable;
var moment = require("moment");

var loc = new LocationManager();

function createViewModel() {
	var viewModel = new Observable();
	var lastKnownLocation = loc.lastKnownLocation;
	viewModel.latitude = null;
	viewModel.longitude = null;
	viewModel.plazas = [
		{ 
			nombre: "S02",
			descripcion: "Sotano 2",
			valorHora: "5000",
			parqueadero: { nombre: "El puerquito SAS" }
		}
	];

	return viewModel;
}

module.exports = createViewModel;
