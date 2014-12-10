(function () {
    'use strict';

    angular
        .module('PhotoDiscovery', [
        /**
         * HTML templates
         */
            'appTemplates',
            'commonTemplates',

        /**
         * Angular Modules
         */
            'ngRoute',
            'ngAnimate',

        /**
         * Application Modules
         */
            'app.PhotoGrid',
            'app.Menu'
        ])
        .value('appName', 'Photo Discovery');
})();
