import {ADD_UID} from './uidTypes';

const uidReducer = (state = '', action: {type: any; payload: String}) => {
  switch (action.type) {
    case ADD_UID:
      return action.payload;
    default:
      return state;
  }
};

export default uidReducer;
