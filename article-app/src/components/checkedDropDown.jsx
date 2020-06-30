import React from 'react';
import CheckBoxOption from './checkBoxOption'

class CheckedDropDown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            countryList: []
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
                {this.state.countryList.map(country => <CheckBoxOption key={country.code} countryObj={country} />)}
            </React.Fragment>
        );
    }

}

export default CheckedDropDown;