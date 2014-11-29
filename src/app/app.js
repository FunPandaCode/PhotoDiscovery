(function () {
    'use strict';

    angular.module('PhotoDiscovery', [
        'ngRoute',
        'ngAnimate',
        'utility.Class',
        'Flickr'
    ])
    .value('appName', 'Photo Discovery');
})();
