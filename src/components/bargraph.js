import React, { Component } from 'react';

import { XYPlot, XAxis, YAxis, VerticalRectSeries, LabelSeries } from 'react-vis';

class BarGraph extends Component {

  handleValueClickHandler = (event) => {
    console.log(event);
    this.props.filterData(event.x0);
  }

  render() {
    const {data} = this.props;
    return (
        <XYPlot width={800} height={300}>
          <XAxis />
          <YAxis />
          <VerticalRectSeries
            data={data}
            strokeWidth={2}
            stroke="#222"
            fill="#e29da3"
            colorType="literal"
            onValueClick={this.handleValueClickHandler}
            style={{
              cursor: 'pointer',
            }}
          />
          <LabelSeries
            data={data.map(obj => {
              return { ...obj, label: obj.y.toString() }
            })}
            labelAnchorX="middle"
            labelAnchorY="text-after-edge"
          />
        </XYPlot>
    );
  }
}

export default BarGraph;