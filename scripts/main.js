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

function initializeLogin() {
  loginAttempt('action=init');
}



var map;
function initializeMap() {
  var latlng = new google.maps.LatLng(-34.397, 150,644);
  var mapOptions = {
    zoom: 8,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById('mapContainer'),
      mapOptions);
}

//google.maps.event.addDomListener(window, 'load', initializeMap);






