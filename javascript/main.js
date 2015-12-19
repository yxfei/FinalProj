var selectCategory;

    $('#cafe').on('click', selectCafe);
    function selectCafe() {
      selectCategory = 'cafe';
      initMap;
    }
    $('#museum').on('click', selectMuseum);
    function selectMuseum() {
      selectCategory = 'museum';
      initMap;
    }
    $('#park').on('click', selectPark);
    function selectPark() {
      selectCategory = 'park';
      initMap;
    }


var initMap = (function() {

    var map;


    function initMap() {
        var myLatLng;

        map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 40.7127,
                lng: 74.0059
            },
            zoom: 16
        });
        var infoWindow = new google.maps.InfoWindow({
            map: map
        });

        navigator.geolocation.getCurrentPosition(function(position) {
            var coor = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
            currentLocation = new google.maps.LatLng(
                coor.lat,
                coor.lng);

            map.setCenter(currentLocation);

            infoWindow.setPosition(currentLocation);
            infoWindow.setContent('You are here');

            var service = new google.maps.places.PlacesService(map);
            service.nearbySearch({
                location: coor,
                radius: 2000,
                types: ['museum']
            }, callback);

        }, function() {
            browserSupportFlag = false;
            handleNoGeolocation(browserSupportFlag);
        });
    }


    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
    }

    function callback(results, status) {
        console.log('results', results);
        console.log('status', status);
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
        }
    }

    function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });
        var infowindow = new google.maps.InfoWindow({
             map: map
        });
        //infowindow.setPosition(placeLoc);

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(place.name);
            infowindow.open(map, this);
        });
    }
    return initMap
})();
