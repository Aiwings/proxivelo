

angular.module('proxivelo.controllers')
.controller('RecCtrl', function ($scope, ajaxService, $rootScope, uiGmapGoogleMapApi, $ionicModal, mapService) {
    var bgGeo;
    $scope.debutfin = true;
    $scope.map = { center: { latitude: 43.6109200, longitude: 3.8772300 }, zoom: 16 };

    $scope.polyline =
    {
        id: 1,
        path: new Array()
    }
    ;
    $scope.recMarkers = [];
    $scope.init = function () {
        var options = { enableHighAccuracy: true };
        navigator.geolocation.getCurrentPosition(function (location) {
            console.log('[GEOLOCAL JS1] Location from Phonegap');
        },
        function (error) {
            console.log('[GEOLOCAL JS1] error with GPS: error.code: ' + error.code + ' Message: ' + error.message);
        }, options);

    };

    $scope.debut = function () {

        if ($scope.user.velo) {
            bgGeo.start();
            $scope.debutfin = false;
        }
        else {
            var alertPopup = $ionicPopup.alert({
                title: 'Erreur!',
                template: 'Veuillez selectionner un vélo/parcours'
            });
            alertPopup.then(function (res) {
                console.log('Echec Réussi');
            });

        }
    };

    $scope.fin = function () {
        $scope.debutfin = true;
        bgGeo.stop();
    }

    document.addEventListener("deviceready", function () {

        bgGeo = window.plugins.backgroundGeoLocation;

        var callbackFn = function (location) {
            //console.log('[js] BackgroundGeoLocation callback: ' + location.latitudue + ',' + location.longitude);
            var url = "http://www.proxivelopro.fr/velo/pointsApp.php";

            var params = {
                user:$scope.user,
                location: location
            };

            ajaxService.post(url, params)
            .then(function (received) {

                console.log(received);

                if (received.success == "true") {

                    $scope.map.center.latitude = location.latitudue;
                    $scope.map.center.longitude = location.longitude;
                    var active = {
                        latitude: location.latitudue,
                        longitude: location.longitude
                    };
                    $scope.suiviMarkers = new Array();
                    $scope.polyline.path.push(active);
                    mapService.drawPoly($scope.polyline.path);
                    $scope.suiviMarkers.push(mapService.toMark(active, "Actif"));
                    bgGeo.finish();

                }
                else {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Erreur!',
                        template: 'La connection a échoué'
                    });
                    alertPopup.then(function (res) {
                        console.log('Echec Réussi');
                    });
                }
            });
        };


        var failureFn = function (error) {
            console.log('BackgroundGeoLocation error');

            var alertPopup = $ionicPopup.alert({
                title: 'Erreur!',
                template: 'La connection a échoué' + error
            });
            alertPopup.then(function (res) {
                console.log('Echec Réussi');
            });
        };


        bgGeo.configure(callbackFn, failureFn, {
            url: "http://www.proxivelopro.fr/velo/pointsApp.php", //Android
            params: {
                user: $scope.user
            },
            desiredAccuracy: 0,
            stationaryRadius: 10,
            distanceFilter: 20,
            notificationTitle: 'Background tracking',
            notificationText: 'ENABLED',
            activityType: 'AutomotiveNavigation',
            debug: false,
            stopOnTerminate: false
        });

    });

}).controller('recPopupCtrl', function ($scope, $rootScope, $ionicModal) {

    $scope.popup = {};


    function getDate() {

        var d = new Date();
        var jour = d.getDate();
        var mois = d.getMonth()+1;
        var annee = d.getFullYear();
        var heure = d.getHours();
        var minutes = d.getMinutes();
        var secondes = d.getSeconds();

        var date = annee + "-" + digit(mois) + "-" + digit(jour) + " " + digit(heure) + ":" + digit(minutes) + ":" + digit(secondes);
        return date;

    }

    function digit(el) {
        if (el < 10) {
            el = "0" + el;
        }
        return el;
    }

    $scope.choisir = function () {
        if ($scope.popup.parcours && $scope.popup.velo) {

            var date = getDate();
            $rootScope.user.parcours = $scope.popup.parcours + " "+date;
            $rootScope.user.velo = $scope.popup.velo;
            $scope.modal.hide();
            console.log($scope.user);
        }
        else {
            var alertPopup = $ionicPopup.alert({
                title: 'Erreur!',
                template: 'Veuillez faire votre choix'
            });
            alertPopup.then(function (res) {
                console.log('Echec Réussi');
            });
        }
    };

});
