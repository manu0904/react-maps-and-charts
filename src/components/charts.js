import React, { Component } from 'react'
import Bargraph from './bargraph';

export default class Charts extends Component {
 
  state = {
        showChart: false
  }
  

  handleClick = () => this.setState({ showChart: !this.state.showChart });

  render() {
    return (
      <>
        {
          this.state.showChart && (
            <div className="charts-container">
              <div className="chart">
                <div className="chart-heading"><span>Number of bookings made in 24 hours</span></div>
                <div>
                  <Bargraph filterData={this.props.filterData} data={this.props.btd} />
                </div>
              </div>
            </div>
          )
        }
        <div className="btns">
          <div onClick={this.handleClick} className="btn">
            <>
              {
                this.state.showChart ? (
                  <>
                    <i class="fas hide fa-chart-bar"></i>
                    <div className="diag-strike"></div>
                  </>
                ) : (
                  <i class="fas fa-chart-bar"></i>
                  )
              }
            </>
          </div>
          <>
            {
              this.props.time_filter_selected && <div onClick={this.props.resetFilter} className="btn">
                <i class="fas fa-undo-alt"></i>
              </div>
            }
          </>
        </div>
      </>
    )
  }
}