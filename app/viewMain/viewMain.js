'use strict';

angular.module('myApp.viewMain', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/viewMain', {
    templateUrl: 'viewMain/viewMain.html',
    controller: 'ViewMainCtrl',
    data: {
      requireLogin: true
    }
  });
}])

.controller('ViewMainCtrl', [function() {

}]);
