(function () {
    'use strict';

    angular
        .module('app.Menu')
        .directive('datePicker', DatePicker);

    DatePicker.$inject = ['$location', '$route', '$log'];

    function DatePicker($location, $route, $log) {
        $log.info('DatePicker created');

        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'components/menu/datepicker.tpl.html',
            link: link
        };

        function link(scope, element, attributes) {
            // Note: $routeParams at this point does not get updated yet so it's just and empty object.
            //       So in order to retrieve the params in case user refresh the browser, $route.current.params
            //       is the other option.
            // if route params date does not exists then initialize using today's date
            // this happens when users load the index page (default route)
            if ($route.current.params.date === undefined) {
                // Initialize scope.selectedDate to first available date
                scope.selectedDate = new Date().format('Y\\-m\\-d');
                // change location path on this initial selection
                $log.info('DatePicker: initial path "/' + new Date().format('Y\\-m\\-d') + '/1"');
                $location.path('/' + scope.selectedDate + '/1');

                return;
            } else {
                // initialize selected date with params.date
                // most likely user refresh browser with the current route and its existing params
                // in this case we want to config the date picker with the date param
                scope.selectedDate = $route.current.params.date;
            }

            /**
             * $('.input-group.date') === element param
             *
             * element is the content inside templateUrl and since $('.input-group.date') returns the same content
             * hence both are the same.  Element is the jqLite-wrapped element that this directive matches.
             * "If jQuery is available, angular.element is an alias for the jQuery function. If jQuery is not
             * available, angular.element delegates to Angular's built-in subset of jQuery, called "jQuery lite"
             * or "jqLite.""
             */
            // link up the date picker boostrap to element
            // since selectedDate is binding to text input, it will automatic select date in the date picker
            element.datepicker({
                format: 'yyyy-mm-dd',
                todayHighlight: true,
                autoclose: true,
                orientation: 'top auto',
                todayBtn: 'linked'
            });

            // set the date picker to select intialized date
            element.datepicker('update', scope.selectedDate);

            // on date changed, update scope's selectedDate and path
            element.on('changeDate', function(e) {
                var date;

                // if user de-select current selected date which will resulted in undefined
                // to fix set selected to last selected, since 'update' does not dispatch changedDate we won't
                // run into infinite loop
                if (e.date === undefined) {
                    // reset datepicker to last selected date
                    // no need to dispatch event since we just reselect same date as before
                    element.datepicker('update', scope.selectedDate);
                } else {
                    // e.date is a string, create new date object from it for easy parsing
                    date = new Date(e.date);

                    // apply to our scope variable and switch location path
                    // must be inside $apply since link element.on() is outside of angularjs' environment
                    scope.$apply(function() {
                        scope.selectedDate = date.format('Y\\-m\\-d');
                        $location.path('/' + scope.selectedDate + '/1');
                    });
                }
            });
        }
    }
})();
