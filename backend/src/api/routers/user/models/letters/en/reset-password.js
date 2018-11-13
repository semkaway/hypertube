module.exports = (email, firstName, lastName, token) => ({
    text: `
Hi ${firstName} ${lastName}.
Here is your reset password link
http://localhost:8080/reset-password?email=${email}&token=${token}

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
<h3>Hi</h3>
<strong>${firstName} ${lastName}</strong>.
<br>
Here is your reset password 
<a style="color:red;" href="http://localhost:8080/reset-password?email=${email}&token=${token}">Link</a><br>
</body>
</html>

`});
