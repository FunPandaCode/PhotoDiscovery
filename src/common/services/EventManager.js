/**
 * Event Manager based from EventDispatcher of @trochette's Advanced Design Patterns and Best Practices
 * https://github.com/trochette/Angular-Design-Patterns-Best-Practices
 */
(function () {
    angular
        .module('Service.EventManager', [])
        .service('EventManager', EventManager);

    function EventManager() {
        /* Private
         ---------------------------------------------------- */
        var _listeners = {};



        /* Service API
         ---------------------------------------------------- */
        /**
         * Add new event listener based on
         * @param type      - event type
         * @param listener  - using listener's function
         */
        this.addEventListener = function addEventListener(type, listener) {
            // add new event type to collection if there is no registration
            if (!_listeners[type]) {
                _listeners[type] = [];
            }

            // add listener's function to collection under event type
            _listeners[type].push(listener);
        };

        /**
         * Remove registered listener
         * @param type      - under this event type
         * @param listener  - for this listener
         */
        this.removeEventListener = function removeEventListener(type,listener) {
            // if event type exists then proceed with the removal
            if (_listeners[type]) {
                // get index for performing array's splice
                var index = _listeners[type].indexOf(listener);
                // remove from collection if index is valid
                if (index !== -1) {
                    _listeners[type].splice(index, 1);
                }
            }
        };

        /**
         * Dispatch event for specified event and pass any provided data to the listener
         */
        this.dispatchEvent = function dispatchEvent() {
            var listeners;

            // first argument must be string, this first argument is the event type
            if(typeof arguments[0] !== 'string'){
                console.warn('EventManager','First params must be an event type (String)');
            }else{
                // retrieve all listeners for this event type
                listeners = _listeners[arguments[0]];

                // apply each listener's function and pass along the data in this event
                for(var key in listeners){
                    //This could use .apply(arguments) instead, but there is currently a bug with it.
                    listeners[key](arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]);
                }
            }
        };
    }
})();
