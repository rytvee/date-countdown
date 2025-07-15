function getNextChristmasDate() {
  const now = new Date();
  let year = now.getFullYear();
  const christmasThisYear = new Date(`${year}-12-25T00:00:00`);

  if (now > christmasThisYear) {
    year += 1; // If today is after Dec 25, target next year's Dec 25
  }

  return new Date(`${year}-12-25T00:00:00`).getTime();
}

let targetDate = getNextChristmasDate();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) {
    document.getElementById("countdown").innerHTML = "🎉 Merry Christmas!";
    clearInterval(countdownInterval);
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = String(days).padStart(2, "0");
  document.getElementById("hours").innerText = String(hours).padStart(2, "0");
  document.getElementById("minutes").innerText = String(minutes).padStart(2, "0");
  document.getElementById("seconds").innerText = String(seconds).padStart(2, "0");
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call
