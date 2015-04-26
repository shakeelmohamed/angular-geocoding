var module = angular.module("GeocodingDemo", []);

// Setup a controller with support for access to scope variables
module.controller("DemoController", function ($scope) {
    $scope.address = $scope.address || "";
    $scope.result = $scope.result || "";

    $scope.doSearch = function(address) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address': address}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                $scope.result = {
                    lat: results[0].geometry.location.lat(),
                    lon: results[0].geometry.location.lng()
                };
            }
            else {
                console.error("Getting geolocation from address failed. Status: ", status);
            }
        });
    };
});