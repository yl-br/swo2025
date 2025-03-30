document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("joinBtn");
  const container = document.getElementById("balloonContainer");
  const message = document.getElementById("message");
  const emailInput = document.getElementById("emailInput");
  const sendBtn = document.getElementById("sendBtn");
  const airplaneContainer = document.getElementById("airplaneContainer");

  function createBalloon() {
    const balloon = document.createElement("div");
    balloon.classList.add("balloon");

    const hue = Math.floor(Math.random() * 360);
    const xShift = `${Math.random() * 200 - 100}px`;
    const left = `${Math.random() * 100}%`;

    balloon.style.setProperty('--hue', hue);
    balloon.style.setProperty('--x', xShift);
    balloon.style.left = left;

    container.appendChild(balloon);

    setTimeout(() => balloon.remove(), 3000);
  }

  btn.addEventListener("click", () => {
    const interval = setInterval(createBalloon, 100);
    setTimeout(() => clearInterval(interval), 3000);

    const randomNum = Math.floor(Math.random() * (7000 - 11 + 1)) + 11;
    message.textContent = `אתה המצטרף מספר: ${randomNum}`;
    setTimeout(() => message.textContent = '', 2000);

    emailInput.style.display = "inline-block";
    sendBtn.style.display = "inline-block";

    for (let i = 0; i < 5; i++) {
      const plane = document.createElement("div");
      plane.classList.add("airplane");
      plane.style.top = `${50 + Math.random() * 20}%`;
      plane.style.left = '-100px';
      airplaneContainer.appendChild(plane);
      setTimeout(() => plane.remove(), 5000);
    }
  });

  sendBtn.addEventListener("click", () => {
    const email = emailInput.value.trim();
    if (!email || !email.includes('@')) {
      alert("נא להזין כתובת אימייל חוקית");
      return;
    }

    fetch('/submit-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
    .catch(err => {
      console.error('Error sending email:', err);
      alert("שגיאה בחיבור לשרת");
    })
    .finally(() => {
      emailInput.value = '';
      for (let i = 0; i < 10; i++) {
        const plane = document.createElement("div");
        plane.classList.add("airplane");
        plane.style.top = `${50 + Math.random() * 20}%`;
        plane.style.left = '-100px';
        airplaneContainer.appendChild(plane);
        setTimeout(() => plane.remove(), 5000);
      }
    });
  });
});
