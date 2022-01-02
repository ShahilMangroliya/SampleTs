import {ADD_UID} from './uidTypes';

export const addUid = (data = '') => {
  return {
    type: ADD_UID,
    payload: data,
  };
};
