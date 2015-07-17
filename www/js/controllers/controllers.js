angular.module('proxivelo.controllers', [])

.controller('AppCtrl', function ($scope, $state, $ionicModal) {
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
    modal.show();
  });

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };
  $scope.rec = function()
  {
      $state.transitionTo("app.rec");
      $ionicModal.fromTemplateUrl('templates/recModal.html', {
          scope: $scope
      }).then(function (modal) {
          $scope.modal = modal;
          modal.show();
      });

  }

})

.controller('ChoixCtrl', function ($scope, $state, $ionicModal) {
  $scope.app = {};
  $scope.choisi = function(){
	  
	  switch($scope.app.option)
	  {
		  case "Enregistrement":
		      {
                    
		          $ionicModal.fromTemplateUrl('templates/recModal.html', {
		              scope: $scope
		          }).then(function (modal) {
		              $scope.modal = modal;
		              modal.show();
		          });

			   
		  }
		  break;
		  
		   case "Suivi":
		  {
			    $state.transitionTo("app.suivi");
		  }
		  break;
	  }
  }
  $scope.$on('modal.hidden', function () {
      if ($scope.app.option == "Enregistrement" )
      {
          $state.transitionTo("app.rec");
      }
    
  });


});

