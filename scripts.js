document.addEventListener("DOMContentLoaded", function () { 
    // Menu Button
    const menuButton = document.getElementById("menu-button");
    const menuOptions = document.getElementById("menu-options");
    menuButton.addEventListener("click", function () {
        menuOptions.style.display = menuOptions.style.display === "block" ? "none" : "block";
    });

    // Tab Buttons
    const tabButtons = {
        "reservation-button": "reservation",
        "donate-now-button": "donate-now",
        "volunteer-button": "volunteer",
        "map-button": "map"
    };

    // Event listeners for tab buttons
    Object.keys(tabButtons).forEach(buttonId => {
        const tabId = tabButtons[buttonId];
        document.getElementById(buttonId).addEventListener("click", function () {
            // Hide all tabs
            document.querySelectorAll(".tab-content").forEach(tab => tab.style.display = "none");
            // Show the clicked tab
            document.getElementById(tabId).style.display = "block";
        });
    });

    // Handle location toggle
    const locationToggleButton = document.getElementById("location-toggle-button");
    const mapFrame = document.getElementById("map-frame");

    locationToggleButton.addEventListener("click", function() {
        if (locationToggleButton.innerText === "Switch to My Location") {
            // Check if the browser supports geolocation
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    // Update map iframe src with user's location
                    mapFrame.src = `https://storage.googleapis.com/maps-solutions-plhwtgox7c/locator-plus/ttjf/locator-plus.html?lat=${lat}&lng=${lng}&zoom=12`;
                    locationToggleButton.innerText = "Switch to NYC"; // Update button text
                });
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        } else {
            // Switch back to NYC location
            mapFrame.src = "https://storage.googleapis.com/maps-solutions-plhwtgox7c/locator-plus/ttjf/locator-plus.html?lat=40.7128&lng=-74.0060&zoom=12";
            locationToggleButton.innerText = "Switch to My Location"; // Update button text
        }
    });
});
