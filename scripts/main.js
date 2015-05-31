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
      // give delete button options
      if (statement == 'action=deleteMenu') {
        accountAccessListeners('delete');
      // initialize login buttons
      } else if (statement == 'action=menu') {
        accountAccessListeners('menu');
      // add buttons on adding new bathroom menu
      } else if (statement.substring(0,10) == 'action=add') {
        accountAccessListeners('addNewBath');
      }
    }
  };
  

  var url = "login.php?";
  xmlhttp.open("POST",url + statement,true);
  xmlhttp.send();
  
}

// deprecated?
function accountAccessListeners(reaction) {
  
  if (reaction == 'delete') {
    var removes = document.getElementsByClassName('removeBathLocation');
    for (var i = 0; i < removes.length; i++) {
      removes[i].addEventListener('click', deleteBathroom);
    }
  }
  if (reaction == 'menu') {
    if (document.getElementById('logininfo')) {
      // user has not logged in
      console.log("not logged in");
      document.getElementById('loginSubmit').addEventListener('click', loginRequest);
      document.getElementById('makeNewSubmit').addEventListener('click', createNewRequest);      
    } else {
      console.log("logged in");
      // User is logged in and on Usermenu
      document.getElementById('userAddSelect').addEventListener('click', addNewBathroom);
      document.getElementById('userDeleteSelect').addEventListener('click', deleteMenu);
      document.getElementById('userLogoutSelect').addEventListener('click', logout);
    }
  }
  //makeNew  
  if (reaction == 'addNewBath') {
    document.getElementById('createNewBathroom').addEventListener('click', createNewBathroom);
  }

}

function loginRequest() {
  var statement = 'action=login';
  statement += '&loginName=' + document.getElementById('loginName').value;
  statement += '&loginSecret=' + document.getElementById('loginSecret').value;
  hideMenu();  
  loginAttempt(statement);
}

function createNewRequest() {
  var statement = 'action=makeNew';
  statement += '&newName=' + document.getElementById('newName').value;
  statement += '&newSecret=' + document.getElementById('newSecret').value;
  hideMenu();  
  loginAttempt(statement);
}


function hideMenu() {
  var deleteMe = document.getElementById('userChild');
  deleteMe.parentElement.removeChild(deleteMe); 
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

function createNewBathroom() {
  var statement = 'action=createNewBathroom';  
  
  statement += '&newBathName=' + document.getElementById('newBathName').value;
  statement += '&newLat=' + document.getElementById('newLat').value;
  statement += '&newLon=' + document.getElementById('newLon').value;
  
  // need cases for each one :( o1, c1, p1, b1, q1, t1, s1,
  if (document.getElementById('o1').checked) {
    statement += '&overall=' + document.getElementById('o1').value;  
  } else if (document.getElementById('o2').checked) {
    statement += '&overall=' + document.getElementById('o2').value;  
  } else if (document.getElementById('o3').checked) {
    statement += '&overall=' + document.getElementById('o3').value;  
  } else if (document.getElementById('o4').checked) {
    statement += '&overall=' + document.getElementById('o4').value;  
  } else if (document.getElementById('o5').checked) {
    statement += '&overall=' + document.getElementById('o5').value;  
  } 
  if (document.getElementById('c1').checked) {
    statement += '&clean=' + document.getElementById('c1').value;  
  } else if (document.getElementById('c2').checked) {
    statement += '&clean=' + document.getElementById('c2').value;  
  } else if (document.getElementById('c3').checked) {
    statement += '&clean=' + document.getElementById('c3').value;  
  } else if (document.getElementById('c4').checked) {
    statement += '&clean=' + document.getElementById('c4').value;  
  } else if (document.getElementById('c5').checked) {
    statement += '&clean=' + document.getElementById('c5').value;  
  } 
  
  if (document.getElementById('p1').checked) {
    statement += '&purchase=' + document.getElementById('p1').value;
  } else if (document.getElementById('p0').checked) {
    statement += '&purchase=' + document.getElementById('p0').value;
  } 
  
  if (document.getElementById('b1').checked) {
    statement += '&bidet=' + document.getElementById('b1').value;
  } else if (document.getElementById('b0').checked) {
    statement += '&bidet=' + document.getElementById('b0').value;
  } 
  
  if (document.getElementById('q1').checked) {
    statement += '&squat=' + document.getElementById('q1').value;
  } else if (document.getElementById('q0').checked) {
    statement += '&squat=' + document.getElementById('q0').value;
  } 
  
  if (document.getElementById('t1').checked) {
    statement += '&tpStash=' + document.getElementById('t1').value;
  } else if (document.getElementById('t0').checked) {
    statement += '&tpStash=' + document.getElementById('t0').value;
  } 
  
  if (document.getElementById('s1').checked) {
    statement += '&soap=' + document.getElementById('s1').value;
  } else if (document.getElementById('s0').checked) {
    statement += '&soap=' + document.getElementById('s0').value;
  }   

  loginAttempt(statement);  
}


function deleteMenu() {
  var statement = 'action=deleteMenu';
  loginAttempt(statement);
}

function deleteBathroom() {
    // statement == command + id of entire movie
  var statement = 'action=deleteThisBathroom&id=' + this.parentNode.parentNode.id;
  
  loginAttempt(statement);

  hideMenu();
}

/* [Map Related Functions] -------------------------------------------*/
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

var map;
var innerMap = document.getElementById('mapContainer');
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

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
















