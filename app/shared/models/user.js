"use strict";

var appSettings = require("application-settings");
var dialogs = require("ui/dialogs");
var geolocation = require("nativescript-geolocation");
var Observable = require("data/observable").Observable;
var moment = require("moment");


function createViewModel() {
	var viewModel = new Observable();
	viewModel.latitude = null;
	viewModel.longitude = null;
	viewModel.plazas = [];
	viewModel.parqueaderos = [];

	return viewModel;
}

module.exports = createViewModel;
