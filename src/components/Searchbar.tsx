import React from 'react'
import { getAllPokemonNames } from '../api/api'

type Props = {
    parsePokemon: any;
}

type State = {
    matches: any;
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


    private getInput = async (event: any) => {

        const input: string = event.target.value.toLowerCase();

        if (input.length === 0) {
            this.setState({
                matches: []
            })
            return;
        };

        const names = await getAllPokemonNames();

        const matches = names.filter((e: any) => {
            if (e.name.includes(input)) {
                return e
            }
            return null
        }).slice(0, 8);

        this.setState({
            matches: matches
        });
    }

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