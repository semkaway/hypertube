module.exports = ({first, activationToken}, l, config) => ({
    text: `
${l['Hello']} ${first}!
${l['text']} ${l['activate']}
http://${config.front}/activate?token=${activationToken}
${l['footer']} ${l['signature']}
${l['disclaimer']}

`,
    html: `
<html>
  <div class="container">
    <h3>${l['Hello']}, ${first}!</h3>
    <p>${l['text']}</p>
    <br>
    <button>
      <a href="http://${config.front}/activate?token=${activationToken}">${l['activate']}</a>
    </button>
    <br>
    ${l['footer']}<br>
    <div class="tooltip">${l['signature']}
      <span class="tooltiptext">
          <img src="https://cdn.intra.42.fr/users/medium_pkolomiy.jpg">
      </span>
    </div>
    <br>
    <hr>
    <p class="disclaimer">${l['disclaimer']}</p>
  </div>
</html>

<style>
    html {
        background-image: linear-gradient(to bottom right, #f5f7fa , #90A4AE);
        font-size: 1.2rem;
        height: 100%;
    }

    h3 {
      text-align: center;
    }

    .container {
      width: 650px;
      margin: 0 auto;
      padding: 20px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      margin-top: 4px;
      border-radius: 4px;
      background-color: rgba(255, 255, 255, 0.4);
    }

    p {
      margin-bottom: 20px;
    }

    button {
      margin: 0 auto;
      display:block;
      margin-bottom: 20px;
      padding: 13px;
      border: none;
      border-radius: 4px;
      background-color: #78909C;
    }

    button:hover {
      background-color: #90A4AE;
    }

    a {
      text-decoration: none;
      text-transform: uppercase;
      font-size: 0.9rem;
      color: #EEEEEE;
    }

    .disclaimer {
      margin-top: 10px;
      font-size: 0.7rem;
      text-color: #757575;
    }

    .tooltip {
      position: relative;
      display: inline-block;
    }

    .tooltip .tooltiptext {
      visibility: hidden;

      position: absolute;
      z-index: 1;
      top: -5px;
      left: 105%;
    }

    .tooltiptext img {
      height: 50px;
      border-radius: 4px;
    }

    .tooltip:hover .tooltiptext {
      visibility: visible;
    }
</style>

`});
