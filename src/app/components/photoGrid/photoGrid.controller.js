(function () {
    'use strict';

    angular
        .module('app.PhotoGrid')
        .controller('PhotoGridController', PhotoGridController);

    PhotoGridController.$inject = ['$scope', 'FlickrService', 'Photo', 'EventManager', '$stateParams', '$location', '$log'];

    function PhotoGridController($scope, FlickrSerice, Photo, EventManager, $stateParams, $location, $log) {
        $log.info('PhotoGridController created');

        /* Private
         ---------------------------------------------------- */
        var vm = this,
            deregFunc;


        /* UI API
         ---------------------------------------------------- */
        vm.images = [];
        vm.isLoading = false;


        // initialize controller
        init();



        /* ////////////////////////////////////////// */



        /**
         * @Constructor
         */
        function init() {
            $log.info('PhotoGridController: Initializing event listeners');

            // load images once route changed successfully
            deregFunc = $scope.$on('$stateChangeSuccess', function () {
                $log.info('PhotoGridController: $stateChangeSuccess');

                if(angular.isDefined($stateParams.date) && angular.isDefined($stateParams.page)){
                    // load images
                    loadImages($stateParams.date, $stateParams.page);
                }
            });

            // clean up resources on $destroy
            $scope.$on('$destroy', function() {
                $log.info('PhotoGridController: $destroy');

                // $routeChangeSuccess deregistration function
                deregFunc();
            });
        }

        /**
         * Load images on this
         * @param date - date of which images to be retrieved from
         * @param page - and on this page
         */
        function loadImages(date, page) {
            $log.info('PhotoGridController: Loading images for date: ' + date + ' and on page: ' + page);

            // TODO: if response.status !== 200, then show a message to user
            // TODO: if response.data.stat === 'fail', then show a message to user saying no interesting photos are available for that date

            // reset images collection
            vm.images = null;
            // reset pagination
            vm.totalPages = 0;

            // show loading indicator
            vm.isLoading = true;

            // retieving image based on date and page
            FlickrSerice
                .loadImages(date, page)
                .then(function (response) {
                    if (response.data.stat === 'ok') {
                        $log.info('PhotoGridController: Got images response');

                        // if result returned a different page then $stateParams, that means user entered a page greater
                        // than the total pages for selected date.  If that is the case then redirect to last page.
                        if(parseInt(response.data.photos.page) < page) {
                            $location.path('/' + date + '/' + response.data.photos.page);
                            return;
                        }

                        // dispatch a new set of pages
                        EventManager.dispatchEvent('newPhotosLoaded', parseInt(response.data.photos.pages));

                        // generate photo object for each photo and add to collection
                        vm.images = response.data.photos.photo.map(function(item, index) {
                            var p = new Photo(item);
                            p.displayIndex = index;

                            return p;
                        });
                    } else {
                        EventManager.dispatchEvent('newPhotosLoaded', 0);
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
