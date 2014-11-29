(function () {
    'use strict';

    angular.module('PhotoDiscovery')
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

    /*
    function () {
        function Photo(photoData) {
            if (photoData) {
                this.initPhoto(photoData);
            }
            this.test = 1;
        }

        Photo.prototype = {
            initPhoto: function(photoData) {
                angular.extend(this, photoData);
            }
        };

        return Photo;
    }*/
})();
