import React from 'react'
import CheckedDropDown from './checkedDropDown'
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
                <table>
                    <thead></thead>
                    <tbody>
                    <tr>
                        <td className="titleCell" colSpan="6">
                            <h1>articleSearch</h1>
                        </td>
                    </tr>
                    <tr>
                        <td className="searchBarCell" colSpan="6">
                            <input className="searchBar" type="text"></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        <CheckedDropDown
                                name="Countries"
                                optionsList={this.state.countriesList}
                                onSelect={this.handleSelectCountry}
                                />
                        </td>
                        <td>
                        <input className="dateText" type="text"></input>
                        <p>Example:</p>
                        <p>Date: Jan 01 2020</p>
                        <p>Input: 01/01/2020</p>
                        </td>
                        <td>
                        <input className="dateText" type="text"></input>
                        <p>Example:</p>
                        <p>Time: 1:30 PM</p>
                        <p>Input: 13:00:00</p>
                        </td>
                        <td>
                        <input className="dateText" type="text"></input>
                        <p>Example:</p>
                        <p>Date: Jan 03 2020</p>
                        <p>Input: 01/03/2020</p>
                        </td>
                        <td>
                        <input className="dateText" type="text"></input>
                        <p>Example:</p>
                        <p>Time: 5:14 AM</p>
                        <p>Input: 05:14:00</p>
                        </td>
                        <td>
                        <CheckedDropDown
                                name="Output Types"
                                optionsList={this.state.outputList}
                                onSelect={this.handleSelectOutput}
                                />
                        </td>
                    </tr>
                    <tr>
                        <td className="searchButtonCell" colSpan="6">
                            <button id="searchButton">Search</button>
                        </td>
                    </tr>
                    
                    </tbody>    
                </table>
                <br />
                <ExampleQueries></ExampleQueries>
                </div>
                
            </div>
        );
    }
}

export default Dashboard;