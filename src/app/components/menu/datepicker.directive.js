(function () {
    'use strict';

    angular
        .module('app.Menu')
        .directive('datePicker', DatePicker);

    DatePicker.$inject = ['$location', '$stateParams', '$log'];

    function DatePicker($location, $stateParams, $log) {
        $log.info('DatePicker created');

        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'components/menu/datepicker.tpl.html',
            link: link
        };

        function link(scope, element, attributes) {
            var deregFunc;

            // init datepicker
            element.datepicker({
                format: 'yyyy-mm-dd',
                todayHighlight: true,
                autoclose: true,
                orientation: 'top auto',
                todayBtn: 'linked'
            });


            /** EVENTS */


            /**
             * On route change success, update datepicker's selected date to the same value as $stateParams.date
             * Returns deregistration function for $destroy event
             *
             * @type {function()|*}
             */
            deregFunc = scope.$on('$stateChangeSuccess', function () {
                $log.info('datepicker: $stateChangeSuccess');


                if(angular.isDefined($stateParams.date)){
                    scope.selectedDate = $stateParams.date;

                    // set the date picker to $stateParams.date
                    // note: this does not fire changeDate event hence no infinite loop
                    element.datepicker('update', scope.selectedDate);
                } else {
                    // Initialize scope.selectedDate to first available date
                    scope.selectedDate = new Date().format('Y\\-m\\-d');
                    // change location path on this initial selection
                    $log.info('DatePicker: initial path "/' + scope.selectedDate + '/1"');
                    $location.path('/' + scope.selectedDate + '/1');
                }
            });


            /**
             * on date changed by user, change location path to selected date so router can do its things
             */
            element.on('changeDate', function(e) {
                var date;
                $log.info('DatePicker: changeDate');

                // if user de-select current selected date which will resulted in undefined
                // to fix set selected to last selected, since 'update' does not dispatch changedDate we won't
                // run into infinite loop
                if (e.date === undefined) {
                    // reset datepicker to last selected date
                    // no need to dispatch event since we just reselect same date as before
                    element.datepicker('update', scope.selectedDate);
                } else {
                    // e.date is a string of a full date but we only need yyyy-mm-dd, create new date object
                    // from it for easy parsing
                    date = new Date(e.date);

                    // must be inside $apply since link element.on() is outside of angularjs' environment
                    scope.$apply(function() {
                        // change path to the new selected date
                        // note: will hit $routeChangeSuccess above so we don't need to set
                        // scope.selectedDate and element.datepicker('update', scope.selectedDate);
                        $location.path('/' + date.format('Y\\-m\\-d') + '/1');
                    });
                }
            });


            /**
             * On $destroy event, clean up resources
             */
            scope.$on('$destroy', function() {
                $log.info('DatePicker: $destroy');

                // $routeChangeSuccess deregistration function
                deregFunc();
            });
        }
    }
})();
