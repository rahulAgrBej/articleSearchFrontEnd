import React from 'react';
import CheckBoxOption from './checkBoxOption'
import './css/checkedDropDown.css'

class CheckedDropDown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            optionsList: [],
            showDropDownStatus: false,
            showDropDown: "dropDownContentHide"
        }
        this.dropContentShow = this.dropContentShow.bind(this);
    }

    dropContentShow() {

        if (this.state.showDropDownStatus === false) {
            this.setState({
                showDropDownStatus: true,
                showDropDown: "dropDownContentShow"
            });
        }
        else {
            this.setState({
                showDropDownStatus: false,
                showDropDown: "dropDownContentHide"
            });
        }
    }

    componentDidMount() {

        //let fullURL = this.state.proxyURL + this.props.url;
        fetch(this.props.url).then((response) => {
            return response.json();
        }).then((data) => {
            let optionsIn = data.results;
            this.setState({
                optionsList: optionsIn
            });
        })
    }

    render() {
        return (
            <div id="dropDownMenu">
                    <button id="dropDownButton" onClick={this.dropContentShow}>{this.props.name}</button>
                    <br />
                    <div className={this.state.showDropDown}>
                        {
                            this.state.optionsList.map(
                                optionRef => <CheckBoxOption key={optionRef.id} optionObj={optionRef} />
                                )
                        }
                    </div>
                        
            </div>
        );
    }

}

export default CheckedDropDown;