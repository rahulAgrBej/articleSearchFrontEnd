import React from 'react'
import './css/checkBoxOption.css'

class CheckBoxOption extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <React.Fragment>
                <input type="checkbox" /> {this.props.optionObj.name}<br />
            </React.Fragment>
        )
    }
}

export default CheckBoxOption;