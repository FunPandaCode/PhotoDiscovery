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
            },
            displayIndex: -1,
            isSelected: false,
            selectedPhoto: function() {
                this.isSelected = true;
            }
        });

        return Photo;
    }
})();
