import initReducers from './initReducers';
import BuilderReducers from './BuilderReducers';
import CollectionReducers from './CollectionReducers';

const AllReducers = (state = {}, action) => {
  var arr = [
    initReducers(state, action),
    BuilderReducers(state, action),
    CollectionReducers(state, action),
  ];

  var output = arr.filter((item) => {
    return item !== state;
  });

  switch (output.length) {
    case 0:
      console.log('ERROR: Action type not found in reducers...', action.type);
      break;
    case 1:
      return output[0];
    default:
      console.log('ERROR: Found multiple reducers with same action type...', action.type);
  }
}

export default AllReducers;