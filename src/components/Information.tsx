import React from 'react'
import Stat from './Stat'

type Props = {
    weight: number;
    height: number;
    name: string;
    stats: { statAmount: number, statName: string }[];
    description: string;
    id: number;
    evolutionChain: string[];
    evolutionSprites: string[];
};

class Information extends React.Component<Props> {

    public render() {
        return (
            <div>
                <div>
                    <h1>Pokémon Information</h1>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <h2 className="d-flex align-self-start">{this.props.name.toUpperCase()} #{this.props.id}</h2>
                        <p className="d-flex align-self-start">{this.props.description}</p>
                        <div>
                            <h2 className="d-flex align-self-start">Pokémon stats</h2>
                            <div className="row g-2">
                                {this.props.stats.map((stat: { statAmount: number, statName: string }, index: number) => (
                                    <Stat key={index} name={stat.statName} amount={stat.statAmount} />
                                ))}
                            </div>
                        </div>
                        <h2 className="d-flex align-self-start">Pokémon anthropometry</h2>
                        <div className="row">
                            <div className="d-flex align-self-start col-sm-6"><div className="p-3 border bg-light w-100">Height {(this.props.height * 0.1).toFixed(2)}M</div></div>
                            <div className="d-flex align-self-start col-sm-6"><div className="p-3 border bg-light w-100">Weight {(this.props.weight * 0.1).toFixed(2)}KG</div></div>
                        </div>
                        <div>
                            <h2 className="d-flex align-self-start">Pokémon evolutions</h2>
                            {/* {this.props.evolutionChain.map((evo: string, index: number) => (
                                <div className="d-flex align-self-start" key={index}>{evo}</div>
                            ))} */}
                            {this.props.evolutionSprites.map((src: string, index: number) => (
                                <img key={index} src={src} alt="" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Information;