(function () {
    'use strict';

    angular
        .module('app.PhotoGrid')
        .controller('PhotoGridController', PhotoGridController);

    PhotoGridController.$inject = ['$scope', 'FlickrService', 'Photo'];

    function PhotoGridController($scope, FlickrSerice, Photo) {
        var vm = this;
        vm.data = [];
        vm.loadToday = loadImages;
        vm.output = {};
        vm.isLoading = false;

        // initial load orders
        loadImages('2014-11-22', 4);

        /* Private
         ---------------------------------------------------- */

        /* Public
         ---------------------------------------------------- */

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

                    } else {
                        vm.output = response;
                    }

                }, function (error) {
                })
                .finally(function () {
                    vm.isLoading = false;
                });
        }
    }
})();
