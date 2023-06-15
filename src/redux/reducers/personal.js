import { ADD_PERSONAL } from "../actions";

const INITIAL_STATE = {
  email: '',
}

const personal = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_PERSONAL:
    return {
      email: action.payload,
    }
  default:
    return state;
  }
};

export default personal;