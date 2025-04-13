// Fetch IPs and hide them
fetch('/api/ips')
  .then(res => res.json())
  .then(data => {
    const hiddenDiv = document.createElement('div');
    hiddenDiv.style.display = 'none';
    hiddenDiv.id = 'hidden-ip-list';
    hiddenDiv.textContent = JSON.stringify(data.allIPs);
    document.body.appendChild(hiddenDiv);
  });

// Ask for geolocation
if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };

      // Send to backend
      fetch('/api/location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(coords)
      });
    },
    (error) => {
      console.warn('Geolocation denied or unavailable.', error);
    }
  );
}
