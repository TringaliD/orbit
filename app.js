const map = L.map('map').setView([20, 0], 2);

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; CartoDB',
  maxZoom: 19
}).addTo(map);

const uploadBtn = document.getElementById("uploadBtn");
const photoInput = document.getElementById("photoInput");

uploadBtn.onclick = () => photoInput.click();

photoInput.onchange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  navigator.geolocation.getCurrentPosition(pos => {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;

    const reader = new FileReader();
    reader.onload = () => {
      const img = reader.result;

      const marker = L.marker([lat, lng]).addTo(map);

      marker.bindPopup(`
        <div style="text-align:center">
          <h3 style="margin:0 0 8px;color:#4ECCA3;font-size:16px;">Orbit</h3>
          <img src="${img}" style="width:160px;border-radius:10px;box-shadow:0 0 12px #4ECCA3;">
        </div>
      `);
    };

    reader.readAsDataURL(file);
  });
};
