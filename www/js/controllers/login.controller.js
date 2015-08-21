angular.module('proxivelo.controllers')

.controller('loginCtrl', function ($scope, $ionicModal, ajaxService, $rootScope, $ionicPopup) {
    // Form data for the login modal
    $scope.loginData = {};



    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login' + $scope.loginData.user + " " + $scope.loginData.pw);


        var url = "http://www.publinow.fr/velo/loginApp.php";
        var loginData = $scope.loginData;


        ajaxService.post(url, loginData)
            .then(function (received) {

                console.log(received);
                $scope.response = received;


                if (received.success == "true") {
                    $rootScope.user = {};
                    $rootScope.user.Id = received.userId;

                    $scope.modal.hide();
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

});
