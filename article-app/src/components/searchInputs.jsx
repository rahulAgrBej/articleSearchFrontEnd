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
                                optionsList={this.props.countriesList}
                                onSelect={this.props.onSelectCountry}
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
                                optionsList={this.props.outputList}
                                onSelect={this.props.onSelectOutput}
                                />
                        </td>
                    </tr>
                    <tr>
                        <td className="searchButtonCell" colSpan="6">
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