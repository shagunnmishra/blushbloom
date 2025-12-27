// Cycle log
function logCycle() {
  const today = new Date().toISOString().slice(0,10);
  let cycles = JSON.parse(localStorage.getItem("cycles")) || [];
  cycles.push(today);
  localStorage.setItem("cycles", JSON.stringify(cycles));
  renderCycles();
}
function renderCycles() {
  let cycles = JSON.parse(localStorage.getItem("cycles")) || [];
  const list = document.getElementById("cycleList");
  list.innerHTML = "";
  cycles.forEach(date => {
    const li = document.createElement("li");
    li.textContent = date;
    list.appendChild(li);
  });
}

// Mood tracker
function saveMood() {
  const mood = document.getElementById("mood").value;
  let moods = JSON.parse(localStorage.getItem("moods")) || [];
  moods.push({date: new Date().toISOString().slice(0,10), mood});
  localStorage.setItem("moods", JSON.stringify(moods));
  renderMoods();
}
function renderMoods() {
  let moods = JSON.parse(localStorage.getItem("moods")) || [];
  const list = document.getElementById("moodList");
  list.innerHTML = "";
  moods.forEach(m => {
    const li = document.createElement("li");
    li.textContent = `${m.date}: ${m.mood}`;
    list.appendChild(li);
  });
}

// Reminders
function addReminder() {
  const date = document.getElementById("reminderDate").value;
  const msg = document.getElementById("reminderMsg").value;
  let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
  reminders.push({date, msg});
  localStorage.setItem("reminders", JSON.stringify(reminders));
  renderReminders();
}
function renderReminders() {
  let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
  const list = document.getElementById("reminderList");
  list.innerHTML = "";
  reminders.forEach(r => {
    const li = document.createElement("li");
    li.textContent = `${r.date}: ${r.msg}`;
    list.appendChild(li);
  });
}

// Comfort tips
const tips = [
  "Use a warm water bottle 🌸",
  "Drink herbal tea 🍵",
  "Take short walks 🚶‍♀️",
  "Listen to calming music 🎶"
];
function showTip() {
  const tip = tips[Math.floor(Math.random() * tips.length)];
  document.getElementById("tipBox").textContent = tip;
}

// Stats
function showStats() {
  let cycles = JSON.parse(localStorage.getItem("cycles")) || [];
  if (cycles.length > 1) {
    let diffs = [];
    for (let i = 1; i < cycles.length; i++) {
      let d1 = new Date(cycles[i-1]);
      let d2 = new Date(cycles[i]);
      diffs.push((d2 - d1) / (1000*60*60*24));
    }
    const avg = diffs.reduce((a,b)=>a+b,0)/diffs.length;
    alert("Average cycle length: " + Math.round(avg) + " days");
  }
}

// Initial render
renderCycles();
renderMoods();
renderReminders();
