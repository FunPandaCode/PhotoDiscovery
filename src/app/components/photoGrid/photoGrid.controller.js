(function () {
    'use strict';

    angular
        .module('app.PhotoGrid')
        .controller('PhotoGridController', PhotoGridController);

    PhotoGridController.$inject = ['$scope', 'FlickrService', 'Photo', 'EventManager', '$routeParams', '$log'];

    function PhotoGridController($scope, FlickrSerice, Photo, EventManager, $routeParams, $log) {
        $log.info('PhotoGridController created');

        /* Private
         ---------------------------------------------------- */
        var vm = this;


        /* UI API
         ---------------------------------------------------- */
        vm.images = [];
        vm.isLoading = false;
        vm.selectedPhoto = undefined;
        vm.selectedDate = $routeParams.date;
        vm.selectedPage = $routeParams.page;


        // initialize controller
        init();



        /* Private Funtions
         ---------------------------------------------------- */
        /**
         * Constructor
         */
        function init() {
            // initialize event listeners
            initEventListeners();

            // load images for today
            loadImages(vm.selectedDate, vm.selectedPage);
        }

        /**
         * Initialize Event Listeners
         */
        function initEventListeners() {
            $log.info('PhotoGridController: Initializing event listeners');

            // add listener on selectedPhotoChanged event
            EventManager.addEventListener('selectedPhotoChanged', handleSelectedPhotoChanged);

            // on $destroy, remove all listeners from EventManager
            $scope.$on('$destroy', function() {
                $log.info('PhotoGridController: $destroy executed');
                EventManager.removeEventListener('selectedPhotoChanged', handleSelectedPhotoChanged);
            });
        }

        /**
         * Update selected photo reference on
         * @param event - PhotoSelected event
         * @param p     - with photo param 'p'
         */
        function handleSelectedPhotoChanged(event, newPhoto) {
            $log.info('PhotoGridController: Received selectedPhotoChanged event, updating selected reference');

            // deselect previous photo
            if (!angular.isUndefined(vm.selectedPhoto)) {
                vm.selectedPhoto.isSelected = false;
            }
            // keep a reference of the new selected photo
            vm.selectedPhoto = newPhoto;

            $log.info('PhotoGridController: New selected index is ' + vm.selectedPhoto.displayIndex);
        }



        /* UI API Function Implementation
         ---------------------------------------------------- */
        /**
         * Load images on this
         * @param date - date of which images to be retrieved from
         * @param page - and on this page
         */
        function loadImages(date, page) {
            var p;

            $log.info('PhotoGridController: Loading images for date: ' + date + ' and on page: ' + page);

            // reset images collection
            vm.images = [];
            // show loading indicator
            vm.isLoading = true;

            // retieving image based on date and page
            FlickrSerice
                .loadImages(date, page)
                .then(function (response) {
                    if (response.data.stat === 'ok') {
                        $log.info('PhotoGridController: Got images response');

                        // generate photo object for each photo and add to collection
                        angular.forEach(response.data.photos.photo, function (value, index) {
                            // new photo object based on photo content
                            p = new Photo(value);
                            // update display index of the photo
                            p.displayIndex = index + 1;
                            // add to collection
                            vm.images.push(p);
                        });
                    } else {
                        $log.warn('Response status is not ok');
                        $log.warn(response);
                    }

                }, function (error) {
                    $log.error('Error');
                    $log.error(error);
                })
                .finally(function () {
                    // hide loading indicator
                    vm.isLoading = false;
                });
        }
    }
})();
