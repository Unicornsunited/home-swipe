(() => {
    angular.module('houses.data')
    .factory('property', function($http, $q) {
        function getProperty(_url, _data) {
            var data = {
                    api_key: "gndny3sqrvsgx483wpamyqe4",
                    callback: "JSON_CALLBACK"
                },
                url = "/api/";

            angular.extend(data, _data);

            url = url + _url + ".json";

            var def = $q.defer();

            $http({
                    'url': url,
                    'method': 'GET',
                    'params': data
                })
                .success(function(data) {
                    def.resolve({
                        'status': 'success',
                        'data': data
                    });
                });

            return def.promise;
        }

        function getListing(_data) {
            return getProperty("property_listings", {
                postcode: 'sw4',
                area: 'London',
                listing_status: 'rent',
                minimum_price: 50,
                maximum_price: 500,
                order_by: 'age',
                page_size: 60
            });
        }

        function getHouse(id) {
            return getProperty("property_listings", {
                listing_id: id
            });
        }

        return {
            getListing: getListing,
            getHouse: getHouse
        };
    });
})();