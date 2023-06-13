### WRITEUP

```
Problem: You need to bypass htaccess
hint: source code has been released in web
```
###### Web ######

>Problem: **You need to bypass htaccess**
>
>Hint: source code has been released in web
After following the link, we see that there are some two files that contain our flags (/flag1/flag : /flag2/flag)

let's examine the source code that was given in the hint:
```nginx
First Flag
.htaccess:
RewriteEngine On
RewriteCond %{HTTP_HOST} !^localhost$
RewriteRule ".*" "-" [F]
?>
```
```nginx
Second Flag
.htaccess:
RewriteEngine On
RewriteCond %{THE_REQUEST} flag.txt
RewriteRule ".*" "-" [F]
```

hmm, here we see the .htaccess header, a little googling you can understand that we are faced with:

***.htaccess is a local configuration file of the Apache web server that allows you to manage site settings. 
Unlike the main configuration file, which allows you to configure the web server as a whole, .htaccess allows you to change settings for individual folders and users.***

yep, it's a config file, next we should look at each set parameter in the file, but I'll leave it at ***RewriteCond %{HTTP_HOST} !^localhost$ and RewriteCond %{THE_REQUEST} flag.txt***

looking at ***RewriteCond %{HTTP_HOST} !^localhost$***
tells us that if the Host header doesn't match the "localhost" string, the request is rewritten as denied. 
Fortunately, we can simply set the Host header in our request to a value of our choice. Why not use "localhost" then

***first exploit:***
```curl
#curl http://domain-name/flag1/flag.txt -H "Host: localhost"
HZ18{boje_moy_bro
```
looking at ***RewriteCond %{THE_REQUEST} flag.txt*** we can refer to official [apache](https://httpd.apache.org/docs/current/mod/mod_rewrite.html) documentation:
```
THE_REQUEST
The full HTTP request line sent by the browser to the server (e.g., "GET /index.html HTTP/1.1"). This does not include any additional headers sent by the browser. 
This value has not been unescaped (decoded), unlike most other variables below.
```
In simple words, we are not allowed to use any requests containing the string "flag", why don't we try to encode the string "flag" in the url?

***second exploit:*** 
```
curl http://domain-name/flag2/%66lag.txt
_u_found_me}
```
something went wrong... sorry, the problem was on our end. I just noticed when writing writeup that the first exploit does not work correctly. :laughing::laughing::laughing::laughing:

***
