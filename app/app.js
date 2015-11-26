'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.auth',
  'myApp.viewHome',
  'myApp.viewMain',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'ui.bootstrap',
  'satellizer',
  'myApp.services'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}]).
run(['$rootScope', '$location', '$log', 'satellizer.shared', 'UserService', function ($rootScope, $location, $log, shared, userService) {

  $rootScope.$on('$routeChangeStart', function(ev, next, curr) {
    $log.debug('routeChangeStart %o', next);
    if (next) {
      if (next.data && next.data.requireLogin) {
        if (shared.isAuthenticated()) {
          $log.debug('User Logged In for secured resource');
        } else {
          $log.debug('user not logged in for secured resource');
          ev.preventDefault();
          $rootScope.pendingPath = next;
          $location.path('/login');
        }
      }
      else {
        $log.debug('Non-secured resource');
      }
    }

    if (shared.isAuthenticated()) {
      $rootScope.currentUser = userService.currentUser();
    }
  });
}]).
controller('MainCtrl', ['$scope', 'satellizer.shared', '$auth', '$location', '$log', '$rootScope', "UserService", function($scope, shared, $auth, $location, $log, $rootScope, userService) {
  $scope.loggedIn = shared.isAuthenticated();

  $scope.logout = function() {
    $auth.logout()
      .then(function(response) {
        delete $rootScope.currentUser;
        userService.logout();

        $log.debug('Logged out');
        $location.path('/login');
      })
      .catch(function(err) {
        $log.error("failed to logout", err);
      });
  };
}]);
