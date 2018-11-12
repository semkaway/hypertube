module.exports = (email, firstName, lastName, token) => ({
    text: `
Hi ${firstName} ${lastName}.
Here is your reset password link
http://localhost:8080/reset-password?email=${email}&token=${token}

`,
    html: `
<h3>Hi</h3>
<strong>${firstName} ${lastName}</strong>.
<br>
Here is your reset password 
<a href="http://localhost:8080/reset-password?email=${email}&token=${token}">Link</a><br>

`});
