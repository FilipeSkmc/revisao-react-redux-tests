import { fetchCharacters } from "../../helpers";

export const ADD_PERSONAL = 'ADD_PERSONAL';
export const ADD_CHARACTERS = 'ADD_CHARACTERS';
export const ADD_FAV = 'ADD_FAV';
export const REMOVE_FAV = 'REMOVE_FAV';

/** exemplo de action async */
const addCharacters = (characters) => ({
  type: ADD_CHARACTERS,
  payload: characters,
});

export const fetchCharactersForAdd = () => async (dispatch) => {
  const response = await fetchCharacters();
  dispatch(addCharacters(response));
};

/** ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ */

export const addFavorite = (favorite) => ({
  type: ADD_FAV,
  payload: favorite,
});

export const removeFavorite = (favorite) => ({
  type: REMOVE_FAV,
  payload: favorite,
})

export const addPersonal = (personal) => ({
  type: ADD_PERSONAL,
  payload: personal,
})
