const axios = require("axios");

var getNewRecipe = function (callback) {
	var id = axios.get("http://api.yummly.com/v1/api/recipes",
		{
			params: {
				"_app_id": "8217ea62",
				"_app_key": "7e96c136252a08d6742d446f48722676",
				"maxResult": "100",
				"start": Math.floor(Math.random() * 1000000)
			}
		}
	).then(function (info) {
		return info.data.matches[Math.floor(Math.random() * 100)].id;
	}).then(function (id){
		getRecipeDetails(id).then(function(recipe){
			callback(recipe);
		});
	}).catch(function() {
		console.error("Unable to retrieve a new recipe.\nPlease try again later.");
	});
}

function getRecipeDetails(recipeId) {
	return axios.get("http://api.yummly.com/v1/api/recipe/" + recipeId,
		{
			params: {
				"_app_id": "8217ea62",
				"_app_key": "7e96c136252a08d6742d446f48722676"
			}
		}
	).then(function (info) {
		var item = info.data;
		var recipe = {
			id: item.id,
			name: item.name,
			servings: item.yield,
			image: getRecipeImage(item),
			calories: findNutritionValue(item, 'ENERC_KCAL'),
			protein: findNutritionValue(item, 'PROCNT'),
			sodium: findNutritionValue(item, 'NA'),
			carbs: findNutritionValue(item, 'CHOCDF'),
		}

		return recipe;
	});
}

function getRecipeImage(recipe) {
	if (recipe.images[0].hostedMediumUrl != undefined)
		return recipe.images[0].hostedMediumUrl;
	else if (recipe.images[0].hostedLargeUrl != undefined)
		return recipe.images[0].hostedLargeUrl;
	else if (recipe.images[0].hostedSmallUrl != undefined)
		return recipe.images[0].hostedSmallUrl;
}

function findNutritionValue(recipe, nutrient) {
	var value = '';
	recipe.nutritionEstimates.forEach(function (item) {
		if (item.attribute == nutrient)
			value = item.value;
	});
	return value;
}

export {getNewRecipe}