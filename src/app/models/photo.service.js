(function () {
    'use strict';

    angular
        .module('app.Models')
        .factory('Photo', Photo);

    Photo.$inject = ['Class'];

    function Photo(Class) {
        var Photo = Class.extend({
            init: function(photoData) {
                angular.extend(this, photoData);
            }
        });

        return Photo;
    }
})();
