const btn = document.getElementById("joinBtn");
const container = document.getElementById("balloonContainer");

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
  const interval = setInterval(createBalloon, 100);
  setTimeout(() => clearInterval(interval), 3000);
});
