(function () {
    'use strict';

    angular
        .module('PhotoDiscovery')
        .config(config);

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'components/photoGrid/photoGrid.tpl.html',
                controller: 'PhotoGridController',
                controllerAs: 'PhotoGridCtrl'
            })
            .state('grid', {
                url: '/{date:[0-9]{4}-[0-9]{2}-[0-9]{2}}/{page:int}',
                templateUrl: 'components/photoGrid/photoGrid.tpl.html',
                controller: 'PhotoGridController',
                controllerAs: 'PhotoGridCtrl'
            });
    }
})();
