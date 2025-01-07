const backendUrl = 'http://localhost:3000/getPhoneNumber';  // URL of the backend API

const stores = [
  { id: "store-1", placeId: "ChIJN1t_tDeuEmsRUsoyG83frY4", open: "09:00", close: "18:00" },
  { id: "store-2", placeId: "ChIJp0lN2HIRwokRL5ijvGzDO3Y", open: "09:00", close: "17:00" },
];

// Fetch phone number for each store from the backend
stores.forEach(store => {
  fetch(`${backendUrl}?placeId=${store.placeId}`)
    .then(response => response.json())
    .then(data => {
      if (data.result) {
        const phoneNumber = data.result.formatted_phone_number || "N/A";
        document.getElementById(`phone-${store.id.split('-')[1]}`).textContent = phoneNumber;
      } else {
        console.error(`Error fetching phone for ${store.id}:`, data.error_message);
      }
    })
    .catch(error => console.error("Error:", error));
});

// Function to check store status
function checkStoreStatus(storeId, openTime, closeTime) {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  const [openHour, openMinute] = openTime.split(":").map(Number);
  const [closeHour, closeMinute] = closeTime.split(":").map(Number);

  const isOpen =
    (currentHour > openHour || (currentHour === openHour && currentMinute >= openMinute)) &&
    (currentHour < closeHour || (currentHour === closeHour && currentMinute <= closeMinute));

  const statusElement = document.querySelector(`#${storeId} .status`);
  if (isOpen) {
    statusElement.textContent = "Open Now";
  } else {
    statusElement.textContent = "Closed Now";
  }
}

// Check status for all stores
stores.forEach(store => {
  checkStoreStatus(store.id, store.open, store.close);
});
