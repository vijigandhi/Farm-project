<?php

$host = "localhost";
$db = "AIZEN";
$user = "dckap";
$password = "Dckap2023Ecommerce";
$charset = "utf8mb4";

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

try{
    $pdo = new PDO($dsn,$user,$password);
}
catch(\PDOException){
    throw new \PDOException($e->getMessage(),(int)$e->getCode());
}