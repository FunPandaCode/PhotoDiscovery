(function () {
    'use strict';

    angular
        .module('PhotoDiscovery')
        .controller("testCtrl", TestController);

    TestController.$inject = ['$scope', 'FlickrService', 'Photo'];

    function TestController($scope, FlickrSerice, Photo) {
        var vm = this;
        vm.data = [];
        vm.loadToday = loadImages;
        vm.output = {};
        vm.isLoading = false;

        // initial load orders
        loadImages('2014-11-22', 4);

        // ---
        // PRIVATE METHODS.
        // ---

        // ---
        // PUBLIC METHODS.
        // ---

        function loadImages(date, page) {
            vm.data = [];
            vm.isLoading = true;

            FlickrSerice
                .loadImages(date, page)
                .then(function (response) {
                    if (response.data.stat === 'ok') {
                        angular.forEach(response.data.photos.photo, function (value, index) {
                            vm.data.push(
                                new Photo(value)
                            );
                        });
                        vm.output = vm.data;
                    } else { // stat === 'fail'
                        vm.output = response;
                    }

                }, function (error) {
                })
                .finally(function() {
                    vm.isLoading = false;
                });
        }
    }
})();
