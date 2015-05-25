<?php function init() { 
echo '<class = "container">';
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
echo '</class>';
 }



/*
<?php function init() { ?>
<class = "container">
  <div id="logininfo" class="credentials">
    </br>
    <form id="loginUser">
      <span>Username <input type="text"></input></span></br>
      <span>Password <input type="password"></input></span></br>
      <button class="btn btn-info" type="submit">Login</submit>
    </form>
  </div>
  
  <div id="newAccount" class="credentials">
    <form id="createNew">
      <span>New Username <input type="text"></input></span></br>
      <span>New Passowrd <input type="password"></input></span></br>
      <button class="btn btn-info" type="submit">Create New Account</submit>
  </div>
</class>
<?php } ?>
*/

if (isset($_REQUEST['action'])) {
  $action = $_REQUEST['action'];
  
  if ($action == 'init') {
    init();
  } elseif ($action == 'login') {
    echo "sorry!";
  }
  
}
?>