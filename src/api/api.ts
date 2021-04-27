import axios from 'axios';

export async function getAllPokemonNames() {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon-species/?limit=20000');

    return response.data.results.map((item: any) => {
        const pokemon: { name: string, id: number } = { name: '', id: 0 };

        pokemon.name = item.name;
        pokemon.id = item.url.replace("https://pokeapi.co/api/v2/pokemon-species/", "").slice(0, -1);

        return pokemon;
    })

}

async function getPokemonDescription(url: string) {
    const response = await axios.get(url);
    return response.data.flavor_text_entries.find((entry: any) => {
        if (entry.language.name === "en") return entry;
        return null;
    }).flavor_text.replace("/f", "");
}

export async function getPokemon(number: number) {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${number}`)
        .then(res => {
            return res.data
        })
        .catch((error) => {
            return axios.get(`https://pokeapi.co/api/v2/pokemon/1`).then(res => {
                res.data.setInitial = 1;
                return res.data;
            });
        })

    response.formattedStats = response.stats.map((stat: any) => {
        return { statAmount: stat.base_stat, statName: stat.stat.name };
    });

    response.description = await getPokemonDescription(response.species.url);

    return await response;
}

