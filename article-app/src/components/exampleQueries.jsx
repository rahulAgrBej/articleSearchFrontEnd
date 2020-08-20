import React from 'react'
import './css/exampleQueries.css'

class ExampleQueries extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            showExampleText: "Show Example Queries",
            cellDisplay: "exampleCell"
        }

        this.handleExampleClick = this.handleExampleClick.bind(this);
    }

    handleExampleClick() {

        if (this.state.showExampleText === "Show Example Queries") {
            this.setState({
                showExampleText: "Hide Example Queries",
                cellDisplay: "hideCell"
            })
        }
        else {
            this.setState({
                showExampleText: "Show Example Queries",
                cellDisplay: "exampleCell"
            })
        }
    }

    render() {
        return (
            <div>
                <table>
                    <thead></thead>
                    <tbody>
                        <tr>
                            <td id="exampleBtnCell">
                                <button id="exampleBtn" onClick={this.handleExampleClick}>{this.state.showExampleText}</button>
                            </td>
                        </tr>
                        <tr>
                            <td id="titleExampleCell" className={this.state.cellDisplay}>
                                <h1>Example Queries</h1>
                            </td>
                        </tr>
                        <tr>
                            <td className={this.state.cellDisplay}>
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