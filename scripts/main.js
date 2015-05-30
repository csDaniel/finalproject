window.onload = function() {

  document.getElementById('userMenu').addEventListener('click',initializeLogin);
  document.getElementById('startSearch').addEventListener('click', calcRoute);
  initializeMap();
  
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
      // loginSpace
      var elem = document.getElementById('loginSpace');
      elem.innerHTML = response;
      accountAccessListeners();
    }
  };
  
  var url = "login.php?";
  xmlhttp.open("GET",url + statement,true);
  xmlhttp.send();
  
}

// deprecated?
function accountAccessListeners() {
  //document.getElementById('loginStart').addEventListener('click', attemptLogin);
  //document.getElementById('newAccount').addEventListener('click', makeNewAccount);
  //var hideLogin = document.getElementById('hideLoginDiv');
  //if (hideLogin) {
 // document.getElementById('hideLoginDiv').addEventListener('click', hideLogin);
 // document.getElementById('userLogoutSelect').addEventListener('click', logout);
}

function hideMenu() {
  var deleteMe = document.getElementById('userChild');
  deleteMe.parentElement.removeChild(deleteMe); 
  console.log("test");  
}

// will be deprecated?
function makeNewAccount () {
  var statement = 'action=makeNew';
 // loginAttempt(statement);
  console.log("makeNew");
}

function initializeLogin () {
  var statement = 'action=menu';
  loginAttempt(statement);
}

function logout() {
  hideMenu();
  var statement = 'action=logout';
  loginAttempt(statement);
}

function reloadPage() {
  location.reload();
}

function addNewBathroom() {
  var currentLat = document.getElementById('originLat').innerHTML;
  var currentLon = document.getElementById('originLon').innerHTML;
  
  var statement = 'action=addNewBathroomRequest';
  statement += '&currentLat=' + currentLat;
  statement += '&currentLon=' + currentLon;
  loginAttempt(statement);
  
}

function deleteMenu() {
  var statement = 'action=deleteMenu';
  loginAttempt(statement);
}

function deleteBathroom() {
  var bathId = this.id;
  console.log(bathId);
  //hideMenu();
}


// regarding lat/lon
function findNearestJSON(statement) {
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
      var elem = document.getElementById('locationData');
      elem.innerHTML = response;
    }
  };
  
  var url = "login.php?";
  xmlhttp.open("POST",url + statement,true);
  xmlhttp.send();  
}  


// map stuff
var map;
var innerMap = document.getElementById('mapContainer');
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
// var stepDisplay;

function initializeMap() {
  directionsDisplay = new google.maps.DirectionsRenderer();
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    innerMap.innerHTML = "Geolocation is not supported by this browser";  
  }

  var latlng = new google.maps.LatLng(localStorage.getItem("curLat"), localStorage.getItem("curLon"));
  var mapOptions = {
    zoom: 17,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById('mapContainer'), mapOptions);
  directionsDisplay.setMap(map);
      

}

function showPosition(position) {
  // access to users lat/long can be found here.
  var currentLat = position.coords.latitude;
  var currentLon = position.coords.longitude;
  var statement = 'action=init';
  statement += '&currentLat=' + currentLat;
  statement += '&currentLon=' + currentLon;
  
  findNearestJSON(statement);
}

// HERE BE PLUGIN ATTEMPT 
 
function calcRoute() {
  
  var originLan = document.getElementById('originLat').innerHTML;
  var originLon = document.getElementById('originLon').innerHTML;
  var destLan = document.getElementById('destLat').innerHTML;
  var destLon = document.getElementById('destLon').innerHTML;

  
  // retireve the start and end locations and create
  // a DirectionsRequest using WALKING directions.
  //lat,long
  
  var start = new google.maps.LatLng(originLan, originLon);
  var end = new google.maps.LatLng(destLan, destLon);
  // var start = new google.maps.LatLng(44.564171, -123.277672);
  // var end = new google.maps.LatLng(44.568910, -123.268810);
  var request = {
    origin: start,
    destination: end,
    travelMode: google.maps.TravelMode.WALKING
  };
  
  // Route the directions and pass the response to a 
  // function to create markers for each step
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);

    }
  });  
}
















