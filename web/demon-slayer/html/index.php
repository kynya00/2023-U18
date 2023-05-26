<?php
    session_start();
    $_SESSION['status']=null;
    $flag="HZU18{hell0_fr0m_russian_d3m0nz_TJfDp}";
    try {
        if (isset($_GET['username']) && isset($_GET['password'])) {
            if (strcmp($_GET['username'], $flag)==0 && strcmp($_GET['password'], $flag)==0)
                $_SESSION['status']=$flag;
            else
                $_SESSION['status']="Invalid username or password";
        }
    } catch (Throwable $th) {
        $_SESSION['status']=$flag;
    }
?>
<!DOCTYPE html>
<html>
<head>
    <title>Demons</title>
    <link rel="stylesheet" href="styles/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Square+Peg&display=swap" rel="stylesheet">
    <meta charset="UTF-8">
    <meta name="description" content="anime">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <div class="background">
       <video autoplay loop muted id="video">
            <source src="videos/anime - 01.mp4" type="video/mp4">
        </video>
        <div class="middle-text">
                <centre> <h1> are you demon slayer? </h1> </centre>
            <form action="" method="GET">
                <div class="input">
                     <label>Username</label><input type="text" placeholder="Enter Your Username" name="username" id="name" required>
                </div>
                <div class="input">
                    <label>Password</label><input type="password" placeholder="Enter Your Password" name="password" id="pass" required>
                </div>
                <div>
                    <input type="submit" value="Login" name="submit" id="button">
                </div>
                </div>
                <div class="top-text">
                <?php echo '<h1>' . $_SESSION['status'] . '</h1>'; ?>
                </div>
            </form>
            </div>
          </div>
        </div>
</body>
</html>
