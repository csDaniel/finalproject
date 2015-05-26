window.onload = function() {

  document.getElementById('userMenu').addEventListener('click',initializeLogin);
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
      var elem = document.getElementById('LoginSpace');
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
  document.getElementById('hideLoginDiv').addEventListener('click', hideLogin);
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

function initializeLogin () {
  var statement = 'action=menu';
  loginAttempt(statement);
}

// regarding lat/lon
function findNearest(curLat, curLon) {
  var statement = 'action=init';
  statement += '&currentLat=' + curLat + '&currentLon=' + curLon;
  
  findNearestJSON(statement);
}

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
      // should return as a JSON response. will need to be parsed in the morning!
      var response = xmlhttp.responseText;
      // attempting to print out the directions
    }
  };
  
  var url = "login.php?";
  xmlhttp.open("GET",url + statement,true);
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
  // ATTEMPTING TO PLUG IN THE DIRECTIONS FROM AJAX

  var latlng = new google.maps.LatLng(localStorage.getItem("curLat"), localStorage.getItem("curLon"));
  var mapOptions = {
    zoom: 17,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById('mapContainer'), mapOptions);
  directionsDisplay.setMap(map);
      
  var marker = new google.maps.Marker({
    position: latlng,
    map: map,
    title: "Current Location"
  });
  
  calcRoute();
}

function showPosition(position) {
  // access to users lat/long can be found here.
  localStorage.setItem("curLat", position.coords.latitude);
  localStorage.setItem("curLon", position.coords.longitude);
  var currentLat = position.coords.latitude;
  var currentLon = position.coords.longitude;
  

  var statement = 'action=init';
  statement += '&currentLat=' + currentLat + '&currentLon=' + currentLon;
  
  findNearestJSON(statement);
}

// HERE BE PLUGIN ATTEMPT 
 
function calcRoute() {

  // how to get the values in here!!!
  var mapDirections = JSON.parse(localStorage["JSONresponse"]);
  console.log(mapDirections);

  
  // retireve the start and end locations and create
  // a DirectionsRequest using WALKING directions.
  //lat,long
  var start = new google.maps.LatLng(37.499344, 127.026248);
  var end = new google.maps.LatLng(37.498620, 127.024113);
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
















