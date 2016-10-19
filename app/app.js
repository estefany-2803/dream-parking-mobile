"use strict";
var application = require("application");
var appSettings = require("application-settings");
var API = require("./shared/utils/API.js");

if (application.ios) {
	GMSServices.provideAPIKey("AIzaSyBgFDKCMUx3aElwACav4LGfv5qSW81TRMA");
}

application.start({ moduleName: "views/dashboard/dashboard" });
