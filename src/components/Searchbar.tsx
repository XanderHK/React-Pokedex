import React from 'react'
import { getAllPokemonNames } from '../api/api'
import { fNumberEmptyPromise } from '../types/types';

type Props = {
    parsePokemon: fNumberEmptyPromise;
}

type State = {
    matches: { name: string, id: number }[];
}

class Searchbar extends React.Component<Props, State> {

    public constructor(props: Props) {
        super(props);
        this.getInput.bind(this);
        this.setPokemon.bind(this);
        this.state = {
            matches: []
        }
    }

    /**
     * Gets the input from the search bar and showcases the first 8 results
     * @param event 
     * @returns void
     */
    private getInput = async (event: any) => {

        const input: string = event.target.value.toLowerCase();

        if (input.length === 0) {
            this.setState({
                matches: []
            })
            return;
        };

        const names = await getAllPokemonNames();

        const matches: { name: string, id: number }[] = names.filter((e: any) => {
            if (e.name.includes(input)) {
                return e
            }
            return null
        }).slice(0, 8);

        this.setState({
            matches: matches
        });
    }

    /**
     * calls the parsePokemon method from the pokemon component
     * @param number 
     */
    public setPokemon(number: number) {
        this.props.parsePokemon(number);
    }

    public render() {
        return (
            <div className="searchbar">
                <input type="text" className="form-control" onInput={this.getInput} placeholder="Search.." />
                <div className="searchbar-list">
                    {this.state.matches.map((match: { name: string, id: number }) => (
                        <div key={match.id} className="searchbar-item" onClick={() => this.setPokemon(match.id)}>
                            {match.name}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default Searchbar;