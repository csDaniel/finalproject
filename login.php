<?php 
ini_set('display_errors', 1);
error_reporting(E_ALL);

function init() { 
  echo '<class = "container" id="loginContainer">';
    echo '<div id="loginChild">';
      echo '<div id="logininfo" class="credentials">';
        echo '</br>';
        echo '<form id="loginUser">';
          echo '<span>Username <input type="text"></input></span></br>';
          echo '<span>Password <input type="password"></input></span></br>';
          echo '<button class="btn btn-info" type="submit">Login</submit>';
        echo '</form>';
      echo '</div>';
      
      echo '<div id="newAccount" class="credentials">';
        echo '<form id="createNew">';
          echo '<span>New Username <input type="text"></input></span></br>';
          echo '<span>New Passowrd <input type="password"></input></span></br>';
          echo '<button class="btn btn-info" type="submit">Create New Account</submit>';
      echo '</div>';
      echo '<button type="button" class="btn btn-default btn-lg">';
            echo '<span class="glyphicon glyphicon-minus" aria-hidden="true" onclick="hideLogin()"></span>';
          echo '</button>';
    echo '</div>';
  echo '</class>';
 }

function login() {
  
  echo '<class = "container">';
    echo '<div class="credentials">';
      echo '<p>Welcome to the page!</p>';
    echo '</div>';
  echo '</class>';
  
}

if (isset($_REQUEST['action'])) {
  $action = $_REQUEST['action'];
  
  if ($action == 'init') {
    init();
  } elseif ($action == 'login') {
    echo '<p>sorry!</p>';
  } elseif ($action == 'makeNew') {
    echo '<p>making new!</p>';
  }
  
}
?>