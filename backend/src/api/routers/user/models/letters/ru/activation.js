module.exports = (email, firstName, lastName, token) => ({
    text: `
Привет ${firstName} ${lastName}.
Ссылка для активации профиля
http://localhost:8080/activate?email=${email}&token=${token}

`,
    html: `
<h3>Привет</h3>
<strong>${firstName} ${lastName}</strong>.
<br>
Для активации профиля вот 
<a href="http://localhost:8080/activate?email=${email}&token=${token}">Ссылка</a>
<br>

`});
