(function () {
    'use strict';

    angular
        .module('app.PhotoGrid')
        .controller('PhotoGridController', PhotoGridController);

    PhotoGridController.$inject = ['$scope', 'FlickrService', 'Photo', 'EventManager'];

    function PhotoGridController($scope, FlickrSerice, Photo, EventManager) {
        /* Private
         ---------------------------------------------------- */
        var vm = this;



        /* UI API
         ---------------------------------------------------- */
        vm.images = [];
        vm.loadToday = loadImages;
        vm.output = {};
        vm.isLoading = false;
        vm.selectedPhoto = undefined;



        /* Init - Constructor
         ---------------------------------------------------- */
        // initialize event listeners
        initEventListeners();
        // initial load of images
        loadImages('2014-11-22', 4);



        /* Private Funtions
         ---------------------------------------------------- */
        /**
         * Initialize Event Listeners
         */
        function initEventListeners() {
            // Update selected photo reference on PhotoSelected event
            EventManager.addEventListener('PhotoSelected', function (p){
                // deselect previous photo
                if (!angular.isUndefined(vm.selectedPhoto)) {
                    vm.selectedPhoto.isSelected = false;
                }
                // keep a reference of the new selected photo
                vm.selectedPhoto = p;

                console.log(vm.selectedPhoto.displayIndex);
            });
        }



        /* UI API Function Implementation
         ---------------------------------------------------- */
        /**
         * Load images on this
         * @param date - date of which images to be retrieved from
         * @param page - and on this page
         */
        function loadImages(date, page) {
            var p,
                i = 0;

            // reset images collection
            vm.images = [];
            // show loading indicator
            vm.isLoading = true;

            // retieving image based on date and page
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
                    // hide loading indicator
                    vm.isLoading = false;
                });
        }
    }
})();
