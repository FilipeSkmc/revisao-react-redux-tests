import { baseURL } from '../utils/types';

export const fetchCharacters = async () => {
    const request = await fetch(`${baseURL}/?limit=20&skip=387`);
    const response = await request.json();

    return response;
}
