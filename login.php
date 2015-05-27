<?php 
ini_set('display_startup_errors',1);
ini_set('display_errors', 1);
error_reporting(-1);

function menu() { 
  echo '<div id="loginChild">';
    echo '<div id="logininfo" class="credentials">';
      echo '</br>';
      echo '<form id="loginUser" class="inputBox">';
        echo '<p>Username <input type="text"></input></br></p>';
        echo '<p>Password <input type="password"></input></br></p>';
        echo '<button class="btnbottom" type="submit">Login</button>';
      echo '</form>';
    echo '</div>';
      
    echo '<div id="newAccount" class="credentials">';
      echo '<form id="createNew" class="inputBox">';
        echo '<p>New Username <input type="text"></input></br></p>';
        echo '<p>New Password <input type="password"></input></br></p>';
        echo '<button class="btnbottom" type="submit">Create a new account</button>';
    echo '</div>';
    echo '<div class="btnbottom" id="hideLoginDiv">Hide Login</div>';
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
  $destLat = 44.568910;
  $destLon = -123.268810;
  $phpArray = array(floatval($curLat), floatval($curLon), $destLat, $destLon);
  //var_dump($curLat); 
  // originLan, originLon, destLan, destLon
  // for testing:
  $curLat1 = 44.564171;
  $curLon1 = -123.277672;
  
  
  // real output inc!
  $name = "Taco Bell";
  $rating = 4;
  $clean = 3;
  $purchase = FALSE;
  $bidet = FALSE;
  $squat = FALSE;
  $tpStash = TRUE;
  $soap = TRUE;
  echo '<p>Origin: <span id="originLan">'.$curLat1.'</span> , 
    <span id="originLon">'.$curLon1.' >>> ';
  echo 'Destination: <span id="destLat">'.$destLat.'</span> , 
    <span id="destLon">'.$destLon.'</br></p>';
  echo '<p id = "name">Name:'.$name.'</br></p>';
  echo '<p>Rating: '.$rating.'/5</br></p>';
  echo '<p>Cleanliness: '.$clean.'/5</br></p>';
  echo '<p>The bathroom has: ';
  if ($purchase) {
    echo 'purchase required, ';
  }
  if ($bidet) {
    echo 'a bidet, ';
  }
  if ($squat) {
    echo 'a squat toilet, ';
    
  }
  if ($tpStash) {
    echo 'ample toilet paper, ';
  }
  if ($soap) {
    echo 'soap';
  }
  echo '</p>';
  
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