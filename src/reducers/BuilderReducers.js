const BuilderReducers = (state = {}, action) => {
  switch (action.type) {
    case 'AddToSummary':
      console.log('Adding to summary');
      var RestaurantIncome = NewRestaurantIncome('add', action.SummaryObject, action.Restaurant);
      var TotalIncome = (state.wallet.totalIncome || 0) + (RestaurantIncome || 0) - (action.Restaurant.RestaurantIncome || 0);
      return {
        ...state,
        wallet: {
          ...state.wallet,
          totalIncome: TotalIncome,
        },
        restaurants: [
          ...state.restaurants.map((restaurant) => {
            if (restaurant.Title == action.Restaurant.Title) {
              return {
                ...restaurant,
                RestaurantIncome: RestaurantIncome,
                Summary: [
                  ...restaurant.Summary,
                  action.SummaryObject,
                ]
              }
            }
            else {
              return restaurant;
            }
          }),
        ],

        mealsAvailable: [
          ...state.mealsAvailable.filter((meal) => {
            return meal !== action.SummaryObject.meal;
          })
        ]
      };

    case 'RemoveFromSummary':
      var RestaurantIncome = NewRestaurantIncome('remove', action.SummaryObject, action.Restaurant);
      var TotalIncome = (state.wallet.totalIncome || 0) + (RestaurantIncome || 0) - (action.Restaurant.RestaurantIncome || 0);
      return {
        ...state,
        wallet: {
          ...state.wallet,
          totalIncome: TotalIncome,
        },
        mealsAvailable: [
          action.SummaryObject.meal,
          ...state.mealsAvailable,
        ],
        restaurants: [
          ...state.restaurants.map((restaurant) => {
            if (restaurant.Title == action.Restaurant.Title) {
              return {
                ...restaurant,
                RestaurantIncome: RestaurantIncome,
                Summary: [
                  ...restaurant.Summary.filter((SummaryObject) => {
                    return SummaryObject.meal !== action.SummaryObject.meal;
                  })
                ]
              }
            }
            else {
              return restaurant;
            }
          }),
        ],
      };

    case 'UpdateSummaryObject':
      var RestaurantIncome = NewRestaurantIncome('update', action.SummaryObject, action.Restaurant);
      var TotalIncome = (state.wallet.totalIncome || 0) + (RestaurantIncome || 0) - (action.Restaurant.RestaurantIncome || 0);
      return {
        ...state,
        wallet: {
          ...state.wallet,
          totalIncome: TotalIncome,
        },
        restaurants: [
          ...state.restaurants.map((restaurant) => {
            if (restaurant.Title == action.Restaurant.Title) {
              return {
                ...restaurant,
                RestaurantIncome: RestaurantIncome,
                Summary: [
                  ...restaurant.Summary.map((SummaryObject) => {
                    if (SummaryObject.meal === action.SummaryObject.meal)
                      return action.SummaryObject;
                    else
                      return SummaryObject
                  })
                ]
              }
            }
            else {
              return restaurant;
            }
          }),
        ],
      }

    case 'ClearSummary':
      var RestaurantIncome = 0;
      var TotalIncome = (state.wallet.totalIncome || 0) + (RestaurantIncome || 0) - (action.Restaurant.RestaurantIncome || 0);
      return {
        ...state,
        wallet: {
          ...state.wallet,
          totalIncome: TotalIncome,
        },
        mealsAvailable: [
          ...action.Restaurant.Summary.map((summary) => { return summary.meal; }),
          ...state.mealsAvailable,
        ],

        restaurants: [
          ...state.restaurants.map((restaurant) => {
            if (restaurant.Title == action.Restaurant.Title) {
              return {
                ...restaurant,
                RestaurantIncome: RestaurantIncome,
                Summary: [],
              }
            }
            else {
              return restaurant;
            }
          }),
        ],
      }

    default:
      return state;
  }
}

const NewRestaurantIncome = (action, TargetSummaryObject, Restaurant) => {
  var summary = new nutritionEstimate();

  switch (action) {
    case 'add':
      Restaurant.Summary.forEach(summaryObject => {
        summary.add(summaryObject);
      });
      summary.add(TargetSummaryObject);
      return summary.getScore();

    case 'remove':
      Restaurant.Summary.forEach(summaryObject => {
        if (TargetSummaryObject.meal.name != summaryObject.meal.name)
          summary.add(summaryObject);
      });
      return summary.getScore();

    case 'update':
      Restaurant.Summary.forEach(summaryObject => {
        if (TargetSummaryObject.meal.name == summaryObject.meal.name)
          summary.add(TargetSummaryObject);
        else
          summary.add(summaryObject);
      });
      return summary.getScore();

    default:
      return 0;
  }
}

class nutritionEstimate {
  constructor() {
    this.numOfMeals = 0;
    this.arr = {
      totalCal: 0,
      fatCal: 0,
      carbCal: 0,
      proteinCal: 0,
    }
  }
  add(summaryObject) {
    this.numOfMeals++;
    this.arr.totalCal += summaryObject.meal.calories * summaryObject.value;
    this.arr.fatCal += summaryObject.meal.fat * summaryObject.value;
    this.arr.carbCal += summaryObject.meal.carbs * summaryObject.value;
    this.arr.proteinCal += summaryObject.meal.protein * summaryObject.value;
  }
  getScore() {
    return getRating(this.arr);
  }
}

const getRating = (nutritionEstimates) => {
  const totalCalTarget = 2000;
  const fatCalTarget = 0.268 * 2000;
  const carbCalTarget = 0.512 * 2000; // TODO fix value
  const proteinCalTarget = 0.22 * 2000; // TODO fix value

  var raw = 0;
  raw += calorieScore(nutritionEstimates["totalCal"], totalCalTarget);
  raw += fatScore(nutritionEstimates["fatCal"], fatCalTarget);
  raw += carbScore(nutritionEstimates["carbCal"], carbCalTarget);
  raw += proteinScore(nutritionEstimates["proteinCal"], proteinCalTarget);
  console.log('raw', raw);
  return raw * 25;
}

const quadraticScore = (value, targetValue, maxPercentDifference) => {
  var percentDifference = (value - targetValue) / targetValue;
  var score = (percentDifference + maxPercentDifference) * (maxPercentDifference - percentDifference) / (maxPercentDifference * maxPercentDifference);
  return Math.max(score, 0);
}

const calorieScore = (totalCal, totalCalTarget) => {
  return quadraticScore(totalCal, totalCalTarget, 0.20);
}

const fatScore = (fatCal, fatCalTarget) => {
  return quadraticScore(fatCal, fatCalTarget, 0.60);
}

const carbScore = (carbCal, carbCalTarget) => {
  return quadraticScore(carbCal, carbCalTarget, 0.60);
}

const proteinScore = (proteinCal, proteinCalTarget) => {
  return quadraticScore(proteinCal, proteinCalTarget, 0.60);
}

export default BuilderReducers;