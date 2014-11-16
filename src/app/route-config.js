(function () {
    'use strict';

    angular
        .module('PhotoDiscovery')
        .config(config);

    function config($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'index.html'
        });
    }
})();
