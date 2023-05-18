<html>
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link rel="icon" type="image/png" href="icon.png">
        <link href="/style.css" rel="stylesheet"/>
        <title>Ubuntu</title>
    </head>
    <body>
        <!-- /?file= fetch-->
        <div class="bg"></div>
    </body>
</html>

<?php
    error_reporting(E_ERROR | E_PARSE);
    $file = str_replace('../', '', $_GET['file']); 
    include("/var/www/html/" . $file);
?>