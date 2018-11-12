module.exports = (email, firstName, lastName, token) => ({
    text: `
Hi ${firstName} ${lastName}, and welcome.
Here is an activation link
http://localhost:8080/activate?email=${email}&token=${token}

`,
    html: `
<h3>Hi</h3>
<strong>${firstName} ${lastName}</strong>, and welcome.
<br>
Here is an activation 
<a href="http://localhost:8080/activate?email=${email}&token=${token}">Link</a>
<br>

`});
