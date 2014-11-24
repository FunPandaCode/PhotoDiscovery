(function () {
    'use strict';

    angular.module('PhotoDiscovery')
    .factory('Photo', function () {
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
    });
})();
