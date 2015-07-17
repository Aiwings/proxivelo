angular.module('proxivelo.services')

.factory('mapService', function (uiGmapGoogleMapApi,uiGmapIsReady) {

    var mapService = {
		
		
        setLatlng: function (point) {         
            return new google.maps.LatLng(point.latitude, point.longitude);
		},
		
        drawPoly :  function(path) {
      
            var poly = new google.maps.Polyline({
                path: path, geodesic: true,
                strokeColor: '#6060FB',
                strokeOpacity: 1.0,
                strokeWeight: 3
            });

            uiGmapIsReady.promise().then(function (instances) {            
                angular.forEach(instances, function (value, key) {
                    var maps = value.map;
                   
                    poly.setMap(maps);     
                });

            });
       
        },
        toMark : function (point, id) {

            var mark = {
                id: id,
                latitude: point.latitude,
                longitude: point.longitude,
                title: point.date,
                show: false
            };

            mark.onClick = function () {
                console.log("Clicked!");
                mark.show = !mark.show;
            };
            return mark;
        }
			
		
			
	};
    return mapService;
});
