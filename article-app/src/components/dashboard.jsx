import React from 'react'
import CheckedDropDown from './checkedDropDown'
import  ExampleQueries from './exampleQueries'
import './css/textBarDate.css'
import './css/dashboard.css'

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
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
                                url="https://article-search-api.herokuapp.com/api/countryList"
                                name="Countries"/>
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
                                url="https://article-search-api.herokuapp.com/api/outputList"
                                name="Output Types"/>
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