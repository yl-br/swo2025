const btn = document.getElementById("joinBtn");
const container = document.getElementById("balloonContainer");
const message = document.getElementById("message");

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

  setTimeout(() => {
    balloon.remove();
  }, 3000);
}

btn.addEventListener("click", () => {
  // Start balloons
  const interval = setInterval(createBalloon, 100);
  setTimeout(() => clearInterval(interval), 3000);

  // Show message
  const randomNum = Math.floor(Math.random() * (7000 - 11 + 1)) + 11;
  message.textContent = `אתה המצטרף מספר: ${randomNum}`;
  setTimeout(() => {
    message.textContent = '';
  }, 2000);
});
