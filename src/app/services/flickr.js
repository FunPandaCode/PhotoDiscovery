(function () {
    'use strict';

    angular.module('Flickr',[])
    .constant('apiKey','d3cd65fd63215f94c2b9c4ea2a935928')
    .constant('apiSecret', 'e9027d0e08205c45')
    .constant('flickrRestUrl', 'https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&extras=url_s%2Curl_c%2Curl_l%2C&per_page=20&format=json&nojsoncallback=1')
    .service('FlickrService', FlickrService);

    FlickrService.$inject = ['$http', '$q', 'apiKey', 'flickrRestUrl'];

    function FlickrService($http, $q, apiKey, flickrRestUrl) {
        // ---
        // API
        // ---
        this.loadImages = loadImages;

        // ---
        // PUBLIC METHODS.
        // ---

        function loadImages(date, page) {
            var deferred = $q.defer();

            $http({
                cache: true,
                method: 'get',
                url: [flickrRestUrl, '&api_key=', apiKey,'&date=', date, '&page=', page].join('')
            }).success(function (data, status, headers, config) {
                deferred.resolve({
                    error: 0,
                    status: status,
                    data: data
                });
            }).error(function (data, status, headers, config) {
                deferred.reject({
                    error: -1,
                    status: status,
                    data: data
                });
            });

            return deferred.promise;
        }
    }
})();
