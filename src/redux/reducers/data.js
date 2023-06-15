import { ADD_CHARACTERS, ADD_FAV, REMOVE_FAV } from "../actions";

const INITIAL_STATE = {
  characters: [],
  favorites: [],
}

const data = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_CHARACTERS:
    return {
      ...state,
      characters: [...action.payload]
    }  
  case ADD_FAV: 
    return {
      ...state,
      favorites: [...state.favorites, action.payload]
    }
  case REMOVE_FAV:
    return {
      ...state,
      favorites: [...state.favorites.filter(({ id }) => id !== action.payload.id)]
    }
  default:
    return state;
  }
};

export default data;