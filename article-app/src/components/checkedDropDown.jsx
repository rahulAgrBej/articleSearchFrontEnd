import React from 'react';
import CheckBoxOption from './checkBoxOption'
import './css/checkedDropDown.css'

class CheckedDropDown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            countryList: [],
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
            let countriesIn = data.countryList;
            this.setState({
                countryList: countriesIn
            });
        })
    }

    render() {
        return (
            <React.Fragment>
                    <button className="btn btn-primary" onClick={this.dropContentShow}>Countries</button> {this.state.showDropDown}
                    <br />
                    <div className={this.state.showDropDown}>
                        {
                            this.state.countryList.map(
                                country => <CheckBoxOption key={country.code} countryObj={country} />
                                )
                        }
                    </div>
                        
            </React.Fragment>
        );
    }

}

export default CheckedDropDown;