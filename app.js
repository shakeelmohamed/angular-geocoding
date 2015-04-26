var module = angular.module("GeocodingDemo", []);

// Setup a controller with support for promises & access to scope variables
module.controller("DemoController", function ($q, $scope) {
    $scope.query = $scope.query || "";
    $scope.result = $scope.result || "";

    $scope.doSearch = function(query) {
        addressToGeolocation(query).then(function(geolocation) {
            $scope.result = geolocation;
        });
    };

    // This function returns a promise
    function addressToGeolocation(address) {
        var deferred = $q.defer();
        
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address': address}, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    deferred.resolve({
                        lat: results[0].geometry.location.lat(),
                        lon: results[0].geometry.location.lng()
                    });
                }
                else {
                    console.error("Getting geolocation from address failed. Status: ", status);
                    deferred.resolve({"error": "geocoding failed"});
                }
                
            }
        );
        return deferred.promise;
    }
});