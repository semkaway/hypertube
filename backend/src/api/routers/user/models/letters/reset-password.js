module.exports = ({first, resetPasswordToken}, l, config) => ({
    text: `
${l['Hi']} ${first}.
${l['Here is your reset password']} ${l['link']}
http://${config.front}/reset-password?token=${resetPasswordToken}

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
<strong>${first}</strong>.
<br>
${l['Here is your reset password']} 
<a style="color:red;" href="http://${config.front}/reset-password?token=${resetPasswordToken}">${l['link']}</a><br>
</body>
</html>

`});
