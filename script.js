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

      <div class="card-action-row">

        <button class="healthBtn">
          Healthy
        </button>

        <button class="removeBtn">
          Remove
        </button>

      </div>
    `;

    plantCard.setAttribute(
      "data-id",
      singlePlant.id
    );

    const healthBtn =
      plantCard.querySelector(".healthBtn");

    const removeBtn =
      plantCard.querySelector(".removeBtn");


    // MARK HEALTHY
    healthBtn.addEventListener(
      "dblclick",
      function(event) {

        const chosenCard =
          event.target.parentNode.parentNode;

        chosenCard.classList.toggle(
          "healthyPlant"
        );

        singlePlant.healthy =
          !singlePlant.healthy;

        savePlantData();
      }
    );

    // DELETE CARD
    removeBtn.addEventListener(
      "click",
      function(event) {

        const confirmDelete =
          confirm(
            "Remove this plant?"
          );

        if (!confirmDelete) {
          return;
        }

        const selectedCard =
          event.target.parentNode.parentNode;

        const selectedId =
          Number(
            selectedCard.getAttribute(
              "data-id"
            )
          );

        plantCollection =
          plantCollection.filter(
            (plant) => {

            return plant.id !== selectedId;
          });

        selectedCard.remove();

        savePlantData();

        updatePlantCounter();
      }
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

// ======================================
// SEARCH
// ======================================

function searchPlants() {

  const typedValue =
    searchPlantInput.value.toLowerCase();

  const matchedPlants =
    plantCollection.filter((plant) => {

      return plant.plantName
        .toLowerCase()
        .includes(typedValue);
    });

  renderPlantCards(matchedPlants);
}

// ======================================
// FILTER
// ======================================

function filterPlants(event) {

  const selectedLight =
    event.target.dataset.light;

  if (selectedLight === "All") {

    renderPlantCards(plantCollection);

    return;
  }

  const filteredPlants =
    plantCollection.filter((plant) => {

      return (
        plant.sunlight === selectedLight
      );
    });

  renderPlantCards(filteredPlants);
}

// ======================================
// DARK MODE
// ======================================

function toggleThemeMode() {

  document.body.classList.toggle(
    "darkMode"
  );
}
