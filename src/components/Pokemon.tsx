import React, { Component } from 'react'
import { getPokemon } from '../api/api'
import PokemonCard from './PokemonCard'
import Searchbar from './Searchbar'
import FastAverageColor from 'fast-average-color';
import Information from './Information'

type Props = {

}

type State = {
    pokemonNr: number;
    pokemonName: string;
    pokemonImageUrl: string;
    pokemonTypes: any;
    pokemonBackground: string;
    pokemonHeight: number;
    pokemonWeight: number;
    pokemonStats: { amount: number, name: string }[];
    pokemonDescription: string;
    pokemonEvolutionChain: string[];
    pokemonEvolutionSprites: string[];
};

class Pokemon extends Component<Props, State> {

    private fac: IFastAverageColor = new FastAverageColor();
    private firstPokemon: number = 1;

    public componentDidMount(): void {

        this.parsePokemon(this.firstPokemon);
    }

    /**
     * Decrements the id
     */
    private prev = (): void => {

        if (this.state.pokemonNr === 0) return;

        this.parsePokemon(this.state.pokemonNr - 1);
    }

    /**
     * Increments the id 
     */
    private next = async (): Promise<void> => {

        let increment = 1;
        if (this.state.pokemonNr === 0) increment = 2;

        this.parsePokemon(this.state.pokemonNr + increment);
    }

    /**
     * Gets the information and parses it so it can be used by the app
     * @param number 
     */
    private parsePokemon = async (number: number): Promise<void> => {
        if (typeof number === 'string') {
            number = parseInt(number, 10)
        }
        const pokemon = await getPokemon(number);
        this.setState({
            pokemonNr: number,
            pokemonName: pokemon.name,
            pokemonImageUrl: pokemon.sprites.other['official-artwork'].front_default,
            pokemonTypes: pokemon.types,
            pokemonWeight: pokemon.weight,
            pokemonHeight: pokemon.height,
            pokemonStats: pokemon.stats,
            pokemonDescription: pokemon.description,
            pokemonEvolutionChain: pokemon.evolutions,
            pokemonEvolutionSprites: pokemon.evolutionSprites
        });

        await this.setBackground();
    }

    /**
     * Alters the background
     */
    public setBackground = async () => {
        const fullColor = await this.fac.getColorAsync(this.state.pokemonImageUrl);
        this.setState({
            pokemonBackground: fullColor.hex
        })
    }

    public render() {
        if (this.state === null) return <div />;
        return (
            <div className="container-fluid vh-100">
                <div className="row h-100">
                    <div className="col-sm-6" style={{ backgroundColor: this.state.pokemonBackground }}>
                        <div className="row" style={{ position: 'relative', zIndex: 2 }}>
                            <div className="col-sm-3">
                                <Searchbar parsePokemon={this.parsePokemon} />
                            </div>
                        </div>
                        <PokemonCard
                            prev={this.prev}
                            next={this.next}
                            imgSrc={this.state.pokemonImageUrl}
                            types={this.state.pokemonTypes}
                            background={this.state.pokemonBackground}
                        />
                    </div>
                    <div className="col-sm-6">
                        <Information
                            id={this.state.pokemonNr}
                            height={this.state.pokemonHeight}
                            weight={this.state.pokemonWeight}
                            name={this.state.pokemonName}
                            stats={this.state.pokemonStats}
                            description={this.state.pokemonDescription}
                            evolutionChain={this.state.pokemonEvolutionChain}
                            evolutionSprites={this.state.pokemonEvolutionSprites}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Pokemon;