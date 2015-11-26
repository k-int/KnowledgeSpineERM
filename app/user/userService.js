'use strict';

angular.module('myApp.services', [])
    /**
     * @ngDoc service
     * @name UserService
     * @description A service that takes responsibility for storing / retrieving the currently logged in user object.
     * The state is held in local storage, when a user is logged in, it is stuffed into local storage and when logged
     * out, removed from local storage.
     */
    .service('UserService', ['$log', '$window', function($log, $window) {

        /**
         * @ngDoc method
         * @name login
         * @methodOf UserService
         * @param user {Object} the user object.
         * @returns {Object} the user object.
         * @description login a user.
         */
        this.login = function(user) {
            $window.localStorage.currentUser = JSON.stringify(user);

            // TODO: this seems a little unnecessary, can probably just return user.
            return JSON.parse($window.localStorage.currentUser);
        }

        /**
         * @ngDoc method
         * @name currentUser
         * @methodOf UserService
         * @returns {Object} the user object or null.
         * @description get the current user object.
         */
        this.currentUser = function() {
            console.log("Parsing local storage current user");
            var user = JSON.parse($window.localStorage.currentUser);
            return user;
        };

        /**
         * @ngDoc method
         * @name logout
         * @methodOf UserService
         * @description logout the current user.
         */
        this.logout = function() {
            delete $window.localStorage.currentUser;
        }

        this.update = function(user) {
            $window.localStorage.currentUser = JSON.stringify(user);
        }
    }]);
