import axios, { AxiosResponse } from 'axios';
import urlExists from 'url-exist'


/**
 * Returns a list of all pokemon names
 * @returns {Promise<any>}
 */
export async function getAllPokemonNames(): Promise<any> {
    const response: AxiosResponse<any> = await axios.get('https://pokegoapi.xanderhk.nl/');
    return await response.data.results
}


/**
 * 
 * @param id 
 * @returns {Promise<any>} 
 */
export async function getPokemon(id: number): Promise<any> {
    const url: string = `https://pokegoapi.xanderhk.nl/pokemon?id=${id}`;
    const exists: boolean = await urlExists(url);
    if (!exists) return;
    const response = await axios.get(url).then(res => {
        return res.data
    }).catch((error) => {
        console.log(error);
    })
    return await response
}