angular.module('proxivelo.controllers')
.controller('SuiviCtrl', function ($scope, $ionicPopup, ajaxService, $rootScope, uiGmapGoogleMapApi, uiGmapIsReady,mapService) {

    $scope.map = { center: { latitude: 43.6109200, longitude: 3.8772300 }, zoom: 16 };

    $scope.polyline =
            {
                id: 1,
                path: new Array(),
                stroke: {
                    color: '#6060FB',
                    weight: 3
                },
                editable: false,
                draggable: false,
                geodesic: true,
                visible: true,

            };

    $scope.parcours = [{
        value: "",
        name: ""

    }];


    $scope.suiviMarkers = [];
    $scope.select = {};

    $scope.$watch('select.velo', function (newValue, oldValue) {

        if (!(newValue === oldValue)) {

            var params = {
                userId: $scope.user.Id,
                velo: $scope.select.velo
            };

            console.log($scope.user.Id);
            console.log($scope.select.velo);
            var url = "http://proxivelopro.fr/velo/parcoursApp.php";

            ajaxService.post(url, params)
                    .then(function (data) {
                        $scope.parcours = new Array();
                        console.log(data);
                        for (var i = 0; i < data.length; i++) {

                            var parcours = {
                                value: data[i],
                                name: data[i]
                            };

                            $scope.parcours.push(parcours);
                        }
                    });
        }
    });

    $scope.$watch('select.parcours', function (newValue, oldValue) {

        if (!(newValue === oldValue)) {
            console.log($scope.select.velo);
            var params = {
                userId: $scope.user.Id,
                velo: $scope.select.velo,
                parcours: newValue
            };
            var url = "http://proxivelopro.fr/velo/suiviApp.php";
            ajaxService.post(url, params)
                  .then(function (data) {
                      setPath(data);
                  });
        }
    });


    function setPath(points) {
        var n = 5;
        $scope.polyline.path = new Array();
        $scope.suiviMarkers = new Array();
        for (i = 0; i < points.length; i++) {

            $scope.polyline.path.push(mapService.setLatlng(points[i]));
            n--;
            if (n == 0) {
                n = 5;

                $scope.suiviMarkers.push(mapService.toMark(points[i], i));
            }
        }
        $scope.suiviMarkers.push(mapService.toMark(points[0], "Départ"));
        $scope.suiviMarkers.push(mapService.toMark(points[points.length - 1], "Arrivée"));
        $scope.map.center = points[points.length / 2];
        //mapService.drawPoly($scope.polyline.path)
    }






});
