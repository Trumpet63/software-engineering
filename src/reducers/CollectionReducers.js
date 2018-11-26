const CollectionReducers = (state = {}, action) => {
  switch (action.type) {
    case 'AddNewMeal':
      console.log('Retrieving a new meal...');
      return {
        ...state,

        mealsAvailable: [
          action.payload,
          ...state.mealsAvailable,
        ]
      };

    default:
      return state;
  }
}
export default CollectionReducers;