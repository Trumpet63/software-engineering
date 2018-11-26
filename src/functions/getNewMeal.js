const axios = require("axios");

var getNewMeal = function (callback) {
	axios.get("http://api.yummly.com/v1/api/recipes",
		{
			params: {
				"_app_id": "8217ea62",
				"_app_key": "7e96c136252a08d6742d446f48722676",
				"maxResult": "100",
				"start": Math.floor(Math.random() * 1000000)
			}
		}
	).then(function (info) {
		return info.data.matches[Math.floor(Math.random() * 100)];
	}).then(async function (firstCall) {
		var meal = await getRecipeDetails(firstCall);
		callback(meal);
	});
}

async function getRecipeDetails(firstCall) {
	var recipeId = firstCall.id;
	var secondCall = await axios.get("http://api.yummly.com/v1/api/recipe/" + recipeId,
		{
			params: {
				"_app_id": "8217ea62",
				"_app_key": "7e96c136252a08d6742d446f48722676"
			}
		}
	);
	var recipe = {
		id: cleanText(secondCall.data.id),
		name: cleanText(secondCall.data.name),
		image: getRecipeImage(secondCall.data),
		ingredients: firstCall.ingredients && firstCall.ingredients.map((item) => { return cleanText(item) }),
		directions: secondCall.data.ingredientLines && secondCall.data.ingredientLines.map((item) => { return cleanText(item) }),
		calories: findNutritionValue(secondCall.data, 'ENERC_KCAL'),
		protein: findNutritionValue(secondCall.data, 'PROCNT'),
		sodium: findNutritionValue(secondCall.data, 'NA'),
		carbs: findNutritionValue(secondCall.data, 'CHOCDF'),
	}
	return recipe;
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

function cleanText(text) {
	if (text != undefined)
		text = text.replace(/[^-a-zA-Z0-9 '",.!?$;:+()]/g, '');
	return text;
}

export { getNewMeal }