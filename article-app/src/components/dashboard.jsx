import React from 'react'
import SearchInputs from './searchInputs'
import  ExampleQueries from './exampleQueries'
import UrlList from './urlList'
import FrequencyChart from './frequencyChart'
import './css/dashboard.css'

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            countriesListURL: "https://article-search-api.herokuapp.com/api/countryList",
            outputListURL: "https://article-search-api.herokuapp.com/api/outputList",
            searchSubmitURL: "https://article-search-api.herokuapp.com/api/searchTrends",
            countriesList: [],
            outputList: [],
            startDate: "",
            startTime: "",
            endDate: "",
            endTime: "",
            searchStr: "",
            urls: [],
            queryResults: []
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

    buildEncodedURL(baseURL, params) {

        let encodedURL = baseURL + "?"

        for (let i = 0; i < params.length; ++i) {
            encodedURL = encodedURL + params[i][0] + "=" + encodeURIComponent(JSON.stringify(params[i][1]))
            if (i < params.length - 1) {
                encodedURL = encodedURL + "&"
            }
        }
        return encodedURL
    }

    formatData(data) {
        console.log("in format data")
        console.log(data[0])
        console.log(data.length)
        let formattedData = []

        // for each country in data set
        for (let i = 0; i < data.length; ++i) {

            let countryData = {}
            countryData.type = "line"
            countryData.axisYType = "secondary"
            countryData.showInLegend = true
            countryData.name = data[i]["query_details"]["title"].slice(-2)
            let countryPoints = []
            for (let j = 0; j < data[i]["timeline"][0]["data"].length; ++j) {

                let year = parseInt(data[i]["timeline"][0]["data"][j]["date"].slice(0, 4))
                let month = parseInt(data[i]["timeline"][0]["data"][j]["date"].slice(4, 6))
                let day = parseInt(data[i]["timeline"][0]["data"][j]["date"].slice(6, 8))
                let freq = data[i]["timeline"][0]["data"][j]["value"]

                countryPoints.push(
                    {x: new Date(year, month, day), y: freq}
                )
            }
            countryData.dataPoints = countryPoints
            formattedData.push(countryData)
        }

        return formattedData;
    }

    handleSearchSubmit() {

        let reqBody = [
            ["countries", this.state.countriesList.filter((country) => country.selected === true)],
            ["outputs", this.state.outputList.filter((out) => out.selected === true)],
            ["startTime", this.state.startTime],
            ["startDate", this.state.startDate],
            ["endTime", this.state.endTime],
            ["endDate", this.state.endDate],
            ["q", this.state.searchStr]
        ];

        console.log(reqBody);

        // form json object to send over to API
        let reqOptions = {
            method: "GET",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(reqBody)
        };

        let searchURL = this.buildEncodedURL(this.state.searchSubmitURL, reqBody)

        fetch(searchURL)
        .then((resp) => resp.json()
        )
        .then((data) => {
            console.log(data);

            console.log(this.formatData(data['results']));
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
                <br />
                <FrequencyChart
                />
                <br />
                </div>
                
            </div>
        );
    }
}

export default Dashboard;