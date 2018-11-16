module.exports = ({email, first, last, resetPasswordToken}, l) => ({
    text: `
${l['Hi']} ${first} ${last}.
${l['Here is your reset password']} ${l['link']}
http://localhost:8080/reset-password?email=${email}&token=${resetPasswordToken}

`,
    html: `
<html>
<head>
<style>
    body {
        background-color: #5a6268;
    }
    
    a {
        color: red;
        text-decoration: none;
    }
</style>

</head>
<body>
<h3>${l['Hi']}</h3>
<strong>${first} ${last}</strong>.
<br>
${l['Here is your reset password']} 
<a style="color:red;" href="http://localhost:8084/reset-password?email=${email}&token=${resetPasswordToken}">${l['link']}</a><br>
</body>
</html>

`});
