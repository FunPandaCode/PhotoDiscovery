(function () {
    'use strict';

    angular
        .module('app.Menu')
        .directive('pagination', Pagination);

    Pagination.$inject = ['MenuConfig', 'EventManager', '$location', '$routeParams', '$log'];

    function Pagination(MenuConfig, EventManager, $location, $routeParams, $log) {
        $log.info('Pagination created');

        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'components/menu/pagination.tpl.html',
            link: link
        };

        function link(scope, element, attributes) {
            /* Private
             ---------------------------------------------------- */
            var startingPage,
                pageCount,
                count,
                middlePageIndex;


            /* UI API
             ---------------------------------------------------- */
            scope.totalPages = 0;
            scope.pages = null;
            scope.currentPage = 0;
            scope.currentDate = '';
            scope.onPageCliced = onPageClicked;
            scope.onPreviousPageClicked = onPreviousPageClicked;
            scope.onNextPageClicked = onNextPageClicked;


            // initialize link
            init();



            /* ////////////////////////////////////////// */



            /**
             * @Constructor
             */
            function init() {
                // init element in a hidden state
                element.hide();

                // add listener on selectedPhotoChanged event
                EventManager.addEventListener('newPhotosLoaded', constructPagination);

                // On $destroy, clean up resources
                scope.$on('$destroy', function() {
                    $log.info('Pagination: clean up on $destroy');

                    EventManager.removeEventListener('newPhotosLoaded', constructPagination);
                });
            }

            /**
             * Construct the array for ng-repeat to display the list of pages.
             *
             * @param event - event related
             * @param totalPages - the total pages in selected date, use to determine the last pages in the list
             */
            function constructPagination(event, totalPages) {
                if (angular.isDefined($routeParams.page) && angular.isDefined($routeParams.date)) {
                    $log.info('Pagination: set up current page and date');
                    // set current page and date from route params
                    scope.currentPage = parseInt($routeParams.page);
                    scope.currentDate = $routeParams.date;

                    // only interesting in total pages > 0
                    if(!isNaN(totalPages) && totalPages > 0){
                        $log.info('Pagination: update total page');
                        scope.totalPages = totalPages;

                        // every time totalPages changed reset array and count
                        scope.pages = new Array(MenuConfig.MAX_DISPLAY_PAGES);
                        count = 0;

                        // total pages less than max number of display pages then show from page 1 to whatever
                        // total pages is
                        if (scope.totalPages <= MenuConfig.MAX_DISPLAY_PAGES) {
                            startingPage = 1;
                            pageCount = scope.totalPages;
                        }
                        // determine the pages to be displayed when we have more than max display number of pages
                        else {
                            // the index of middle page within MAX_DISPLAY_PAGES
                            middlePageIndex = parseInt((MenuConfig.MAX_DISPLAY_PAGES/2) + (MenuConfig.MAX_DISPLAY_PAGES%2));

                            // if current page > page 1 to middle page, the current page must be in the middle
                            if (scope.currentPage > middlePageIndex) {
                                if (scope.currentPage > scope.totalPages - middlePageIndex) {
                                    startingPage = scope.totalPages - MenuConfig.MAX_DISPLAY_PAGES + 1;
                                } else {
                                    startingPage = scope.currentPage - middlePageIndex + 1;
                                }
                                pageCount = MenuConfig.MAX_DISPLAY_PAGES;
                            }
                            // current page is <= middlePageIndex then display page 1 to max display pages, this is to
                            // prevent displaying page 0 or less.
                            else {
                                startingPage = 1;
                                pageCount = MenuConfig.MAX_DISPLAY_PAGES;
                            }
                        }

                        $log.info('Pagination: populate pages');
                        // populate all the pages
                        do {
                            scope.pages[count] = startingPage + count;
                            count++;
                        }
                        while (count < pageCount);

                        // it's time to show the element
                        element.show();
                    }
                }
            }

            /**
             * Change location path to clicked page
             *
             * @param page - page number selected by user
             */
            function onPageClicked(page) {
                //element.hide();
                $location.path('/' + scope.currentDate + '/' + page);
            }

            /**
             * Change location path to previous page from current page
             */
            function onPreviousPageClicked() {
                if (scope.currentPage > 1) {
                    //element.hide();
                    $location.path('/' + scope.currentDate + '/' + (scope.currentPage - 1));
                }
            }

            /**
             * Change location path to next page from current page
             */
            function onNextPageClicked() {
                if (scope.currentPage > 0 && scope.currentPage < scope.totalPages) {
                    //element.hide();
                    $location.path('/' + scope.currentDate + '/' + (scope.currentPage + 1));
                }
            }
        }
    }
})();
