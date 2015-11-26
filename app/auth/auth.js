'use strict';

angular.module('myApp.auth', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
      .when('/login', {
          templateUrl: 'auth/login.html',
          controller: 'LoginCtrl'
      })
      .when('/verify/request', {
          templateUrl: 'auth/verify-request.html',
          controller: 'VerifyRequestCtrl'
      })
}])

.controller('LoginCtrl', [ '$scope', '$auth', '$rootScope', '$location', '$log', 'UserService', function($scope, $auth, $rootScope, $location, $log, UserService) {
    $scope.alerts = [];

    $scope.authenticate = function(provider) {
        $auth.authenticate(provider)
            .then(function(response) {
                $log.debug("result of auth: %o", response);
                if (response && response.data && response.data.user) {
                    $log.debug("Set rootScope(%o) user to %o", $rootScope, response.data.user);

                    $rootScope.currentUser = UserService.login(response.data.user);
                    if ($rootScope.pendingPath) {
                        $log.debug('send user back to %o', $rootScope.pendingPath);

                        $location.path($rootScope.pendingPath.originalPath);
                        delete $rootScope.pendingPath;
                    }
                }
            })
            .catch(function(err) {
                $scope.alerts = [{type: 'danger', message: 'Login failed'}];
                $log.debug("login failed", err);
            });
    };
}]);
