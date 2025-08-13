// Set the event date (MM-DD format, e.g., "12-25" for December 25)
const eventMonthDay = "12-25";

// Returns timestamp for the next occurrence of the event
function getNextEventStart() {
  const now = new Date();
  let year = now.getFullYear();
  let eventStart = new Date(`${year}-${eventMonthDay}T00:00:00`);

  // If today is after the event, use next year
  if (now > new Date(`${year}-${eventMonthDay}T23:59:59`)) {
    year += 1;
    eventStart = new Date(`${year}-${eventMonthDay}T00:00:00`);
  }

  return eventStart.getTime();
}

// Returns timestamp for the end of the event day (11:59:59 PM)
function getEventEnd(startTimestamp) {
  const end = new Date(startTimestamp);
  end.setHours(23, 59, 59, 999);
  return end.getTime();
}

// Set initial target dates
let startTimestamp = getNextEventStart();
let endTimestamp = getEventEnd(startTimestamp);

// Function to update countdown every second
function updateCountdown() {
  const now = new Date().getTime();

  // Case 1: Before the event starts
  if (now < startTimestamp) {
    const distance = startTimestamp - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML = `
      <div class="time-box"><span>${String(days).padStart(2, "0")}</span><div class="label">Days</div></div>
      <div class="time-box"><span>${String(hours).padStart(2, "0")}</span><div class="label">Hours</div></div>
      <div class="time-box"><span>${String(minutes).padStart(2, "0")}</span><div class="label">Minutes</div></div>
      <div class="time-box"><span>${String(seconds).padStart(2, "0")}</span><div class="label">Seconds</div></div>
    `;
  }

  // Case 2: During the event day
  else if (now >= startTimestamp && now <= endTimestamp) {
    const remaining = endTimestamp - now;

    const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

    document.getElementById("event").innerHTML = "🎉 The event is happening today!";

    document.getElementById("countdown").innerHTML = `
      <div class="time-box"><span>${String(hours).padStart(2, "0")}</span><div class="label">Hours Left</div></div>
      <div class="time-box"><span>${String(minutes).padStart(2, "0")}</span><div class="label">Minutes Left</div></div>
      <div class="time-box"><span>${String(seconds).padStart(2, "0")}</span><div class="label">Seconds Left</div></div>
    `;
  }

  // Case 3: After the event day ends, reset for next year
  else {
    const nextYear = new Date(startTimestamp).getFullYear() + 1;
    startTimestamp = new Date(`${nextYear}-${eventMonthDay}T00:00:00`).getTime();
    endTimestamp = getEventEnd(startTimestamp);
  }
}

// Run the countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial run
