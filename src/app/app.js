(function () {
    'use strict';

    angular
        .module('PhotoDiscovery', [
            'ngRoute',
            'ngAnimate',
            'utility.Class',
            'app.PhotoGrid'
        ])
        .value('appName', 'Photo Discovery');
})();
