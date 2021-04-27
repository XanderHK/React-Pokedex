import React from 'react'

type Props = {
    amount: number;
    name: string;
}

class Stat extends React.Component<Props> {
    public render() {
        return <div className="col-sm-6"><span>{this.props.name}</span><br /><span>{this.props.amount}</span></div>
    }
}

export default Stat;