function checkLogin() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  if (user === "Danifree" && pass === "free") {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("mainBox").style.display = "block";
  } else {
    alert("Invalid username or password");
  }
}

async function fetchData() {
  const number = document.getElementById("number").value.trim();
  const responseBox = document.getElementById("responseBox");
  const shareButton = document.getElementById("shareButton");

  if (!number) {
    alert("Please enter a phone number.");
    return;
  }

  responseBox.innerHTML = `<p style="color: #0f0;">Loading...</p>`;
  responseBox.style.display = "block";
  shareButton.style.display = "none";

  const url = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://fam-official.serv00.net/sim/api.php?num=${number}`)}`;

  try {
    const res = await fetch(url);
    const json = await res.json();
    const apiData = JSON.parse(json.contents);

    if (apiData.status === "success" && Array.isArray(apiData.data) && apiData.data.length > 0) {
      const user = apiData.data[0];
      const content = `
DANI JOIYA ★ Mobile: ${user.Mobile || "Not found"}
Name: ${user.Name || "Not found"}
CNIC: ${user.CNIC || "Not found"}
Address: ${user.Address || "Not found"}
Operator: ${user.Operator || "Not found"}
      `;
      responseBox.innerText = content;
      shareButton.style.display = "inline-block";
    } else {
      responseBox.innerHTML = `<p style="color: yellow; font-size: 18px; font-weight: bold;">Data Not Found</p>`;
      shareButton.style.display = "none";
    }
  } catch (e) {
    responseBox.innerHTML = `<p style="color: red; font-size: 18px; font-weight: bold;">Error fetching data. Please try again later.</p>`;
    shareButton.style.display = "none";
  }
}

function shareWhatsApp() {
  const responseBox = document.getElementById("responseBox");
  const text = encodeURIComponent(responseBox.innerText);
  const url = `https://wa.me/?text=${text}`;
  window.open(url, '_blank');
}

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const timeStr = `${hours}:${minutes}:${seconds} ${ampm}`;
  document.getElementById("clock").textContent = `Time: ${timeStr}`;
}
setInterval(updateClock, 1000);
updateClock();

navigator.getBattery?.().then(function(battery) {
  function updateBattery() {
    const level = Math.round(battery.level * 100);
    document.getElementById("battery").textContent = `Battery: ${level}%`;
    if (level < 20) {
      document.getElementById("lowBatteryAlert").play().catch(() => {});
    }
  }
  updateBattery();
  battery.addEventListener('levelchange', updateBattery);
}).catch(() => {
  document.getElementById("battery").textContent = "Battery info not supported.";
});
