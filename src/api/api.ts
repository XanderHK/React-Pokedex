import axios, { AxiosResponse } from 'axios';
import urlExists from 'url-exist'

/**
 * Returns a list of all pokemon names
 * @returns {Promise<any>}
 */
export async function getAllPokemonNames(): Promise<any> {
    const response: AxiosResponse<any> = await axios.get('https://pokeapi.co/api/v2/pokemon-species/?limit=20000');
    return response.data.results.map((item: any) => {
        const pokemon: { name: string, id: number } = { name: '', id: 0 };
        pokemon.name = item.name;
        pokemon.id = item.url.replace("https://pokeapi.co/api/v2/pokemon-species/", "").slice(0, -1);
        return pokemon;
    })
}

/**
 * 
 * @param url 
 * @returns {Promise<any>}
 */
async function getPokemonDescription(url: string): Promise<any> {
    const exists: boolean = await urlExists(url);
    if (!exists) return;
    const response: AxiosResponse<any> = await axios.get(url);
    return response.data.flavor_text_entries.find((entry: any) => {
        if (entry.language.name === "en") return entry;
        return null;
    }).flavor_text.replace("\f", " ").replace("POKéMON", "Pokémon");
}

/**
 * 
 * @param object 
 * @returns 
 */
function getNamesFromEvoChain(object: any): any {
    const arr: any = [];
    if (object !== undefined && object.species !== undefined && object.species.name !== undefined) {
        arr.push(object.species.name);
        if (object.evolves_to[0] !== undefined) {
            arr.push(getNamesFromEvoChain(object.evolves_to[0]));
        }
        return arr.flat();
    }
    return false;
}

/**
 * 
 * @param name 
 * @returns 
 */
export function getSpriteFromPokemon(name: string): Promise<any> {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    return axios.get(url).then(res => res.data.sprites.front_default)

}

/**
 * 
 * @param url 
 * @returns {Promise<any>}
 */
export async function getEvolutionChain(url: string): Promise<any> {
    const exists: boolean = await urlExists(url);
    if (!exists) return;
    const evolutionChain: AxiosResponse<any> = await axios.get(url).then(async res => await axios.get(res.data.evolution_chain.url));
    const baseEvolution: string = evolutionChain.data.chain.species.name;
    const evolutionNames: string[] = getNamesFromEvoChain(evolutionChain.data.chain.evolves_to[0])
    if (!evolutionNames) {
        return [];
    }
    evolutionNames.unshift(baseEvolution)
    return evolutionNames;
}

/**
 * 
 * @param name 
 */
export async function getPokemonByName(name: string) {
    const url: string = `https://pokeapi.co/api/v2/pokemon/${name}`;
    const exists: boolean = await urlExists(url);
    if (!exists) return;
    return await axios.get(url).then(async res => await res.data);
}

/**
 * 
 * @param id 
 * @returns {Promise<any>} 
 */
export async function getPokemon(id: number): Promise<any> {
    const url: string = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const exists: boolean = await urlExists(url);
    if (!exists) return;
    const response = await axios.get(url)
        .then(res => {
            return res.data
        })
        .catch((error) => {
            console.log(error);
        })
    response.formattedStats = response.stats.map((stat: any) => {
        return { statAmount: stat.base_stat, statName: stat.stat.name };
    });
    response.description = await getPokemonDescription(response.species.url);
    response.evolutionChain = await getEvolutionChain(response.species.url);
    return await response;
}
