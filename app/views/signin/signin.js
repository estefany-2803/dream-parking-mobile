"use strict";	

var dialogs = require("ui/dialogs");
var orientation = require('nativescript-orientation');
var frameModule = require("ui/frame");
var page;

const UserModel = require("../../shared/models/auth.user.js");
const user = new UserModel();

/** 
 * Signin Methods
 + ====================================================================== */
exports.loaded = function(args) {
  page = args.object;
  page.bindingContext = user; 
	orientation.disableRotation();
};

exports.onSignin = function() {
	user.signin();
}

exports.onSignUpLink = () => {
  var topmost = frameModule.topmost();
	topmost.navigate("views/dashboard/dashboard");
};
