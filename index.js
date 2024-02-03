const searchbox = document.querySelector('.searchBox');
const searchbtn = document.querySelector('.searchBtn');
const recipecontainer = document.querySelector('.recipe-container');
const recipeDetailContent = document.querySelector('.recipeDetailContent');
const closebtn = document.querySelector('.recipe-close-btn');
const section = document.getElementsByTagName('section');

const fetchrecp = async (quarry) =>{
    recipecontainer.innerHTML="Fetching Your Dishes....";
    const data  =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${quarry}`);
    const respose = await data.json();
    // console.log(respose.meals[0]);
    recipecontainer.innerHTML="";
    respose.meals.forEach(meal => {
        // console.log(meal);
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipeStyle');
        recipeDiv.innerHTML =`
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p><span>${meal.strCategory}<span> Categories</p>
        `
        const button = document.createElement('button');
        button.textContent = "View recipe";
        recipeDiv.appendChild(button)
        recipecontainer.appendChild(recipeDiv);

        // add Event listner for recipe detail button.
        button.addEventListener('click',()=>{
            displayDetails(meal);
        });
    });
}
searchbtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const uinput = searchbox.value.trim();
    fetchrecp(uinput);
    // console.log('btn clicked');
});
// fuction to fetch ingredients and measurement.
const fetchIngredients = (meal) =>{
    let ingredientslist ="";
    for(let i = 1; i<=20; i++){
        const ingredient =meal[`strIngredients${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientslist +=  `<li>${measure} ${ingredient}</li>`;
        }
        else{
            break;
        }
    }
    return ingredientslist;
}

const displayDetails = (meal) =>{
    recipeDetailContent.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul>${fetchIngredients}</ul>
    `
    recipeDetailContent.parentElement.style.display = "block";
}


