<?php
    $andrew = array ('name'=> 'Andrew', 'result' => array("auto", "blowoutservices", "bicycles"));
    $nick = array ('name'=> 'Nick', 'result' => array("health","homeservices","hotelstravel","localflavor"));
    // echo $arr['name'];
    if ($_POST['name'] == $andrew['name']) echo  json_encode($andrew['result']);;
    if ($_POST['name'] == $nick['name']) echo  json_encode($nick['result']);;

?>