(function () {
    'use strict';

    angular
        .module('app.Menu', [
            'Service.EventManager'
        ])
        .constant('MenuConfig', {
            MAX_DISPLAY_PAGES: 7
        });
})();
