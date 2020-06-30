import React from 'react'
import CheckedDropDown from './checkedDropDown'
import TextBarDate from './textBarDate'
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
                <table>
                    <thead></thead>
                    <tbody>
                    <tr>
                        <td>
                        <CheckedDropDown
                                url="https://article-search-api.herokuapp.com/api/countryList"
                                name="Countries"/>
                        </td>
                        <td>
                        <TextBarDate />
                        </td>
                        <td>
                        <TextBarDate />
                        </td>
                        <td>
                        <TextBarDate />
                        </td>
                        <td>
                        <TextBarDate />
                        </td>
                        <td>
                        <CheckedDropDown
                                url="https://article-search-api.herokuapp.com/api/outputList"
                                name="Output Types"/>
                        </td>
                    </tr>
                    </tbody>    
                </table>
            </div>
        );
    }
}

export default Dashboard;