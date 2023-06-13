### WRITEUP

```
Problem: You need to bypass authentication
hint: source code has been released
```
###### Web ######

>Problem: **You need to bypass authentication**
>
>Hint: source code has been released

After clicking on the link, we have a fairly simple login form: login and password.
let's examine the source code that was given in the hint:
```php
<?php
    session_start();
    $_SESSION['status']=null;
    $flag=REDACTED;
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
```
by analyzing the PHP source code, we can turn to an interesting and necessary line for us:
```php
if (strcmp($_GET['username'], $flag)==0 && strcmp($_GET['password'], $flag)==0)
```
here you could immediately copy the string and get into Google, which will tell you that juggling with PHP types is here

links:
[PHP type juggling](https://cybernetgen.com/auth-bypass-with-php-type-juggling/), [PHP strcmp](https://blog.0daylabs.com/2015/09/21/csaw-web-200-write-up/)

the vulnerability was that we could pass an array instead of a string, which would result in a NULL error, which in PHP == 0 and you can pick up the flag

***exploit: https://domain-name/?username[]=lol&password=lol&submit=Login***

***
