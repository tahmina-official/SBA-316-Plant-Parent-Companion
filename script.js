// ======================================
// CACHE DOM ELEMENTS
// ======================================

const plantTrackerForm =
    document.getElementById("plantTrackerForm");

const plantNameInput =
    document.getElementById("plantNameInput");

const sunlightSelect =
    document.getElementById("sunlightSelect");

const waterInput =
    document.getElementById("waterInput");

const validationMessage =
    document.getElementById("validationMessage");

const searchPlantInput =
    document.getElementById("searchPlantInput");

const filterButtons =
    document.querySelectorAll(".filterButton");

const themeToggleBtn =
    document.getElementById("themeToggleBtn");

const plantCardContainer =
    document.querySelector(".plantCardContainer");

const plantCounterText =
    document.getElementById("plantCounterText");

// ======================================
// LOCAL STORAGE
// ======================================

let plantCollection =
    JSON.parse(localStorage.getItem("plantVault"))
    || [];