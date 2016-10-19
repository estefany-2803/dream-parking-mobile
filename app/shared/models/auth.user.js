"use strict";

var API = require("../utils/API.js");
var appSettings = require("application-settings");
var dialogs = require("ui/dialogs");
var Observable = require("data/observable").Observable;
var frameModule = require("ui/frame");

var moment = require("moment");

function setSession(accessToken, userProfile) {
  appSettings.setBoolean("appUserLoggedIn", true);
  appSettings.setString("appUserAccesToken", accessToken);
  appSettings.setString("appUserProfile", JSON.stringify(userProfile));
}



function createViewModel() {
  var viewModel = new Observable();
  var PickerManager = require("nativescript-timedatepicker");

  viewModel.sex = null;
  viewModel.birth = null;
  viewModel.sexItems = [
    {"title": "Hombre", value: "male"},
    {"title": "Mujer", value: "female"},
    {"title": "Otro", value: "other"}
  ];


  viewModel.signin = function() {
    var email = viewModel.get("email");
    var password = viewModel.get("password");

    API.Auth.signin({ username: email, password: password }).then((response) => {

      if(response.statusCode === 200) {/** User Exists  */

        if(appSettings.getBoolean("appFirstTimeSession")) {
          setSession(response.content.data.accessToken, response.content.data.user);
        } else {
          appSettings.setBoolean("appFirstTimeSession", true);
          setSession(response.content.data.accessToken, response.content.data.user);
        }
        
        topmost.navigate("views/dashboard/dashboard");  

      } else if (response.statusCode === 404) { /** No user in db */

        dialogs.confirm({
          title: "No encontramos registro de este usuario",
          message: "Puedes crear una cuenta o volver a intentar",
          okButtonText: "Crear Cuenta",
          cancelButtonText: "Volver a intentar"
        }).then((ok) => {
          if(ok) {
            /** TODO: Save previous Credentials  */
            var topmost = frameModule.topmost();
            topmost.navigate("views/signup/signup");
          }
        })
        
      } else { /** Error Server */

        dialogs.confirm({
          title: "Tenemos problemas al conectarnos con el servidor",
          message: "Por favor intentalo más tarde",
          cancelButtonText: "Volver a intentar"
        }).then((redirect) => {
          if(redirect) {
            /** TODO: Make error report  */
          }
        })

      }
    }).catch((err) => {
      console.log(err);
    }) 
  }

  viewModel.signup = function () {
    console.log(viewModel.sex);
  }

  viewModel.selectSelectSegment = (event) => {
    var items = viewModel.get("sexItems");
    viewModel.set("sex", items[event.newIndex].value);
  }

  viewModel.openDatePicker = () => {
    PickerManager.showDatePickerDialog();
  }

  PickerManager.init((result) => {
    var date = moment(result, "DD MM YYYY HH:mm z");
    viewModel.set("birth", date.format("DD-MM-YYYY"));
  }, null, null);

  return viewModel;
}

module.exports = createViewModel;