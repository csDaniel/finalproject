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

// add listeners based on the specific div being via loginAttempt().
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

// requests login using a preexisting id. 
function loginRequest() {
  var statement = 'action=login';

  
  // test conditions for name length/password length 
  if (document.getElementById('loginName').value.length > 7 
  && document.getElementById('loginSecret').value.length > 7) {
    //md5 hash on password
    var x = hex_md5(document.getElementById('loginSecret').value);  
    statement += '&loginName=' + document.getElementById('loginName').value;
    statement += '&loginSecret=' + x;    
    // proper values submitted
    hideMenu();  
    loginAttempt(statement);
  } else if (document.getElementById('loginName').value.length <= 7) {
      document.getElementById('inputValidation').innerHTML = "Username must be at least 8 characters";
  } else {
      document.getElementById('inputValidation').innerHTML = "Password must be at least 8 characters";
    }
}

// requests a new account (username & password) be added to the database.
function createNewRequest() {
  var statement = 'action=makeNew';
  
  if (document.getElementById('newName').value.length > 7 
  && document.getElementById('newSecret').value.length > 7) {
    //md5 hash on password
    var x = hex_md5(document.getElementById('newSecret').value);  
    statement += '&newName=' + document.getElementById('newName').value; 
    statement += '&newSecret=' + x;
    // proper values submitted
    hideMenu();  
    loginAttempt(statement);
  } else if (document.getElementById('newName').value.length <= 7) {
      document.getElementById('inputValidation').innerHTML = "Username must be at least 8 characters";
  } else {
      document.getElementById('inputValidation').innerHTML = "Password must be at least 8 characters";
    }

}

// removes the current menu from the screen
function hideMenu() {
  var deleteMe = document.getElementById('userChild');
  deleteMe.parentElement.removeChild(deleteMe); 
}

// will either call the login/create new account menu, or print the user menu
function initializeLogin () {
  var statement = 'action=menu';
  loginAttempt(statement);
}

// logs user out of program
function logout() {
  hideMenu();
  var statement = 'action=logout';
  loginAttempt(statement);
}

function reloadPage() {
  location.reload();
}

// initializes the 'createNewBathroom' function. 
function addNewBathroom() {
  var curLat = document.getElementById('originLat').innerHTML;
  var curLon = document.getElementById('originLon').innerHTML;
  
  var statement = 'action=addNewBathroomRequest';
  statement += '&currentLat=' + curLat;
  statement += '&currentLon=' + curLon;
  loginAttempt(statement);  
}

