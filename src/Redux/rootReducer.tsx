import {combineReducers} from 'redux';
import uidReducer from './Uid/uidReducer';

const rootReducer = combineReducers({
  uid: uidReducer,
});

export default rootReducer;
