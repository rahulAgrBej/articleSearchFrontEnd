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
            outputList: [],
            selectedCountries: [],
            selectedOptions: []
        }
    }
    handleSelectCountry = (country) => {
        console.log("country handler", country)
        
    }

    handleSelectOutput = (optionClicked) => {
        console.log("options handler", optionClicked)

        
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
                />
                <br />
                <ExampleQueries />
                </div>
                
            </div>
        );
    }
}

export default Dashboard;