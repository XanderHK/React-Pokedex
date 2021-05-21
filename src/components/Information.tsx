import React from 'react'
import Stat from './Stat'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

type Props = {
    weight: number;
    height: number;
    name: string;
    stats: { amount: number, name: string }[];
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
                            <h2 className="d-flex align-self-start">Stats</h2>
                            <div className="row g-2">
                                {this.props.stats.map((stat: { amount: number, name: string }, index: number) => (
                                    <Stat key={index} name={stat.name} amount={stat.amount} />
                                ))}
                            </div>
                        </div>
                        <h2 className="d-flex align-self-start">Anthropometry</h2>
                        <div className="row">
                            <div className="d-flex align-self-start col-sm-6"><div className="p-3 border bg-light w-100">Height {(this.props.height * 0.1).toFixed(2)}M</div></div>
                            <div className="d-flex align-self-start col-sm-6"><div className="p-3 border bg-light w-100">Weight {(this.props.weight * 0.1).toFixed(2)}KG</div></div>
                        </div>
                        <div>
                            <h2 className="d-flex align-self-start">Evolutions</h2>
                            {this.props.evolutionSprites.map((src: string, index: number) => (
                                <img key={index} src={src} alt="" />
                            ))}
                        </div>
                        <hr></hr>
                        <div className="d-flex justify-content-end align-bottom" style={{ bottom: 0 }}>
                            <a style={{ color: 'inherit' }} href="https://github.com/XanderHK" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGithub} size="2x" /></a>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default Information;