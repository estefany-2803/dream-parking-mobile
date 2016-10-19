"use strict";

var frameModule = require("ui/frame");
var dialogs = require("ui/dialogs");
var appSettings = require("application-settings");
var orientation = require('nativescript-orientation');
var frameModule = require("ui/frame");
var page;

const UserModel = require("../../shared/models/auth.user.js");
const user = new UserModel();

/** 
 * Signup Methods 
 + ====================================================================== */
exports.loaded = function(args) {
  page = args.object; 
	orientation.disableRotation();
	page.bindingContext = user;
};

exports.onCreateAccount = function() {
 	user.signup();
}

exports.onBack = function() {
	var topmost = frameModule.topmost();
  topmost.navigate("views/signup/signup");
}
