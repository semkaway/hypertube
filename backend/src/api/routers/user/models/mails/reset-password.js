const letter = (firstName, lastName, token) => `

<h3>Hi</h3>
<strong>${firstName} ${lastName}</strong>.
<br>
Here is your reset password 
<a href="localhost:8080/reset-password/${token}">Link</a><br>

`;

export default letter;
