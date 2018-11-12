module.exports = (email, firstName, lastName, token) => ({
    text: `
Привіт ${firstName} ${lastName}.
Посилання для активації акаунту
http://localhost:8080/activate?email=${email}&token=${token}

`,
    html: `
<h3>Привіт</h3>
<strong>${firstName} ${lastName}</strong>.
<br>
Для активації акаунту ось 
<a href="http://localhost:8080/activate?email=${email}&token=${token}">Посилання</a>
<br>

`});
