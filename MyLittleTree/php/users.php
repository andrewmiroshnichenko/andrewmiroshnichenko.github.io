<?php
    $andrew = array ('name'=> 'Andrew', 'password' => '123', 'result' => array("auto", "blowoutservices", "bicycles"));
    $nick = array ('name'=> 'Nick', 'password' => '987', 'result' => array("health","homeservices","hotelstravel","localflavor"));
    // echo $arr['name'];
    if ($_POST['name'] == $andrew['name'] && $_POST['password'] == $andrew['password']) echo  json_encode($andrew['result']);;
    if ($_POST['name'] == $nick['name'] && $_POST['password'] == $nick['password']) echo  json_encode($nick['result']);;

?>