(function () {
    'use strict';

    angular
        .module('app.Models')
        .factory('Photo', PhotoClass);

    PhotoClass.$inject = ['Class'];

    function PhotoClass(Class) {
        var Photo = Class.extend({
            init: function(photoData) {
                angular.extend(this, photoData);
            }
        });

        return Photo;
    }
})();
