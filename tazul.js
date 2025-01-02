
const loadAllProduct = () => {
  document.getElementById("handleAdd").addEventListener("click", () => {
    const inputValue = document.getElementById("search-box").value;
    const container = document.getElementById("coment-container");
    const detailsContainer = document.getElementById("food-details");

    if (inputValue === "") {
      alert("Please enter a search term!");
      return;
    }

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.meals) {
          displayData(data.meals);
          detailsContainer.classList.add("hidden"); // Hide details if a new search occurs
        } else {
          container.innerHTML = `<p class="error-message">No food found!</p>`;
          detailsContainer.classList.add("hidden");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        container.innerHTML = `<p class="error-message">An error occurred. Please try again later.</p>`;
      });

    document.getElementById("search-box").value = "";
  });

  const displayData = (meals) => {
    const container = document.getElementById("coment-container");
    container.innerHTML = "";

    meals.forEach((food) => {
      const div = document.createElement("div");
      div.classList.add("food-item");

      div.innerHTML = `
        <img class="foodImg" src="${food.strMealThumb}" alt="${food.strMeal}">
        <p class="foodName">${food.strMeal}</p>
      `;

      div.addEventListener("click", () => displayDetails(food));
      container.appendChild(div);
    });
  };

  const displayDetails = (food) => {
    const detailsContainer = document.getElementById("food-details");
    detailsContainer.classList.remove("hidden");

    detailsContainer.innerHTML = `
      <img class = "images" src="${food.strMealThumb}" alt="${food.strMeal}">
      <h2 class = "names">${food.strMeal}</h2>
      <h4>Ingrediants</h4>
      <p>1.${food.strIngredient1}</p>
      <p>2.${food.strIngredient2}</p>
      <p>3.${food.strIngredient3}</p>
      <p>4.${food.strIngredient4}</p>
      <p>5.${food.strIngredient5}</p>
      <p>6.${food.strIngredient6}</p>
      <p>7.${food.strIngredient7}</p>
    `;
  };
};

loadAllProduct();
