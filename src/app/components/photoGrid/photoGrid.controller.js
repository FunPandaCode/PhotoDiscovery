(function () {
    'use strict';

    angular
        .module('app.PhotoGrid')
        .controller('PhotoGridController', PhotoGridController);

    PhotoGridController.$inject = ['$scope', 'FlickrService', 'Photo'];

    function PhotoGridController($scope, FlickrSerice, Photo) {
        var vm = this;
        vm.images = [];
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
            var p,
                i = 0;

            vm.images = [];
            vm.isLoading = true;

            FlickrSerice
                .loadImages(date, page)
                .then(function (response) {
                    if (response.data.stat === 'ok') {
                        // generate photo object for each photo and add to collection
                        angular.forEach(response.data.photos.photo, function (value, index) {
                            // increment i for photo display index
                            i++;
                            // new photo object based on photo content
                            p = new Photo(value);
                            // update display index of the photo
                            p.displayIndex = i;
                            // add to collection
                            vm.images.push(
                                p
                            );
                        });
                        vm.output = vm.images;

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
