const initReducers = (state = {}, action) => {
  switch (action.type) {
    case 'SetSelectedRestaurant':
      return {
        ...state,
        selectedRestaurant: action.payload,
      };
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
    case 'UpdateMoney':
      return {
        ...state,
        wallet: {
          ...state.wallet,
          Money: {
            ...action.payload,
          }
        },
      };
    default:
      return state;
  }
}
export default initReducers;