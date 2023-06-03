<?php

function validateX($inp) {
    return isset($inp) && is_numeric($inp) && $inp >= -4 && $inp <= 4 && $inp * 2 == intval($inp * 2); 
}

function validateY($inp)
{
    if (!isset($inp)) return false;

    $Y_MIN = -3;
    $Y_MAX = 3;

    $y_num = str_replace(",", ".", $inp);
    return is_numeric($y_num) && $Y_MIN < $y_num && $y_num < $Y_MAX && strlen($inp) <= 5;
}

function validateR($inp) {
    return isset($inp) && is_numeric($inp) &&  $inp >= 1 && $inp <= 3 && $inp * 2 == intval($inp * 2);
}

function validateTimezone($inp) {
    return isset($inp) && is_numeric($inp) && abs($inp) <= 24 * 60;
}

function isSquareHit($x, $y, $r) {
    return ($x >= 0 && $y <= 0 && $x <= $r && $y >= -$r/2);
}

function isTriangleHit($x, $y, $r) {
    $hypotenuse = $y <= $x + $r/2.0;
    return ($x <= 0 && $y >= 0 &&  $hypotenuse);
}

function isCircleHit($x, $y, $r){
    $isInsideCircle = ($x*$x + $y*$y) <= ($r*$r)/4.0;
    return ($x <= 0 && $y <= 0 && $isInsideCircle);
}

function isBlueAreaHit($x, $y, $r) {
    return isCircleHit($x, $y, $r) || isTriangleHit($x, $y, $r) || isSquareHit($x, $y, $r);
}

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


$x = $_POST['x'];
$y = $_POST['y'];
$r = $_POST['r'];
    
    $isValid = validateR($r) && validateX($x) && validateY($y);
    $isBlueAreaHit = NULL;
    $userTime = NULL;
    $timePassed = NULL;
    if ($isValid) {
        $isBlueAreaHit = isBlueAreaHit($x, $y, $r);
        $userTime = @date('H:i:s', time() - $timezone * 60);
        $timePassed = round(microtime(true) - $_SERVER['REQUEST_TIME_FLOAT'], 4);
    }
    $response = array(
        "isValid" => $isValid,
        "isBlueAreaHit" => $isBlueAreaHit,
        "userTime" => $userTime,
        "execTime" => $timePassed,
        "x" => $x,
        "y" => (float) $y,
        "r" => $r);
echo json_encode($response);