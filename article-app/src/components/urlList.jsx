import React from 'react'
import './css/urlList.css'


class UrlList extends React.Component {

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
                        <td id="titleURLCell" className="urlCell">
                            <h1>URL List</h1>
                        </td>
                    </tr>
                    <tr>
                        <td className="urlCell">
                            <div id="urlListContents">
                                
                                {
                                    this.props.urls.map(
                                        (currURL) =>
                                        <p key="testingURLS">
                                            {currURL} <br key={currURL} />
                                        </p>
                                    )
                                }
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default UrlList;