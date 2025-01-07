document.addEventListener("DOMContentLoaded", function () {
    // Menu Button
    const menuButton = document.getElementById("menu-button");
    const menuOptions = document.getElementById("menu-options");
    menuButton.addEventListener("click", function () {
        console.log("Menu button clicked"); // Debug log
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
            console.log(`${buttonId} clicked`); // Debug log
            // Hide all tabs
            document.querySelectorAll(".tab-content").forEach(tab => tab.style.display = "none");
            // Show the clicked tab
            document.getElementById(tabId).style.display = "block";
        });
    });
});
