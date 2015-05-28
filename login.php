<?php 
session_start();
include 'finalConfig.php';


// bathid, name, latitude, longitude, rating, clean, purchase, bidet, squat, tpStash, soap
$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
if (!$mysqli || $mysqli->connection_errno) {
  echo "Failed to connect to MySQL: (" . $mysqli->connection_errno . ") " . $mysqli->connect_error;
}

ini_set('display_startup_errors',1);
ini_set('display_errors', 1);
error_reporting(-1);

function loginMenu() { 
// test with logging in
  echo '<div id="loginChild">';
    echo '<div id="logininfo" class="credentials">';
      echo '</br>';
      echo '<form name="loginUser" class="inputBox" method="POST" action="login.php">';
        echo '<p>Username <input type="text" name="loginName" value="" required></br></p>';
        echo '<p>Password <input type="password" name="loginSecret" value="" required></br></p>';
        echo '<input class="btnbottom" type="submit" name="action" value="login">';
      echo '</form>';
    echo '</div>';
      
    echo '<div id="newAccount" class="credentials">';
      echo '</br>';
      echo '<form name="createNew" class="inputBox" method="POST" action="login.php">';
        echo '<p>New Username <input type="text" name="newName" value="" required></input></br></p>';
        echo '<p>New Password <input type="password" name="newSecret" value="" required></input></br></p>';
        echo '<input class="btnbottom" type="submit" name="action" value="makeNew">';
    echo '</div>';
    echo '<div class="btnbottom" id="hideLoginDiv">Hide Login</div>';
  echo '</div>';
 }

function userMenu() {
  echo '<div id="userChild">';
    echo '<p>Welcome back, ' .$_SESSION['username']. '.</br></p>';
    echo '<div class="btnbottom" id="userAddSelect">Add New Destination</div>';
    echo '<div class="btnbottom" id="userDeleteSelect">Delete a Location</div>';
    echo '<div class="btnbottom" id="userLogoutSelect">Logout</div>';
    echo '<div class="btnbottom" id="hideLoginDiv">Hide Login</div>';
    echo '<br><p>Created by Daniel Ofarrell</p>';
  echo '</div>';  
}
 

function login($name, $pass) {
  global $mysqli; 
  global $userDB; 
  
  //username password
  $loginAttempt = $mysqli->prepare("SELECT * FROM $userDB where username= ? ");
  $loginAttempt->bind_param('s', $name);
  $loginAttempt->execute();
  $res = $loginAttempt->get_result();
  while ($row = mysqli_fetch_row($res)) {
    if ($pass == $row[2]) {
      $_SESSION['username'] = $name; 
      header('Location: index.html');
    }
    else {
      header('Location: index.html');
      die();
    }
  } 
  $loginAttempt->close();
}

function logout() {
  session_destroy();
  header('Location: index.html');  
}


// DB searching functions
function prepareClosest($curLat, $curLon) {
  global $mysqli;
  global $toiletDB;
  
  
  $revised = $mysqli->prepare("SELECT absLoc FROM $toiletDB");
  $revised->execute();
  $res = $revised->get_result();
  
  findClosest($res, $curLat, $curLon);
  
  $res->close();  
}


function findClosest($res, $curLat, $curLon) {
  $destLat = 44.568910;
  $destLon = -123.268810;

  
  // REMEMBER TO CHANGE CURLAT1 to CURLAT and CURLON1 to CURLON
  // originLan, originLon, destLan, destLon
  // for testing:
  //$curLat1 = 44.564171;
  //$curLon1 = -123.277672;  
  //$curLat1 = 44.596484;
  //$curLon1 = -123.298727;
  // silly testing
  $curLat1 = 39.772893;
  $curLon1 = -104.861174;
  $absLoc = abs($curLat1) + abs($curLon1);


  // name, absLoc, latitude, longitude, rating, clean, purchase, bidet, squat, tpStash, soap
  while ($row = $res->fetch_assoc()) {
    $dbAbsLoc[] =floatval($row['absLoc']);
  }

  // locate the nearest absLoc point
  $i = 0;
  do {
    $tempLoc = abs($absLoc - $dbAbsLoc[$i]);   
    $i++;
  } while ($i < count($dbAbsLoc) && $tempLoc > (abs($absLoc - $dbAbsLoc[$i])));
  $tempLoc = $dbAbsLoc[$i-1];
  requestClosest($tempLoc, $curLat1, $curLon1);
}

function requestClosest($tempLoc, $curLat, $curLon) {
  global $mysqli;
  global $toiletDB;
    
  // make function and print the table
      
  $revised = $mysqli->prepare("SELECT * FROM $toiletDB WHERE absLoc = $tempLoc");
  $revised->execute();
  $res = $revised->get_result();
  
  printClosest($res, $curLat, $curLon);
  
  $res->close(); 
}
  
  function printClosest($res, $curLat, $curLon) {
   // name, absLoc, latitude, longitude, rating, clean, purchase, bidet, squat, tpStash, soap
  // real output inc!
  
  while ($row = $res->fetch_assoc()) { 
    echo '<p>Origin: <span id="originLat">'.$curLat.'</span> , 
      <span id="originLon">'.$curLon.'</span> >>> ';
    echo 'Destination: <span id="destLat">' .$row['latitude']. '</span> , 
      <span id="destLon">' .$row['longitude']. '</span></br></p>';
    echo '<h2><p id = "name">' .$row['name']. '</br></p></h2>';
    echo '<p>Rating: ' .$row['rating']. '/5</br></p>';
    echo '<p>Cleanliness: ' .$row['clean']. '/5</br></p>';
    echo '<p>The bathroom has: ';
    if ($row['purchase']) {
      echo 'purchase required, ';
    }
    if ($row['bidet']) {
      echo 'a bidet, ';
    }
    if ($row['squat']) {
      echo 'a squat toilet, ';
      
    }
    if ($row['tpStash']) {
      echo 'ample toilet paper, ';
    }
    if ($row['soap']) {
      echo 'soap';
    }
    echo '</p>';
  }
}

if (isset($_REQUEST['action'])) {
  $action = $_REQUEST['action'];
  
  if ($action == 'menu') {
    if (!isset($_SESSION['username']) || empty($_SESSION['username'])) {
      loginMenu();
    } else {
      userMenu();
    }
  } elseif ($action == 'init') {
      $curLat = $_REQUEST['currentLat'];
      $curLon = $_REQUEST['currentLon'];
      prepareClosest($curLat, $curLon);
  } elseif ($action == 'login') {
      $name = $_REQUEST['loginName'];
      $pass = $_REQUEST['loginSecret'];
      login($name, $pass);
  } elseif ($action == 'makeNew') {
    //newName, newSecret
    echo '<p>making new!</p>';
  } elseif ($action == 'logout') {
      logout();
  }
}

// EXTRA STUFF
function updateMovie($id, $rented) {
  global $mysqli;
  global $table;
  $update = $mysqli->prepare("UPDATE $table SET rented = ? WHERE id = ?");
  $update->bind_param('ii', $rented, $id);
  $update->execute();
  $update->close();
}


?>