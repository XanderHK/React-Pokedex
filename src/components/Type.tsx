import React from 'react'

type Props = {
    type: string;
    key: number;
}

class Type extends React.Component<Props> {

    public render() {
        const parsedType: string = this.props.type.charAt(0).toUpperCase() + this.props.type.substring(1, this.props.type.length)
        return (
            <img src={process.env.PUBLIC_URL + `/types/${parsedType}.png`} alt="" height="40" width="40" />
        )
    }
}

export default Type;