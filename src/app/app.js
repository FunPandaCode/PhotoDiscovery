(function () {
    'use strict';

    angular
        .module('PhotoDiscovery', [
            'ngRoute',
            'ngAnimate',,
            'app.PhotoGrid'
        ])
        .value('appName', 'Photo Discovery');
})();
