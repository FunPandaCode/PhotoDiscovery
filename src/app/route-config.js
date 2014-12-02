(function () {
    'use strict';

    angular
        .module('PhotoDiscovery')
        .config(config);

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'src/app/components/photoGrid/photoGrid.tpl.html',
                controller: 'PhotoGridController',
                controllerAs: 'PhotoGridCtrl'
            });
    }
})();
