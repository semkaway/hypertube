module.exports = (email, firstName, lastName, token) => ({
    text: `
Привет ${firstName} ${lastName}.
Ссылка на восстановление пароля
http://localhost:8080/activate?email=${email}&token=${token}

`,
    html: `
<h3>Привет</h3>
<strong>${firstName} ${lastName}</strong>.
<br>
Для восстановление пароля вот 
<a href="http://localhost:8080/activate?email=${email}&token=${token}">Ссылка</a>
<br>

`});
