// Function to check if a store is open based on current time
function checkStoreStatus(storeId, openTime, closeTime) {
  const storeCard = document.getElementById(storeId);
  if (!storeCard) {
    console.error(`Store card with ID ${storeId} not found.`);
    return; // Stop if the store card doesn't exist
  }

  const statusElement = storeCard.querySelector(".status-open, .status-closed");
  if (!statusElement) {
    console.error(`Status element not found for store ${storeId}`);
    return; // Stop if the status element doesn't exist
  }

  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  const [openHour, openMinute] = openTime.split(":").map(Number);
  const [closeHour, closeMinute] = closeTime.split(":").map(Number);

  const isOpen =
    (currentHour > openHour || (currentHour === openHour && currentMinute >= openMinute)) &&
    (currentHour < closeHour || (currentHour === closeHour && currentMinute <= closeMinute));

  if (isOpen) {
    statusElement.classList.remove("status-closed");
    statusElement.classList.add("status-open");
    statusElement.textContent = "Status: Open Now";
  } else {
    statusElement.classList.remove("status-open");
    statusElement.classList.add("status-closed");
    statusElement.textContent = "Status: Closed Now";
  }
}
// Event listener for the menu toggle
document.getElementById('menu-button').addEventListener('click', toggleMenu);

// Event listeners for tab switching
document.getElementById('reservation-button').addEventListener('click', function() {
    showTab('reservation');
});
document.getElementById('donater-now-button').addEventListener('click', function() {
    showTab('donater-now');
});
document.getElementById('volunteer-button').addEventListener('click', function() {
    showTab('volunteer');
});
document.getElementById('map-button').addEventListener('click', function() {
    showTab('map');
});

// Function to show the appropriate tab
function showTab(tabId) {
    var tabs = document.getElementsByClassName('tab-content');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }
    document.getElementById(tabId).classList.add('active');
}

// Function to toggle the menu visibility
function toggleMenu() {
    var menu = document.getElementById('menu-options');
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
}
// Initialize the map and display the store details using the Places API
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -33.866, lng: 151.196 },
    zoom: 15,
  });

  const request = {
    placeId: "ChIJN1t_tDeuEmsRUsoyG83frY4", // Example Place ID, replace dynamically if needed
    fields: ["name", "formatted_address", "formatted_phone_number", "place_id", "geometry"],
  };
  const infowindow = new google.maps.InfoWindow();
  const service = new google.maps.places.PlacesService(map);

  // Fetch details of the place using the Google Places Service
  service.getDetails(request, (place, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && place && place.geometry && place.geometry.location) {
      const marker = new google.maps.Marker({
        map,
        position: place.geometry.location,
        title: place.name,
      });

      // Display info window with place details on marker click
      google.maps.event.addListener(marker, "click", () => {
        const content = document.createElement("div");
        const nameElement = document.createElement("h2");
        nameElement.textContent = place.name;
        content.appendChild(nameElement);

        const placeIdElement = document.createElement("p");
        placeIdElement.textContent = `Place ID: ${place.place_id}`;
        content.appendChild(placeIdElement);

        const placeAddressElement = document.createElement("p");
        placeAddressElement.textContent = `Address: ${place.formatted_address}`;
        content.appendChild(placeAddressElement);

        // Check if the phone number is available and display it
        if (place.formatted_phone_number) {
          const placePhoneElement = document.createElement("p");
          placePhoneElement.textContent = `Phone: ${place.formatted_phone_number}`;
          content.appendChild(placePhoneElement);
        }

        infowindow.setContent(content);
        infowindow.setOptions({ ariaLabel: place.name });
        infowindow.open(map, marker);
      });
    } else {
      console.error("Failed to fetch place details:", status);
    }
  });
}
