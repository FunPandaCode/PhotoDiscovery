(function () {
    'use strict';

    angular
        .module('Service.Underscore', [])
        .factory('_', function() {
            return window._;
        });
})();
