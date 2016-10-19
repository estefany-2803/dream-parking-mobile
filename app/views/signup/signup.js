"use strict";

var frameModule = require("ui/frame");
var dialogs = require("ui/dialogs");
var appSettings = require("application-settings");
var orientation = require('nativescript-orientation');
var frameModule = require("ui/frame");
var page;

/** 
 * Signup Methods 
 * 
 + ====================================================================== */
exports.loaded = function(args) {
  page = args.object; 
	orientation.disableRotation();
};

exports.onBack = function() {
	var topmost = frameModule.topmost();
  topmost.navigate("views/signin/signin");
}

exports.goToStepTwo = () => {
	var topmost = frameModule.topmost();
	topmost.navigate("views/signup/signup.step2");
}