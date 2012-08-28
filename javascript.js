$(function() {

  var geocoder;
  var map;

  function isNotFloat(n) {
    return n % 1 === 0;
  }

  function initialize() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
      zoom: 14,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    google.maps.event.addListener(map, "click", function(event) {
      $("#lat").text("LAT: " + event.latLng.lat());
      $("#lon").text("LON: " + event.latLng.lng());
    });
  }

  function codeAddress(address) {
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
        $("#lat").text("LAT: " + results[0].geometry.location.Xa);
        $("#lon").text("LON: " + results[0].geometry.location.Ya);
      }
    });
  }

  function codeLatLng(input) {
    var latlngStr = input.split(" ",2);
    var lat = parseFloat(latlngStr[0]);
    var lng = parseFloat(latlngStr[1]);
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          map.setZoom(11);
          marker = new google.maps.Marker({
              position: latlng,
              map: map
          });
          infowindow.setContent(results[1].formatted_address);
          infowindow.open(map, marker);
        }
      } else {
        alert("Geocoder failed due to: " + status);
      }
    });
  }


  $("#string").live("click", function(){
    $(this).val("");
  });

  $("#search_form").submit(function(){

    var data = $("#string").val();

    initialize();

    if ( isNaN(data.replace(/ /g,'')) ) {
      codeAddress(data);
    } else {
      codeLatLng(data);
    }
    
    $("#map_coordinates").css("display", "block");
    $("#map_canvas").css("display", "block");

    return false;
  });



});

$(document).ready(function(){
  $("#string").focus();
});