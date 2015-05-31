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

function errorMessage($error) {
  echo '<div id="userChild">';
    echo '<p> ' .$error. '</p>';
    echo '<input type="button" class="btnbottom" id="hideMenuDiv" value="Return" onclick="hideMenu()">';
  echo '</div>';
  die();  
}


function loginMenu() { 
// test with logging in
  echo '<div id="userChild">';    
    echo '<div id="logininfo" class="credentials">';
      echo '<p>Username <input type="text" id="loginName" value="" required /></p>';
      echo '<p>Password <input type="password" id="loginSecret" value="" requires</p>';
      echo '<div id="loginSubmit" class="btnbottom">Login</div>';
    echo '</div>';
    echo '<div id="newAccount" class="credentials">';
      echo '<p>Username <input type="text" id="newName" value="" required /></p>';
      echo '<p>Password <input type="password" id="newSecret" value="" required /></p>';
      echo '<div id="makeNewSubmit" class="btnbottom">Create New Account</div>';
    echo '</div>';    
    echo '<input type="button" class="btnbottom" id="hideLoginDiv" value="Hide Login" onclick="hideMenu()">';
  echo '</div>';
 }

function userMenu() {
  echo '<div id="userChild">';
    echo '<p>Welcome back, ' .$_SESSION['username']. '.</br></p>';
    echo '<div id="userAddSelect" class="btnbottom">Add New Bathroom</div>';
    echo '<div id="userDeleteSelect" class="btnbottom">Delete a Bathroom</div>';
    echo '<div id="userLogoutSelect" class="btnbottom">Logout</div>';
    echo '<input type="button" class="btnbottom" id="hideMenuDiv" value="Hide Menu" onclick="hideMenu()">';
    echo '<br><p>Created by Daniel Ofarrell</p>';
  echo '</div>';  
}


// CURRENT PROJECT FIX THE ADD BATHROOM MENU!
// newBathName, newLat, newLon, overall, clean, purchase, bidet, squat, tpStash, soap
function  newBathroomMenu($curLat, $curLon) {
  echo '<div id="userChild">';
    echo '<h2>Add a New Bathroom</h2>';
    echo '<table>';
    echo '<form name="addNewBathroom" id ="newBathroom" class="inputBox" method="POST" action="login.php">';
      // name field
      echo '<tr>';
      echo '<p><td>Enter a new Name:</td> <td><input type="text" id="newBathName" class="rightside" value ="" requires/><td>';
      echo '</tr>';
      // latitude and longitude (default to current location)
      echo '<tr>';
      echo '<td>Latitude: </td> <td><input type="number" id="newLat" class="rightside" step="any" value ="'.$curLat.'" requires/></td>';
      echo '</tr>';
      echo '<td>Longitude: </td> <td><input type="number" id="newLon" class="rightside" step="any" value ="'.$curLon.'" requires/></td>';
      echo '</tr>';
      // overall rating
      echo '<tr><td><span class="subtitle">Overall Rating: </span></td>';
      echo '<td>';
      echo '1<input type="radio" name="overall" id="o1" value="1">  ';
      echo '2<input type="radio" name="overall" id="o2" value="2">  ';
      echo '3<input type="radio" name="overall" id="o3" value="3">  ';
      echo '4<input type="radio" name="overall" id="o4" value="4">  ';
      echo '5<input type="radio" name="overall" id="o5" value="5"></td></tr>';
      // cleanliness rating
      echo '<tr><td><span class="subtitle">Clean Rating: </span></td>';
      echo '<td>';
      echo '1<input type="radio" name="clean" id="c1" value="1">  ';
      echo '2<input type="radio" name="clean" id="c2" value="2">  ';
      echo '3<input type="radio" name="clean" id="c3" value="3">  ';
      echo '4<input type="radio" name="clean" id="c4" value="4">  ';
      echo '5<input type="radio" name="clean" id="c5" value="5"></td></tr>';
      // bool listing: purchase, bidet, squat, tpStash, soap
      echo '<tr><td><span class="subtitle">Purchase Required: </span></td>';
      echo '<td>Yes<input type="radio" name="purchase" id="p1" value="1">  ';
      echo 'No<input type="radio" name="purchase" id="p0" value="0"></td></tr>';      
      echo '<tr><td><span class="subtitle">Has a Bidet: </span></td>';
      echo '<td>Yes<input type="radio" name="bidet" id="b1" value="1">  ';
      echo 'No<input type="radio" name="bidet" id="b0" value="0"></td></tr>';   
      echo '<tr><td><span class="subtitle">Has a Squat Toilet: </span></td>';
      echo '<td>Yes<input type="radio" name="squat" id="q1" value="1">  ';
      echo 'No<input type="radio" name="squat" id="q0" value="0"></td></tr>';   
      echo '<tr><td><span class="subtitle">Ample Toilet Paper: </span></td>';
      echo '<td>Yes<input type="radio" name="tpStash" id="t1" value="1">  ';
      echo 'No<input type="radio" name="tpStash" id="t0" value="0"></td></tr>';  
      echo '<tr><td><span class="subtitle">Has Soap: </span></td>';
      echo '<td>Yes<input type="radio" name="soap" id="s1" value="1">  ';
      echo 'No<input type="radio" name="soap" id="s0" value="0"></td></tr>'; 
      echo '</table>';
      echo '<div class="btnbottom" id="createNewBathroom">Add a New Bathroom</div>';      
    echo '</form>';
    echo '<input type="button" class="btnbottom" id="hideMenuDiv" value="Hide Menu" onclick="hideMenu()">';
  echo '</div>';  
}

