import React from 'react'
import { getPokemon } from '../api/api'
import PokemonCard from './PokemonCard'
import Searchbar from './Searchbar'
import FastAverageColor from 'fast-average-color';
import Information from './Information'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

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
    pokemonStats: { statAmount: number, statName: string }[];
    pokemonDescription: string
};

class Pokemon extends React.Component<Props, State> {

    private fac = new FastAverageColor();

    public constructor(props: Props) {
        super(props)
        this.state = {
            pokemonNr: 1,
            pokemonName: '',
            pokemonImageUrl: '',
            pokemonTypes: '',
            pokemonBackground: '',
            pokemonHeight: 0,
            pokemonWeight: 0,
            pokemonStats: [],
            pokemonDescription: ''
        }
    }

    public componentDidMount(): void {

        this.parsePokemon(this.state.pokemonNr);
    }

    private prev = (): void => {

        if (this.state.pokemonNr === 0) return;

        this.parsePokemon(this.state.pokemonNr as number - 1);
    }

    private next = async (): Promise<void> => {

        let increment = 1;
        if (this.state.pokemonNr === 0) increment = 2;

        this.parsePokemon(this.state.pokemonNr as number + increment);
    }

    private parsePokemon = async (number: number): Promise<void> => {

        const pokemon = await getPokemon(number);
        if (pokemon.hasOwnProperty('setInitial')) {
            number = pokemon.setInitial;
        }

        this.setState({
            pokemonNr: number,
            pokemonName: pokemon.name,
            pokemonImageUrl: pokemon.sprites.other['official-artwork'].front_default,
            pokemonTypes: pokemon.types,
            pokemonWeight: pokemon.weight,
            pokemonHeight: pokemon.height,
            pokemonStats: pokemon.formattedStats,
            pokemonDescription: pokemon.description
        });


        this.setBackground();
    }


    public setBackground = async () => {
        const fullColor = await this.fac.getColorAsync(this.state.pokemonImageUrl);
        this.setState({
            pokemonBackground: fullColor.hex
        })
    }

    public render() {
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
                            parsePokemon={this.parsePokemon}
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
                        />
                        <div className="align-self-center" style={{ bottom: 0, position: 'absolute', right: 0 }}>
                            <a style={{ color: 'inherit' }} href="https://github.com/XanderHK" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGithub} size="2x" /></a>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default Pokemon;