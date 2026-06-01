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

// ======================================
// INITIAL RENDER
// ======================================

renderPlantCards(plantCollection);

updatePlantCounter();

// ======================================
// EVENT LISTENERS
// ======================================

plantTrackerForm.addEventListener(
  "submit",
  addPlantCard
);

// ======================================
// ADD PLANT
// ======================================

function addPlantCard(event) {

  event.preventDefault();

  if (plantNameInput.value.trim() === "") {

    validationMessage.textContent =
      "Plant name is required.";

    return;
  }

  if (
    waterInput.value < 1 ||
    waterInput.value > 30
  ) {

    validationMessage.textContent =
      "Water schedule must be 1-30 days.";

    return;
  }

  validationMessage.textContent = "";

  const plantObject = {

    id: Date.now(),

    plantName: plantNameInput.value,

    sunlight: sunlightSelect.value,

    wateringDays: waterInput.value,

    healthy: false,
  };

  plantCollection.push(plantObject);

  savePlantData();

  renderPlantCards(plantCollection);

  updatePlantCounter();

  alert("Plant added successfully!");

  plantTrackerForm.reset();
}

// ======================================
// RENDER CARDS
// ======================================

function renderPlantCards(plantArray) {

  plantCardContainer.innerHTML = "";

  const cardFragment =
    document.createDocumentFragment();

  plantArray.forEach((singlePlant) => {

    const plantCard =
      document.createElement("div");

    plantCard.classList.add("plant-card");

    if (singlePlant.healthy) {

      plantCard.classList.add(
        "healthyPlant"
      );
    }

    plantCard.innerHTML = `
      <h3>${singlePlant.plantName}</h3>

      <p>
        <strong>Sunlight:</strong>
        ${singlePlant.sunlight}
      </p>

      <p>
        <strong>Water Every:</strong>
        ${singlePlant.wateringDays} days
      </p>
    `;

    plantCard.setAttribute(
      "data-id",
      singlePlant.id
    );

    cardFragment.appendChild(plantCard);
  });

  plantCardContainer.appendChild(
    cardFragment
  );
}

// ======================================
// UPDATE COUNTER
// ======================================

function updatePlantCounter() {

  plantCounterText.textContent =
    `Total Plants: ${plantCollection.length}`;
}

// ======================================
// SAVE LOCAL STORAGE
// ======================================

function savePlantData() {

  localStorage.setItem(
    "plantVault",
    JSON.stringify(plantCollection)
  );
}