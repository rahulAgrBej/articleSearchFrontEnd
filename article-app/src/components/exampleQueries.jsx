import React from 'react'
import './css/exampleQueries.css'

class ExampleQueries extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <table>
                    <thead></thead>
                    <tbody>
                        <tr>
                            <td id="titleExampleCell" className="exampleCell">
                                <h1>Example Queries</h1>
                            </td>
                        </tr>
                        <tr>
                            <td className="exampleCell">
                                <p>Below are some sample search queries that could be run:</p>
                                <p>If you wanted to search for "seafood" AND "trade"</p>
                                <ul>
                                    <li><p>seafood trade</p></li>
                                </ul>
                                <p>If you wanted to search for "seafood" AND "COVID-19"</p>
                                <ul>
                                    <li><p>seafood "COVID-19"</p></li>
                                    <li><p>(note that terms with hyphens have to be surrounded with quotation marks.)</p></li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ExampleQueries;