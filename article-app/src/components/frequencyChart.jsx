import React from 'react'
import CanvasJSReact from './canvasjs.react'

class FrequencyChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            testOptions: {
                animationEnabled: true,
                title:{
                    text: "Monthly Sales - 2017"
                },
                axisX: {
                    valueFormatString: "MMM"
                },
                axisY: {
                    title: "Sales (in USD)",
                    prefix: "$"
                },
                data: [{
                    yValueFormatString: "$#,###",
                    xValueFormatString: "MMMM",
                    type: "spline",
                    dataPoints: [
                        { x: new Date(2017, 0), y: 25060 },
                        { x: new Date(2017, 1), y: 27980 },
                        { x: new Date(2017, 2), y: 42800 },
                        { x: new Date(2017, 3), y: 32400 },
                        { x: new Date(2017, 4), y: 35260 },
                        { x: new Date(2017, 5), y: 33900 },
                        { x: new Date(2017, 6), y: 40000 },
                        { x: new Date(2017, 7), y: 52500 },
                        { x: new Date(2017, 8), y: 32300 },
                        { x: new Date(2017, 9), y: 42000 },
                        { x: new Date(2017, 10), y: 37160 },
                        { x: new Date(2017, 11), y: 38400 }
                    ]
                },
                {
                    yValueFormatString: "$#,###",
                    xValueFormatString: "MMMM",
                    type: "spline",
                    dataPoints: [
                        { x: new Date(2017, 0), y: 20000 },
                        { x: new Date(2017, 1), y: 21000 },
                        { x: new Date(2017, 2), y: 22000 },
                        { x: new Date(2017, 3), y: 23000 },
                        { x: new Date(2017, 4), y: 24000 },
                        { x: new Date(2017, 5), y: 30000 },
                        { x: new Date(2017, 6), y: 40000 },
                        { x: new Date(2017, 7), y: 52500 },
                        { x: new Date(2017, 8), y: 60000 },
                        { x: new Date(2017, 9), y: 42000 },
                        { x: new Date(2017, 10), y: 37160 },
                        { x: new Date(2017, 11), y: 38400 }
                    ]
                }]
            }
        }
    }
	render() {
        
		return (
		<div>
            
			<CanvasJSReact.CanvasJSChart options={this.state.testOptions}
			/>
		</div>
		);
	}
}
//module.exports = FrequencyChart;

export default FrequencyChart;