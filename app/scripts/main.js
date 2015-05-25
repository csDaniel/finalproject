console.log('\'Allo \'Allo!');


window.onload = function() {
  
  loginAttempt('action=init');


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
