import React from 'react'
import { capitalizeString } from '../functions/functions'

type Props = {
    amount: number;
    name: string;
}

class Stat extends React.Component<Props> {
    public render() {
        return <div className="col-sm-6 d-flex align-self-start"><div className="p-3 border bg-light w-100"><div>{capitalizeString(this.props.name.replace("-", " "))}</div>{this.props.amount}</div></div >
    }
}

export default Stat;