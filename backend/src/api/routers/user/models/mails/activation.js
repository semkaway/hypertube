const letter = (firstName, lastName, token) => `
<h3>Hi</h3>
<strong>${firstName} ${lastName}</strong>, and welcome.
<br>
Here is an activation 
<a href="localhost:8080/activate/${token}">Link</a>
<br>

`;

export default letter;