// submits request to add new location to database
function createNewBathroom() {
  var token = 0;
  var radioToken = 0;
  var statement = 'action=createNewBathroom';  
  
  if (document.getElementById('newBathName').value.length <= 4) {
      document.getElementById('inputValidation').innerHTML = "Bathroom Name must me at least 4 letters";
  } else {
    token++;
    statement += '&newBathName=' + document.getElementById('newBathName').value;    
  }
  
  if (document.getElementById('newLat').value.length < 1) {
    document.getElementById('inputValidation').innerHTML = "Please enter a Latitude";  
  } else {
    token++;
    statement += '&newLat=' + document.getElementById('newLat').value;    
  }
  
  if (document.getElementById('newLat').value.length < 1) {
    document.getElementById('inputValidation').innerHTML = "Please enter a Longitude";      
  } else {
    token++;
    statement += '&newLon=' + document.getElementById('newLon').value;    
  }


  
  // need cases for each one :( o1, c1, p1, b1, q1, t1, s1,
  // radioToken
  if (document.getElementById('o1').checked) {
    radioToken++;
    statement += '&overall=' + document.getElementById('o1').value;  
  } else if (document.getElementById('o2').checked) {
    radioToken++;
    statement += '&overall=' + document.getElementById('o2').value;  
  } else if (document.getElementById('o3').checked) {
    radioToken++;
    statement += '&overall=' + document.getElementById('o3').value;  
  } else if (document.getElementById('o4').checked) {
    radioToken++;
    statement += '&overall=' + document.getElementById('o4').value;  
  } else if (document.getElementById('o5').checked) {
    radioToken++;
    statement += '&overall=' + document.getElementById('o5').value;  
  } 
  if (radioToken == 0) {
    document.getElementById('inputValidation').innerHTML = "Please select the Overall Quality";      
  } else {
    token++;
  }
  
  radioToken = 0;
  if (document.getElementById('c1').checked) {
    radioToken++;
    statement += '&clean=' + document.getElementById('c1').value;  
  } else if (document.getElementById('c2').checked) {
    radioToken++;
    statement += '&clean=' + document.getElementById('c2').value;  
  } else if (document.getElementById('c3').checked) {
    radioToken++;
    statement += '&clean=' + document.getElementById('c3').value;  
  } else if (document.getElementById('c4').checked) {
    radioToken++;
    statement += '&clean=' + document.getElementById('c4').value;  
  } else if (document.getElementById('c5').checked) {
    radioToken++;
    statement += '&clean=' + document.getElementById('c5').value;  
  } 
  if (radioToken == 0) {
    document.getElementById('inputValidation').innerHTML = "Please select the Overall Cleanliness";      
  } else {
    token++;
  }
  
  radioToken = 0;
  if (document.getElementById('p1').checked) {
    radioToken++;
    statement += '&purchase=' + document.getElementById('p1').value;
  } else if (document.getElementById('p0').checked) {
    radioToken++;
    statement += '&purchase=' + document.getElementById('p0').value;
  } 
  if (radioToken == 0) {
    document.getElementById('inputValidation').innerHTML = "Please select the Purchase Requirement";      
  } else {
    token++;
  }
  
  radioToken = 0;
  if (document.getElementById('b1').checked) {
    radioToken++;
    statement += '&bidet=' + document.getElementById('b1').value;
  } else if (document.getElementById('b0').checked) {
    radioToken++;
    statement += '&bidet=' + document.getElementById('b0').value;
  } 
  if (radioToken == 0) {
    document.getElementById('inputValidation').innerHTML = "Please select the Bidet";      
  } else {
    token++;
  }
  
  radioToken = 0;
  if (document.getElementById('q1').checked) {
    radioToken++;
    statement += '&squat=' + document.getElementById('q1').value;
  } else if (document.getElementById('q0').checked) {
    radioToken++;
    statement += '&squat=' + document.getElementById('q0').value;
  } 
  if (radioToken == 0) {
    document.getElementById('inputValidation').innerHTML = "Please select the Squat Toilet";      
  } else {
    token++;
  }
  
  radioToken = 0;
  if (document.getElementById('t1').checked) {
    radioToken++;
    statement += '&tpStash=' + document.getElementById('t1').value;
  } else if (document.getElementById('t0').checked) {
    radioToken++;
    statement += '&tpStash=' + document.getElementById('t0').value;
  } 
  if (radioToken == 0) {
    document.getElementById('inputValidation').innerHTML = "Please select the Toilet Paper";      
  } else {
    token++;
  }
  
  radioToken = 0;
  if (document.getElementById('s1').checked) {
    radioToken++;
    statement += '&soap=' + document.getElementById('s1').value;
  } else if (document.getElementById('s0').checked) {
    radioToken++;
    statement += '&soap=' + document.getElementById('s0').value;
  }   
  if (radioToken == 0) {
    document.getElementById('inputValidation').innerHTML = "Please select the Soap";      
  } else {
    token++;
  }

  // all 10 fields have been altered/added
  if (token >= 10 ) {
    loginAttempt(statement);  
  // if closer bathroom is added, will reload new directions.
    initializeMap();
  }
}

// requests table of user created points
function deleteMenu() {
  var statement = 'action=deleteMenu';
  loginAttempt(statement);
}

// deletes the bathroom selected by user
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


// display map with current location centered
function initializeMap() {
  directionsDisplay = new google.maps.DirectionsRenderer();
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    innerMap.innerHTML = "Geolocation is not supported by this browser";  
  }

      
}

