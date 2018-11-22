const initReducers = (state = {}, action) => {
  switch (action.type) {
    case 'ConnectNavigation':
      return {
        ...state,
        navigation: action.payload,
      };
    case 'SetRestaurants':
      return {
        ...state,
        restaurants: action.payload,
      };
    case 'SetWallet':
      return {
        ...state,
        wallet: action.payload,
      };
    case 'SetMealsAvailable':
      return {
        ...state,
        mealsAvailable: action.payload,
      };
    default:
      return state;
  }
}
export default initReducers;