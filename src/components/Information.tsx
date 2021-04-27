import React from 'react'
import Stat from './Stat'

type Props = {
    weight: number;
    height: number;
    name: string;
    stats: { statAmount: number, statName: string }[];
    description: string;
    id: number;
};

class Information extends React.Component<Props> {

    public render() {
        return (
            <div>
                <div className="">
                    <h1>Pokémon Information</h1>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <h1>{this.props.name.toUpperCase()} #{this.props.id}</h1>
                        <div>{this.props.description}</div>
                        <div className="row">
                            {this.props.stats.map((stat: { statAmount: number, statName: string }, index: number) => (
                                <Stat key={index} name={stat.statName} amount={stat.statAmount} />
                            ))}
                        </div>
                        <div>Height {(this.props.height * 0.1).toFixed(2)}M</div>
                        <div>Weight {(this.props.weight * 0.1).toFixed(2)}KG</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Information;