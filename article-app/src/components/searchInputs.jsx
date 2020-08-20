import React from 'react'
import CheckedDropDown from './checkedDropDown'
import './css/searchInputs.css'

class SearchInputs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <table>
                    <thead></thead>
                    <tbody>
                    <tr>
                        <td id="titleCell" colSpan="6">
                            <h1>articleSearch</h1>
                        </td>
                    </tr>
                    <tr>
                        <td id="searchBarCell" colSpan="6">
                            <input
                                id="searchBar"
                                type="text"
                                placeholder="Search..."
                                value={this.props.searchTerms}
                                onChange={this.props.onSearchChange}></input>
                        </td>
                    </tr>
                    <tr>
                        <td className="searchInputCell">
                        <CheckedDropDown
                                name="Countries"
                                optionsList={this.props.countriesList}
                                onSelect={this.props.onSelectCountry}
                                />
                        </td>
                        <td className="searchInputCell">
                        <input
                            className="dateText"
                            type="text"
                            placeholder="Start Date..."
                            value={this.props.startDateStr}
                            onChange={this.props.onStartDateChange}></input>
                        <p>Example:</p>
                        <p>Date: Jan 01 2020</p>
                        <p>Input: 01/01/2020</p>
                        </td>
                        <td className="searchInputCell">
                        <input
                            className="dateText"
                            type="text"
                            placeholder="Start Time..."
                            value={this.props.startTimeStr}
                            onChange={this.props.onStartTimeChange}
                            ></input>
                        <p>Example:</p>
                        <p>Time: 1:30 PM</p>
                        <p>Input: 13:00:00</p>
                        </td>
                        <td className="searchInputCell">
                        <input
                            className="dateText"
                            type="text"
                            placeholder="End Date..."
                            value={this.props.endDateStr}
                            onChange={this.props.onEndDateChange}
                            ></input>
                        <p>Example:</p>
                        <p>Date: Jan 03 2020</p>
                        <p>Input: 01/03/2020</p>
                        </td>
                        <td className="searchInputCell">
                        <input
                            className="dateText"
                            type="text"
                            placeholder="End Time..."
                            value={this.props.endTimeStr}
                            onChange={this.props.onEndTimeChange}
                            ></input>
                        <p>Example:</p>
                        <p>Time: 5:14 AM</p>
                        <p>Input: 05:14:00</p>
                        </td>
                        <td className="searchInputCell">
                        <CheckedDropDown
                                name="Output Types"
                                optionsList={this.props.outputList}
                                onSelect={this.props.onSelectOutput}
                                />
                        </td>
                    </tr>
                    <tr>
                        <td id="searchButtonCell" colSpan="6">
                            <button id="searchButton" onClick={this.props.onSearchSubmit}>Search</button>
                        </td>
                    </tr>
                    
                    </tbody>    
                </table>
            </div>
        );
    }
}

export default SearchInputs;