function showPosition(position) {
  // access to users lat/long can be found here.
  directionsDisplay = new google.maps.DirectionsRenderer();
  
  var currentLat = position.coords.latitude;
  var currentLon = position.coords.longitude;
  var statement = 'action=init';
  statement += '&currentLat=' + currentLat;
  statement += '&currentLon=' + currentLon;

    // centers map
  var latlng = new google.maps.LatLng(currentLat, currentLon);
  var mapOptions = {
    zoom: 17,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById('mapContainer'), mapOptions);
  directionsDisplay.setMap(map);
  
  
  
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


/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
var hexcase=0;function hex_md5(a){return rstr2hex(rstr_md5(str2rstr_utf8(a)))}function hex_hmac_md5(a,b){return rstr2hex(rstr_hmac_md5(str2rstr_utf8(a),str2rstr_utf8(b)))}function md5_vm_test(){return hex_md5("abc").toLowerCase()=="900150983cd24fb0d6963f7d28e17f72"}function rstr_md5(a){return binl2rstr(binl_md5(rstr2binl(a),a.length*8))}function rstr_hmac_md5(c,f){var e=rstr2binl(c);if(e.length>16){e=binl_md5(e,c.length*8)}var a=Array(16),d=Array(16);for(var b=0;b<16;b++){a[b]=e[b]^909522486;d[b]=e[b]^1549556828}var g=binl_md5(a.concat(rstr2binl(f)),512+f.length*8);return binl2rstr(binl_md5(d.concat(g),512+128))}function rstr2hex(c){try{hexcase}catch(g){hexcase=0}var f=hexcase?"0123456789ABCDEF":"0123456789abcdef";var b="";var a;for(var d=0;d<c.length;d++){a=c.charCodeAt(d);b+=f.charAt((a>>>4)&15)+f.charAt(a&15)}return b}function str2rstr_utf8(c){var b="";var d=-1;var a,e;while(++d<c.length){a=c.charCodeAt(d);e=d+1<c.length?c.charCodeAt(d+1):0;if(55296<=a&&a<=56319&&56320<=e&&e<=57343){a=65536+((a&1023)<<10)+(e&1023);d++}if(a<=127){b+=String.fromCharCode(a)}else{if(a<=2047){b+=String.fromCharCode(192|((a>>>6)&31),128|(a&63))}else{if(a<=65535){b+=String.fromCharCode(224|((a>>>12)&15),128|((a>>>6)&63),128|(a&63))}else{if(a<=2097151){b+=String.fromCharCode(240|((a>>>18)&7),128|((a>>>12)&63),128|((a>>>6)&63),128|(a&63))}}}}}return b}function rstr2binl(b){var a=Array(b.length>>2);for(var c=0;c<a.length;c++){a[c]=0}for(var c=0;c<b.length*8;c+=8){a[c>>5]|=(b.charCodeAt(c/8)&255)<<(c%32)}return a}function binl2rstr(b){var a="";for(var c=0;c<b.length*32;c+=8){a+=String.fromCharCode((b[c>>5]>>>(c%32))&255)}return a}function binl_md5(p,k){p[k>>5]|=128<<((k)%32);p[(((k+64)>>>9)<<4)+14]=k;var o=1732584193;var n=-271733879;var m=-1732584194;var l=271733878;for(var g=0;g<p.length;g+=16){var j=o;var h=n;var f=m;var e=l;o=md5_ff(o,n,m,l,p[g+0],7,-680876936);l=md5_ff(l,o,n,m,p[g+1],12,-389564586);m=md5_ff(m,l,o,n,p[g+2],17,606105819);n=md5_ff(n,m,l,o,p[g+3],22,-1044525330);o=md5_ff(o,n,m,l,p[g+4],7,-176418897);l=md5_ff(l,o,n,m,p[g+5],12,1200080426);m=md5_ff(m,l,o,n,p[g+6],17,-1473231341);n=md5_ff(n,m,l,o,p[g+7],22,-45705983);o=md5_ff(o,n,m,l,p[g+8],7,1770035416);l=md5_ff(l,o,n,m,p[g+9],12,-1958414417);m=md5_ff(m,l,o,n,p[g+10],17,-42063);n=md5_ff(n,m,l,o,p[g+11],22,-1990404162);o=md5_ff(o,n,m,l,p[g+12],7,1804603682);l=md5_ff(l,o,n,m,p[g+13],12,-40341101);m=md5_ff(m,l,o,n,p[g+14],17,-1502002290);n=md5_ff(n,m,l,o,p[g+15],22,1236535329);o=md5_gg(o,n,m,l,p[g+1],5,-165796510);l=md5_gg(l,o,n,m,p[g+6],9,-1069501632);m=md5_gg(m,l,o,n,p[g+11],14,643717713);n=md5_gg(n,m,l,o,p[g+0],20,-373897302);o=md5_gg(o,n,m,l,p[g+5],5,-701558691);l=md5_gg(l,o,n,m,p[g+10],9,38016083);m=md5_gg(m,l,o,n,p[g+15],14,-660478335);n=md5_gg(n,m,l,o,p[g+4],20,-405537848);o=md5_gg(o,n,m,l,p[g+9],5,568446438);l=md5_gg(l,o,n,m,p[g+14],9,-1019803690);m=md5_gg(m,l,o,n,p[g+3],14,-187363961);n=md5_gg(n,m,l,o,p[g+8],20,1163531501);o=md5_gg(o,n,m,l,p[g+13],5,-1444681467);l=md5_gg(l,o,n,m,p[g+2],9,-51403784);m=md5_gg(m,l,o,n,p[g+7],14,1735328473);n=md5_gg(n,m,l,o,p[g+12],20,-1926607734);o=md5_hh(o,n,m,l,p[g+5],4,-378558);l=md5_hh(l,o,n,m,p[g+8],11,-2022574463);m=md5_hh(m,l,o,n,p[g+11],16,1839030562);n=md5_hh(n,m,l,o,p[g+14],23,-35309556);o=md5_hh(o,n,m,l,p[g+1],4,-1530992060);l=md5_hh(l,o,n,m,p[g+4],11,1272893353);m=md5_hh(m,l,o,n,p[g+7],16,-155497632);n=md5_hh(n,m,l,o,p[g+10],23,-1094730640);o=md5_hh(o,n,m,l,p[g+13],4,681279174);l=md5_hh(l,o,n,m,p[g+0],11,-358537222);m=md5_hh(m,l,o,n,p[g+3],16,-722521979);n=md5_hh(n,m,l,o,p[g+6],23,76029189);o=md5_hh(o,n,m,l,p[g+9],4,-640364487);l=md5_hh(l,o,n,m,p[g+12],11,-421815835);m=md5_hh(m,l,o,n,p[g+15],16,530742520);n=md5_hh(n,m,l,o,p[g+2],23,-995338651);o=md5_ii(o,n,m,l,p[g+0],6,-198630844);l=md5_ii(l,o,n,m,p[g+7],10,1126891415);m=md5_ii(m,l,o,n,p[g+14],15,-1416354905);n=md5_ii(n,m,l,o,p[g+5],21,-57434055);o=md5_ii(o,n,m,l,p[g+12],6,1700485571);l=md5_ii(l,o,n,m,p[g+3],10,-1894986606);m=md5_ii(m,l,o,n,p[g+10],15,-1051523);n=md5_ii(n,m,l,o,p[g+1],21,-2054922799);o=md5_ii(o,n,m,l,p[g+8],6,1873313359);l=md5_ii(l,o,n,m,p[g+15],10,-30611744);m=md5_ii(m,l,o,n,p[g+6],15,-1560198380);n=md5_ii(n,m,l,o,p[g+13],21,1309151649);o=md5_ii(o,n,m,l,p[g+4],6,-145523070);l=md5_ii(l,o,n,m,p[g+11],10,-1120210379);m=md5_ii(m,l,o,n,p[g+2],15,718787259);n=md5_ii(n,m,l,o,p[g+9],21,-343485551);o=safe_add(o,j);n=safe_add(n,h);m=safe_add(m,f);l=safe_add(l,e)}return Array(o,n,m,l)}function md5_cmn(h,e,d,c,g,f){return safe_add(bit_rol(safe_add(safe_add(e,h),safe_add(c,f)),g),d)}function md5_ff(g,f,k,j,e,i,h){return md5_cmn((f&k)|((~f)&j),g,f,e,i,h)}function md5_gg(g,f,k,j,e,i,h){return md5_cmn((f&j)|(k&(~j)),g,f,e,i,h)}function md5_hh(g,f,k,j,e,i,h){return md5_cmn(f^k^j,g,f,e,i,h)}function md5_ii(g,f,k,j,e,i,h){return md5_cmn(k^(f|(~j)),g,f,e,i,h)}function safe_add(a,d){var c=(a&65535)+(d&65535);var b=(a>>16)+(d>>16)+(c>>16);return(b<<16)|(c&65535)}function bit_rol(a,b){return(a<<b)|(a>>>(32-b))};
















