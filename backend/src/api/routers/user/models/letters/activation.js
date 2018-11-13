module.exports = ({email, first, last, activationToken}, l) => ({
    text: `
${l['Hi']} ${first} ${last}, ${l['and welcome']}.
${l['Here is an activation']} ${l['link']}
http://localhost:8080/activate?email=${email}&token=${activationToken}

`,
    html: `
<html>
  <h3>${l['Hi']}</h3>
  <strong>${first} ${last}</strong>, ${l['and welcome']}.
  <br>
  ${l['Here is an activation']} 
  <a href="http://localhost:8080/activate?email=${email}&token=${activationToken}">${l['link']}</a>
  <br>
</html>

<style>
    html {
        background-color: #5a6268;
    }
</style>

`});
