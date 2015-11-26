'use strict';

angular.module('myApp.viewHome', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'viewHome/viewHome.html',
    controller: 'ViewHomeCtrl',
    data: {
      requireLogin: true
    }
  });
}])

.controller('ViewHomeCtrl', [function() {

}]);
