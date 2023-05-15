<?php
session_start();

if (!isset($_SESSION['username'])) {
  header('Location: index.php');
  exit();
}

$username = $_SESSION['username'];
?>
<!DOCTYPE html>
<html>
<head>
  <title>Dashboard</title>
</head>
<body>
  <h1>Welcome, <?= $username ?>!</h1>
  <p>You have successfully logged in. HZU18{5!mPL3_SQL_1nj333333ctiii0n}</p>
</body>
</html>
