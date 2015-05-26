<?php 
ini_set('display_errors', 1);
error_reporting(E_ALL);

function menu() { 
  echo '<div class ="container" id="loginContainer">';
    echo '<div id="loginChild">';
      echo '<div id="logininfo" class="credentials">';
        echo '</br>';
        echo '<form id="loginUser" class="inputBox">';
          echo '<span>Username <input type="text"></input></span></br>';
          echo '<span>Password <input type="password"></input></span></br>';
          echo '<button class="btnbottom" type="submit">Login</button>';
        echo '</form>';
      echo '</div>';
      
      echo '<div id="newAccount" class="credentials">';
        echo '<form id="createNew" class="inputBox">';
          echo '<span>New Username <input type="text"></input></span></br>';
          echo '<span>New Password <input type="password"></input></span></br>';
          echo '<button class="btnbottom" type="submit">Create a new account</button>';
      echo '</div>';
      echo '<div class="btnbottom" id="hideLoginDiv">Hide Login</div>';
    echo '</div>';
  echo '</div>';
 }

function login() {
  
  echo '<class = "container">';
    echo '<div class="credentials">';
      echo '<p>Welcome to the page!</p>';
    echo '</div>';
  echo '</class>';
  
}

function findClosest($curLat, $curLon) {
  $testLat = 37.49875;
  $testLon = 127.027455;
  $phpArray = array(floatval($curLat), floatval($curLon), $testLat, $testLon);
  echo json_encode($phpArray);  
}

if (isset($_REQUEST['action'])) {
  $action = $_REQUEST['action'];
  
  if ($action == 'menu') {
    menu();
  } elseif ($action == 'init') {
    $curLat = $_REQUEST['currentLat'];
    $curLon = $_REQUEST['currentLon'];
    findClosest($curLat, $curLon);
  } elseif ($action == 'login') {
    echo '<p>sorry!</p>';
  } elseif ($action == 'makeNew') {
    echo '<p>making new!</p>';
  }
  
}
?>