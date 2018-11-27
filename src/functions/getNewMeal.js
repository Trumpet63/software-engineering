const axios = require("axios");

var getNewMeal = function (callback) {
	axios.get("http://api.yummly.com/v1/api/recipes",
		{
			params: {
				"_app_id": "8217ea62",
				"_app_key": "7e96c136252a08d6742d446f48722676",
				"maxResult": "10",
				"start": Math.floor(Math.random() * 1000000)
			}
		}
	).then(function (info) {
		// TODO: Add duplicate check here, choose a diff # if dupl
		var data = info.data.matches[Math.floor(Math.random() * 10)];
		if (data)
			return data;
	}).then(async function (firstCall) {
		if (firstCall) {
			var recipeId = firstCall.id;
			var secondCall = await axios.get("http://api.yummly.com/v1/api/recipe/" + recipeId,
				{
					params: {
						"_app_id": "8217ea62",
						"_app_key": "7e96c136252a08d6742d446f48722676"
					}
				}
			);
			// TODO: if too many nutrition values are missing, get a different meal
			var meal = {
				id: cleanText(secondCall.data.id),
				name: cleanText(secondCall.data.name),
				image: getRecipeImage(secondCall.data),
				ingredients: firstCall.ingredients && firstCall.ingredients.map((item) => { return cleanText(item) }),
				directions: secondCall.data.ingredientLines && secondCall.data.ingredientLines.map((item) => { return cleanText(item) }),
				calories: findNutritionValue(secondCall.data, 'ENERC_KCAL'),
				fat: findNutritionValue(secondCall.data, 'FAT_KCAL'),
				protein: findNutritionValue(secondCall.data, 'PROCNT'),
				carbs: findNutritionValue(secondCall.data, 'CHOCDF'),
			}
			return meal;
		}
	}).then(function (meal) {
		callback(meal);
	});
}

function getRecipeImage(recipe) {
	if (recipe.images[0].hostedSmallUrl != undefined)
		return recipe.images[0].hostedSmallUrl;
	else if (recipe.images[0].hostedMediumUrl != undefined)
		return recipe.images[0].hostedMediumUrl;
	else if (recipe.images[0].hostedLargeUrl != undefined)
		return recipe.images[0].hostedLargeUrl;
}

function findNutritionValue(recipe, nutrient) {
	var value = 0;
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