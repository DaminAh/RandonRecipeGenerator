const meal_api = "https://www.themealdb.com/api/json/v1/1/random.php";
const NewApiBtn = document.querySelector("#new-recepie");
const TweetBtn = document.querySelector("#tweet-recepie");
const Loader = document.querySelector(".loader");
const main_Container = document.querySelector("main");
let errCount = 0;
async function getRandomRecepie() {
  showLoader();
  const wait = setTimeout(() => {
    console.log("waited");
  }, 20000);

  try {
    const RecipeCallResponse = await fetch(meal_api);
    if (!RecipeCallResponse.ok) {
      throw new Error("Failed to fetch random recipe");
    }
    const Recipe = await RecipeCallResponse.json();
    if (!(Recipe.meals.length >= 0)) {
      throw new Error("Random recipe content empty");
    }
    document.querySelector(".Recepe-Container p").innerHTML =
      Recipe.meals[0].strInstructions;
    document.querySelector(".Recepe-Container h3").innerHTML =
      Recipe.meals[0].strMeal;
    hideLoader();
  } catch (error) {
    hideLoader();
    errCount++;
    if (errCount === 10) {
      console.log("Could not fetch recipe --call count : --10--");
      return;
    }
    getRandomRecepie();
  }
}
function showLoader() {
  Loader.hidden = false;
  main_Container.hidden = true;
}
function hideLoader() {
  Loader.hidden = true;
  main_Container.hidden = false;
}

NewApiBtn.addEventListener("click", getRandomRecepie);
