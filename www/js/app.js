// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

.controller('MainController', function ($scope, $filter, $cordovaDialogs, $cordovaCamera) {
  var MSG_TEXT = 'text',
      MSG_PIC = 'pic';
  $scope.isText = function (message) {
    return message.type === MSG_TEXT;
  };
  $scope.isPic = function (message) {
    return message.type === MSG_PIC;
  };
  $scope.messages = $scope.messages || [];
  $scope.message = $scope.message || "";

  $scope.send = function () {
    var time = new Date;
    if ($scope.message.length) {
      $scope.messages.unshift({
        type: MSG_TEXT,
        text: $scope.message,
        time: time
      });
      console.log(prettyDate(time) + " :: User said: " + $scope.message);
      $scope.message = "";
      $cordovaDialogs.beep(1);
    }
    return false;
  };

  $scope.camera = function () {
    var opts = {
      allowEdit: true,
      saveToPhotoAlbum: false,
      destinationType: Camera.DestinationType.DATA_URL,
      targetWidth: 200
    };
    $cordovaCamera.getPicture(opts)
      .then(function (imageData) {
        var time = new Date;
        $scope.messages.unshift({
          type: MSG_PIC,
          imgData: imageData,
          time: time
        });
      }, function (err) {
        console.log('Error happen: ' + err);
      });
  };

  $scope.formatDate = prettyDate;

  $scope.renderImageSrc = renderImageSrc;

  function renderImageSrc (imgData) {
    return 'data:image/jpeg;base64,' + imgData;
  }

  function prettyDate (date) {
    return $filter('date')(date, "d 'of' MMMM 'at' H:mm");
  }
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
