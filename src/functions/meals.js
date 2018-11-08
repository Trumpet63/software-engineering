import { AsyncStorage } from 'react-native';
import { getNewRecipe } from '../functions/recipes';


const getNewMeal = (callback) => {
  getNewRecipe((meal) => {
    addMeal(meal, 'MEALS_AVAILABLE');
    callback(meal);
  });
}

const getAllMeals = (targetStorage, callback) => {
  try {
    AsyncStorage.getItem(targetStorage).then((meals) => {
      console.log(meals);
      if (meals != null)
        callback(JSON.parse(meals));
      else
        callback(null);
    });
  } catch (e) {
    console.error('Unable to retrieve available meals...');
    callback(null);
  }
}

const addMeal = (meal, targetStorage) => {
  getAllMeals('MEALS_AVAILABLE', (meals) => {
    if (meals == null) {
      meals = [];
    }
    meals.push(meal);
    AsyncStorage.setItem(targetStorage, JSON.stringify(meals)).catch((error) => {
      console.error(error);
    });
  });
}

const removeMeal = (meal, targetStorage) => {
  getAllMeals('MEALS_AVAILABLE', (meals) => {
    if (meals != null) {
      meals = meals.filter((item) => {
        return item != meal;
      });
      AsyncStorage.setItem(targetStorage, JSON.stringify(meals)).catch((error) => {
        console.error(error);
      });
    }
  }).catch((error) => {
    console.error(error);
  });;
}

export {addMeal, removeMeal, getAllMeals, getNewMeal}