// adding new bathroom
function createNewBathroomRequest($newBathName, $newLat, $newLon, $overall, $clean, $purchase, $bidet, $squat, $tpStash, $soap) {
// absLoc, author
  global $mysqli;
  global $toiletDB;
  
  $absloc = abs($newLat) + abs($newLon);
  
  $compare = $mysqli->prepare("SELECT * FROM $toiletDB WHERE latitude = ? && longitude = ?");
  $compare->bind_param('dd', $newLat, $newLon);
  $compare->execute();
  $res = $compare->get_result();
  if($res->num_rows === 0) {
    $compare->close();
    $updateToiletDB = $mysqli->prepare("INSERT INTO $toiletDB 
      (name, absLoc, latitude, longitude, rating, clean, purchase, bidet, squat, tpStash, soap, author) 
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?)");
    $updateToiletDB->bind_param('sdddiiiiiiis', $newBathName, $absloc, $newLat, $newLon, $overall, $clean, $purchase,
      $bidet, $squat, $tpStash, $soap, $_SESSION['username']);
    $updateToiletDB->execute();
    $updateToiletDB->close();
    errorMessage("Toilet added successfully.");  
  } else {
    $compare->close();
    errorMessage("You cannot add duplicate points.");
  }  
  
}

// ------------Delete Bathroom Section--------------------
function showDeleteMenu() {
  global $mysqli;
  global $toiletDB;
  
  $request = $mysqli->prepare("select * FROM $toiletDB WHERE author = ?");
  $request->bind_param('s', $_SESSION['username']);
  $request->execute();
  $res = $request->get_result();
  
  //class =rightside
  echo '<div id="userChild">';
    echo '<h2>Select and Delete a Location</h2>';
    echo '<table>';
    while ($row = $res->fetch_assoc()) {
      echo '<tr id=' .$row['bathid']. '>';
      echo '<td>' .$row['name']. '</td>';
      echo '<td><div class="removeBathLocation btnbottom">Delete</div></td>';
      //echo '<td><button type="submit" name="action" class="btn" value="deleteBathroom">Delete</button></td>';      
      echo '</tr>';
    }
    echo '</table>';
    echo '<input type="button" class="btnbottom" id="hideMenuDiv" value="Hide Menu" onclick="hideMenu()">';
  echo '</div>';
  $request->close();
}

function deleteBathroomRequest($id) {
  global $mysqli;
  global $toiletDB;
  
  $request = $mysqli->prepare("DELETE from $toiletDB WHERE bathid = ?");
  $request->bind_param('i', $id);
  $request->execute();

  $request->close();
}


// ------------Account Login Section----------------------

function login($name, $pass) {
  global $mysqli; 
  global $userDB; 
  
  //username password
  $loginAttempt = $mysqli->prepare("SELECT * FROM $userDB where username= ? ");
  $loginAttempt->bind_param('s', $name);
  $loginAttempt->execute();
  $res = $loginAttempt->get_result();
  
  $loginAttempt->close();
  
  if($res->num_rows === 0) {
    errorMessage("Invalid Username. Make you sure typed it correctly.");
  }

  while ($row = mysqli_fetch_row($res)) {
    if ($pass == $row[2]) {
      $_SESSION['username'] = $name; 
      errorMessage("You are now logged in.");
    } else {
      
      errorMessage("Invalid password. Please try again");
    }
  } 
}

function makeNewAccount($newName, $newSecret) {
  global $mysqli;
  global $userDB;
  
  //username password
  $loginAttempt = $mysqli->prepare("SELECT username from $userDB where username= ? ");
  $loginAttempt->bind_param('s', $newName);
  $loginAttempt->execute();
  $res = $loginAttempt->get_result();
  $loginAttempt->close();
  
  // new unique name
  if($res->num_rows === 0) {
    $makeNew = $mysqli->prepare("INSERT INTO $userDB (username, password) VALUES (?,?)");
    $makeNew->bind_param('ss', $newName, $newSecret);
    $makeNew->execute();
    $makeNew->close();
    $_SESSION['username'] = $newName;
    errorMessage("Your account has been created.");    
  } else {
    errorMessage("That username is already taken. Please try again.");
  }  
}


function logout() {
  session_destroy();
  die();
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
 // $curLat1 = 39.772893;
  //$curLon1 = -104.861174;
  $curLat1 = 44.621520;
  $curLon1 = -123.123657;
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
      $newName = $_REQUEST['newName'];
      $newSecret = $_REQUEST['newSecret'];
      makeNewAccount($newName, $newSecret);
  } elseif ($action == 'addNewBathroomRequest') {
      $curLat = $_REQUEST['currentLat'];
      $curLon = $_REQUEST['currentLon'];
      newBathroomMenu($curLat, $curLon);    
  } elseif ($action == 'createNewBathroom') {
      $newBathName = $_REQUEST['newBathName'];
      $newLat = $_REQUEST['newLat'];
      $newLon = $_REQUEST['newLon'];
      $overall = $_REQUEST['overall'];
      $clean = $_REQUEST['clean'];
      $purchase = $_REQUEST['purchase'];
      $bidet = $_REQUEST['bidet'];
      $squat = $_REQUEST['squat'];
      $tpStash = $_REQUEST['tpStash'];
      $soap = $_REQUEST['soap'];
      createNewBathroomRequest($newBathName, $newLat, $newLon, $overall, $clean, $purchase, $bidet, $squat, $tpStash, $soap);
  } elseif ($action == 'deleteMenu') {
      showDeleteMenu();
  } elseif ($action == 'deleteThisBathroom') {
      $id = $_REQUEST['id'];
      deleteBathroomRequest($id);
  } elseif ($action == 'logout') {
      logout();
  }
}
// newBathName, newLat, newLon, overall, clean, purchase, bidet, squat, tpStash, soap



?>