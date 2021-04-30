import React from 'react'
import Type from './Type'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { fEmptyVoid } from '../types/types'

type Props = {
    prev: fEmptyVoid;
    next: fEmptyVoid;
    imgSrc: string;
    types: any;
    background: string;
}


class Card extends React.Component<Props> {

    private handleError(event: any) {
        event.target.src = "placeholder.png"
    }

    public render() {
        const types: any = Object.values(this.props.types).map((type: any, index: number) => {
            return <Type type={type.type.name} key={index} />
        });
        const pokemonImage = React.createElement('img', { id: 'pokemonImage', className: 'card-img-top', src: this.props.imgSrc, alt: 'no image available', onError: this.handleError });
        const prevBtn = React.createElement('button', { onClick: this.props.prev, className: 'btn' }, <FontAwesomeIcon icon={faArrowLeft} />);
        const nextBtn = React.createElement('button', { onClick: this.props.next, className: 'btn' }, <FontAwesomeIcon icon={faArrowRight} />);
        return (
            <div className="h-100 d-flex align-items-center justify-content-center">
                <div className="row align-self-center h-100" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="col-sm-12 align-self-center">
                        <div className="row">
                            <div className="col-sm-2 align-self-center">
                                {prevBtn}
                            </div>
                            <div className="col-sm-8">
                                <div className="d-flex align-items-center justify-content-center">
                                    <div className="card" style={{ backgroundColor: this.props.background }}>
                                        {pokemonImage}
                                        <div className="card-body">
                                            <h5 className="card-title">{types}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-2 align-self-center">
                                {nextBtn}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;