window.onload = function() {

//  initializeMap();

};

// add action=init
function loginAttempt(statement) {
  var xmlhttp;
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  xmlhttp.onreadystatechange = function() {
    //connection is good and status is okay;
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var response = xmlhttp.responseText;
      var elem = document.getElementById('main');
      elem.innerHTML = response;
      accountAccessListeners();
    }
  };
  
  var url = "login.php?";
  xmlhttp.open("GET",url + statement,true);
  xmlhttp.send();
  
}

function accountAccessListeners() {
  document.getElementById('loginUser').addEventListener('click', attemptLogin);
  document.getElementById('newAccount').addEventListener('click', makeNewAccount);
}

function hideLogin() {
  var deleteMe = document.getElementById('loginChild');
  deleteMe.parentElement.removeChild(deleteMe); 
  
}

function attemptLogin() {
  var statement = 'action=login';
  loginAttempt(statement);  
  console.log("hello");
}

function makeNewAccount () {
  var statement = 'action=makeNew';
  loginAttempt(statement);
  console.log("makeNew");
}

function initializeLogin() {
  loginAttempt('action=init');
}

function displayNearest() {
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    // x.innerHTML = "Geolocation is not supported by this browser.";
  }  
}


function showPosition(position) { 
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;
  initializeMap(lat,lng);
}

/*
var map;
function initializeMap() {
  var mapOptions = {
    zoom: 6
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  
  // try HTML5 geolocations
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      
      var infowindow = new google.maps.InforWindow({
        map: map,
        position: pos,
        content: 'Location found using HTML5'
      });
      
      map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // browserr doesn't support geolocation
    handleNoGeolocation(false);
  }
}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support Geolocation.';
  }
  var options = {
    map: map,
    position: new google.maps.LatLng(60,105),
    content: content
  };
  
  var infowindow = new googlemaps.InfoWindow(options);
  map.setCenter(options.position);
  }
  
google.maps.event.addDomListener(window, 'load', initializeMap);
*/


var map;
function initialize() {
  var latlng = new google.maps.LatLng(-34.397, 150,644);
  var mapOptions = {
    zoom: 8,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById('map-container'),
      mapOptions);
}

google.maps.event.addDomListener(window, "load", initialize);






