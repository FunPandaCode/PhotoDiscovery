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
                url: '/:date/:page',
                templateUrl: 'components/photoGrid/photoGrid.tpl.html',
                controller: 'PhotoGridController',
                controllerAs: 'PhotoGridCtrl'
            });
    }
})();
