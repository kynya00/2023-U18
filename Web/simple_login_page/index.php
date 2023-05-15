<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$username = $_POST['username'];
	$password = $_POST['password'];

	$db = new PDO('sqlite:db.sqlite');

	$sql = "SELECT * FROM users WHERE password = " . $password;
	$result = $db->query($sql);
	$row = $result->fetch();

	if ($row) {
		$_SESSION['username'] = $username;
		header('Location: home.php');
		exit();
	} else {
		$error = 'Invalid username or password.';
	}
}

?>
<!DOCTYPE html>
<html>
<head>
	<title>Login</title>
</head>
<body>
	<?php if (isset($error)): ?>
		<p><?= $error ?></p>
	<?php endif ?>
	<form method="post">
		<label>
			Username:
			<input type="text" name="username" required>
		</label>
		<br>
		<label>
			Password:
			<input type="password" name="password" required>
		</label>
		<br>
		<button type="submit">Log in</button>
	</form>
</body>
</html>
