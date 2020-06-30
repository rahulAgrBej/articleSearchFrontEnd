import React from 'react'
import './css/checkBoxOption.css'

class CheckBoxOption extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <h1 className="test">{this.props.countryObj.name}</h1>
                <button className="btn btn-primary"></button>
            </div>
        )
    }
}

export default CheckBoxOption;