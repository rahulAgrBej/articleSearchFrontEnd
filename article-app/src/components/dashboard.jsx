import React from 'react'
import SearchInputs from './searchInputs'
import  ExampleQueries from './exampleQueries'
import './css/textBarDate.css'
import './css/dashboard.css'

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            countriesListURL: "https://article-search-api.herokuapp.com/api/countryList",
            outputListURL: "https://article-search-api.herokuapp.com/api/outputList",
            countriesList: [],
            outputList: []
        }
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    }

    handleSelectCountry = (country) => {
        console.log("country handler", country)
        let newCountries = [...this.state.countriesList];
        const countryIdx = this.state.countriesList.indexOf(country);

        newCountries[countryIdx] = {...country};
        newCountries[countryIdx].selected = !(newCountries[countryIdx].selected);

        this.setState({
            countriesList: newCountries
        })
    }

    handleSelectOutput = (optionClicked) => {
        console.log("options handler", optionClicked)
        let newOptions = [...this.state.outputList];
        const optionIdx = this.state.outputList.indexOf(optionClicked);

        newOptions[optionIdx] = {...optionClicked};
        newOptions[optionIdx].selected = !(newOptions[optionIdx].selected);

        this.setState({
            outputList: newOptions
        })
    }

    handleSearchSubmit() {
        console.log(
            "testing countries submitted",
            this.state.countriesList.filter((country) => country.selected === true),
            "testing outputs",
            this.state.outputList.filter((out) => out.selected === true)
        );
    }

    componentDidMount() {

        Promise.all([
            fetch(this.state.countriesListURL),
            fetch(this.state.outputListURL)
        ])
        .then(
            ([resp1, resp2]) => Promise.all([resp1.json(), resp2.json()])
        )
        .then(
            ([data1, data2]) => this.setState({
                countriesList: data1.results,
                outputList: data2.results
            })
        );
    }

    render() {
        return (
            <div>
                <div id="dashboardWrapper">
                <SearchInputs
                    countriesList={this.state.countriesList}
                    outputList={this.state.outputList}
                    onSelectCountry={this.handleSelectCountry}
                    onSelectOutput={this.handleSelectOutput}
                    onSearchSubmit={this.handleSearchSubmit}
                />
                <br />
                <ExampleQueries />
                </div>
                
            </div>
        );
    }
}

export default Dashboard;