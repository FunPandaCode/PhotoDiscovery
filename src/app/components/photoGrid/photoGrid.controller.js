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
        var MAX_DISPLAY_PAGES = 5;


        /* UI API
         ---------------------------------------------------- */
        vm.images = [];
        vm.isLoading = false;
        vm.selectedPhoto = undefined;
        vm.selectedDate = $routeParams.date;
        vm.selectedPage = $routeParams.page;
        vm.displayMode = 'thumbnail';
        vm.pages = [];
        vm.currentPage = 1;
        vm.totalPages = 25;


        // initialize controller
        init();



        /* Private Funtions
         ---------------------------------------------------- */
        /**
         * @Constructor
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

        /**
         * Initialize the pagination using currentPage and totalPages in the calculation
         */
        function initPagination() {
            var startingPage,
                pageCount;

            // if totalPages is not valid then reset
            if (vm.totalPages === undefined || (typeof vm.totalPages !== 'number')) {
                vm.pages = [];
                vm.currentPage = 0;
                vm.totalPages = 0;
                return;
            }

            // total pages less than max number of display pages then show from page 1 to whatever
            // total pages is
            if (vm.totalPages <= MAX_DISPLAY_PAGES) {
                startingPage = 1;
                pageCount = vm.totalPages;
            }
            // determine the pages to be displayed when we have more than max display number of pages
            else {
                // current page is >= 4 then we want the current page to be in the middle,
                // with the exception that if current page >= total pages minus 2.  This is prevent displaying
                // pages that do not exist if we followed the current page to be in the middle guideline
                if (vm.currentPage >= 4) {
                    startingPage = (vm.currentPage >= vm.totalPages - 2) ? vm.totalPages - 4 : vm.currentPage - 2;
                    pageCount = MAX_DISPLAY_PAGES;
                }
                // current page is < 4 then display page 1 to max display pages, this is to prevent displaying page 0
                // or less.
                else {
                    startingPage = 1;
                    pageCount = MAX_DISPLAY_PAGES;
                }
            }

            // populate the pages array
            populatePagination(startingPage, pageCount);
        }

        /**
         * Populate pagination with supplied
         * @param startingValue -   starting page value
         * @param nTime         -   ending n-1 count from starting page
         */
        function populatePagination(startingValue, nTime) {
            var count = 0;
            vm.pages = [];
            do {
                vm.pages.push(startingValue + count);
                count++;
            }
            while (count < nTime);
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
            // reset pagination
            vm.totalPages = 0;
            initPagination();

            // show loading indicator
            vm.isLoading = true;

            // retieving image based on date and page
            FlickrSerice
                .loadImages(date, page)
                .then(function (response) {
                    if (response.data.stat === 'ok') {
                        $log.info('PhotoGridController: Got images response');

                        // generate pagination based on currentPage and totalPages
                        vm.currentPage = response.data.photos.page;
                        vm.totalPages = response.data.photos.pages;
                        initPagination();

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
