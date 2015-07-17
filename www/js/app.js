// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('proxivelo', ['ionic', 'uiGmapgoogle-maps', 'proxivelo.controllers', 'proxivelo.services'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }



    });
})

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl'
    })

    .state('app.choix', {
        url: "/choix",
        views: {
            'menuContent': {
                templateUrl: "templates/choix.html",
                controller: "ChoixCtrl"
            }
        }
    })
    .state('app.rec', {
        url: "/rec",
        views: {
            'menuContent': {
                templateUrl: "templates/recMap.html",
                controller: "RecCtrl"
            }
        }
    })

      .state('app.suivi', {
          url: "/suivi",
          views: {
              'menuContent': {
                  templateUrl: "templates/suiviMap.html",
                  controller: "SuiviCtrl"
              }
          }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/choix');
})
.config(function (uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
});
