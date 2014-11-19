(function () {
    'use strict';

    angular.module('PhotoDiscovery', [
        'ngRoute',
        'ngAnimate',
        'Underscore',
        'Flickr'
    ])
    .value('appName', 'Photo Discovery');
})();
