import React from 'react'
import SearchInputs from './searchInputs'
import  ExampleQueries from './exampleQueries'
import './css/dashboard.css'

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            countriesListURL: "https://article-search-api.herokuapp.com/api/countryList",
            outputListURL: "https://article-search-api.herokuapp.com/api/outputList",
            searchSubmitURL: "https://article-search-api.herokuapp.com/api/search",
            countriesList: [],
            outputList: [],
            startDate: "",
            startTime: "",
            endDate: "",
            endTime: "",
            searchStr: ""
        }
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
        this.handleSearchStrChange = this.handleSearchStrChange.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    }

    handleStartDateChange(event) {
        this.setState({
            startDate: event.target.value
        })
    }

    handleStartTimeChange(event) {
        this.setState({
            startTime: event.target.value
        })
    }

    handleEndDateChange(event) {
        this.setState({
            endDate: event.target.value
        })
    }

    handleEndTimeChange(event) {
        this.setState({
            endTime: event.target.value
        })
    }

    handleSearchStrChange(event) {
        this.setState({
            searchStr: event.target.value
        })
    }

    handleSelectCountry = (country) => {
        let newCountries = [...this.state.countriesList];
        const countryIdx = this.state.countriesList.indexOf(country);

        newCountries[countryIdx] = {...country};
        newCountries[countryIdx].selected = !(newCountries[countryIdx].selected);

        this.setState({
            countriesList: newCountries
        })
    }

    handleSelectOutput = (optionClicked) => {
        let newOptions = [...this.state.outputList];
        const optionIdx = this.state.outputList.indexOf(optionClicked);

        newOptions[optionIdx] = {...optionClicked};
        newOptions[optionIdx].selected = !(newOptions[optionIdx].selected);

        this.setState({
            outputList: newOptions
        })
    }

    handleSearchSubmit() {

        let reqBody = {
            "countries": this.state.countriesList.filter((country) => country.selected === true),
            "outputs": this.state.outputList.filter((out) => out.selected === true),
            "startTime": this.state.startTime,
            "startDate": this.state.startDate,
            "endTime": this.state.endTime,
            "endDate": this.state.endDate,
            "searchStr": this.state.searchStr
        };

        console.log(reqBody);

        // form json object to send over to API
        let reqOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify(reqBody)
        };

        fetch(this.state.searchSubmitURL, reqOptions)
        .then((resp) => resp.json()
        )
        .then((data) => {
            console.log(data);
        }
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
                    startDateStr={this.state.startDate}
                    startTimeStr={this.state.startTime}
                    endDateStr={this.state.endDate}
                    endTimeStr={this.state.endTime}
                    searchTerms={this.state.searchStr}
                    onStartDateChange={this.handleStartDateChange}
                    onStartTimeChange={this.handleStartTimeChange}
                    onEndDateChange={this.handleEndDateChange}
                    onEndTimeChange={this.handleEndTimeChange}
                    onSearchChange={this.handleSearchStrChange}
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