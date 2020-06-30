import React from 'react'
import './css/textBarDate.css'

class TextBarDate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <input className="dateText" type="text"></input>
            </div>
        );
    }

}

export default TextBarDate;