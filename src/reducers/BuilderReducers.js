const BuilderReducers = (state = {}, action) => {
  switch (action.type) {
    case 'AddToSummary':
      return {
        ...state,

        restaurants: [
          ...state.restaurants.map((restaurant) => {
            if (restaurant === action.restaurant) {
              return {
                ...action.restaurant,
                Summary: [
                  ...action.restaurant.Summary,
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
      return {
        ...state,

        mealsAvailable: [
          {
            ...action.SummaryObject.meal,
          },
          ...state.mealsAvailable,
        ],

        restaurants: [
          ...state.restaurants.map((restaurant) => {
            if (restaurant === action.restaurant) {
              return {
                ...action.restaurant,
                Summary: [
                  ...action.restaurant.Summary.filter((SummaryObject) => {
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
      return {
        ...state,

        restaurants: [
          ...state.restaurants.map((restaurant) => {
            if (restaurant === action.restaurant) {
              return {
                ...action.restaurant,
                Summary: [
                  ...action.restaurant.Summary.map((SummaryObject) => {
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
      return {
        ...state,

        mealsAvailable: [
          ...action.restaurant.Summary,
          ...state.mealsAvailable,
        ],

        restaurants: [
          ...state.restaurants.map((restaurant) => {
            if (restaurant === action.restaurant) {
              return {
                ...action.restaurant,
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
export default BuilderReducers;