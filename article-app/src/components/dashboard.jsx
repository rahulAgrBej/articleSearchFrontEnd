import React from 'react'
import SearchInputs from './searchInputs'
import  ExampleQueries from './exampleQueries'
import CanvasJSReact from './canvasjs.react'
import LoadingLogo from "./mediaFiles/loading.gif"
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
            queryResults: {},
            showLoadingStatus: "loadingStatusHide",
            resultMsg: ""
        }

        this.chartRef = React.createRef();
        this.resultRef = React.createRef();
        this.loadingRef = React.createRef();
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
        let formattedData = []

        // for each country in data set
        for (let i = 0; i < data.length; ++i) {

            let countryData = {}
            countryData.type = "spline"
            countryData.name = data[i]["query_details"]["title"].slice(-2)
            countryData.showInLegend = true;
            countryData.legendText = data[i]["query_details"]["title"].slice(-2)
            let countryPoints = []
            if (data[i]["timeline"].length > 0) {
                for (let j = 0; j < data[i]["timeline"][0]["data"].length; ++j) {

                    let year = parseInt(data[i]["timeline"][0]["data"][j]["date"].slice(0, 4))
                    let month = parseInt(data[i]["timeline"][0]["data"][j]["date"].slice(4, 6))
                    let day = parseInt(data[i]["timeline"][0]["data"][j]["date"].slice(6, 8))
                    let hour = parseInt(data[i]["timeline"][0]["data"][j]["date"].slice(9, 11))
                    let minute = parseInt(data[i]["timeline"][0]["data"][j]["date"].slice(11, 13))
                    let freq = data[i]["timeline"][0]["data"][j]["value"]
    
                    countryPoints.push(
                        {x: new Date(year, month - 1, day, hour, minute), y: freq}
                    )
                }
            }
            
            countryData.dataPoints = countryPoints
            formattedData.push(countryData)
        }

        return formattedData;
    }

    handleSearchSubmit() {

        // reset any error messages
        this.setState({
            resultMsg: ""
        })

        // scroll to the loading gif
        this.loadingRef.current.scrollIntoView({ 
            behavior: "smooth"
         })

        // resetting chart data
        this.setState({
            queryResults: {}
        })

        this.chartRef.options = {}
        this.chartRef.options.title = {}
        this.chartRef.options.title.text = ""
        this.chartRef.render()

        // show loading gif
        this.setState({
            showLoadingStatus: "loadingStatusShow"
        })

        let reqBody = [
            ["countries", this.state.countriesList.filter((country) => country.selected === true)],
            ["outputs", this.state.outputList.filter((out) => out.selected === true)],
            ["startTime", this.state.startTime],
            ["startDate", this.state.startDate],
            ["endTime", this.state.endTime],
            ["endDate", this.state.endDate],
            ["q", this.state.searchStr]
        ];


        let searchURL = this.buildEncodedURL(this.state.searchSubmitURL, reqBody)

        fetch(searchURL)
        .then((resp) => {

            // if request fails then print error message
            if (!resp.ok) {
                console.log(resp);
                this.setState({
                    resultMsg: "An internal error occurred, please try a different search query.",
                    showLoadingStatus: "loadingStatusHide"
                });

                throw Error(resp.statusText);
            }
            return resp.json()
        }
        )
        .then((data) => {
            //let processedResults = this.formatData(data['results']);
            console.log(data);
            let processedChartOptions = {};
            processedChartOptions.animationEnabled = true;
            processedChartOptions.title = {};
            processedChartOptions.title.text = this.state.searchStr;
            processedChartOptions.title.fontFamily = "Arial";
            processedChartOptions.axisX = {};
            processedChartOptions.axisX.title = "Timeline";

            //processedChartOptions.axisX.valueFormatString = "MMM"
            processedChartOptions.axisY = {}
            processedChartOptions.axisY.title = "Number of Articles"
            processedChartOptions.data = this.formatData(data['results']);
            processedChartOptions.width = 900;
            processedChartOptions.height = 500;

            this.setState({
                queryResults: processedChartOptions,
                showLoadingStatus: "loadingStatusHide"
            });

            this.chartRef.options = this.state.queryResults;
            this.chartRef.render();

            this.resultRef.current.scrollIntoView({ 
                behavior: "smooth"
             })
        }
        ).catch(error => console.log(error));

        
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
                    <table>
                        <thead></thead>
                        <tbody>
                            <tr>
                                <td>
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
                                </td>
                            </tr>
                            <tr>
                                <td>
                                <ExampleQueries />
                                <div ref={this.loadingRef}>
                                <img src={LoadingLogo} className={this.state.showLoadingStatus} alt="loading logo gif"></img>
                                <h3>{this.state.resultMsg}</h3>
                                </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                <div ref={this.resultRef}>
                                <CanvasJSReact.CanvasJSChart options={this.state.queryResults} onRef={ref => this.chartRef = ref}/>
                                </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                <br />
                <br />
                </div>
                
            </div>
        );
    }
}

export default Dashboard;