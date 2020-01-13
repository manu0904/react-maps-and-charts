import React, { Component } from 'react';
import MapGL, { Marker, Popup, NavigationControl, FullscreenControl, ScaleControl } from 'react-map-gl';

import Pin from './pin';
import CityInfo from './city-info';

const TOKEN = 'pk.eyJ1IjoibXVkaXR5YWRhdiIsImEiOiJjazR5MzlmbXAwNnk1M2xsanRmNDVrZWV5In0.Rg_zHFJc1DKOcE3iROUCIA'; // Set your mapbox token here

const fullscreenControlStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

const navStyle = {
  position: 'absolute',
  top: 36,
  left: 0,
  padding: '10px'
};

const scaleControlStyle = {
  position: 'absolute',
  bottom: 36,
  left: 0,
  padding: '10px'
};

export default class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: 100+"vw",
        height: 100+"vh",
        latitude: 13,
        longitude: 77.6,
        zoom: 11,
        bearing: 0,
        pitch: 0
      },
      popupInfo: null
    };
  }

  _updateViewport = (viewport) => {
    this.setState({ viewport });
  }

  _renderCityMarker = (city, index) => {
    if (city) {
      return (
        <Marker
          key={`marker-${index}`}
          longitude={city.longitude}
          latitude={city.latitude} >
          <Pin size={20} 
            onClick={() => this.setState({ popupInfo: city })} 
          />
        </Marker>
      );
    }
  }

  _renderPopup() {
    const { popupInfo } = this.state;

    return popupInfo && (
      <Popup tipSize={5}
        anchor="top"
        longitude={popupInfo.longitude}
        latitude={popupInfo.latitude}
        closeOnClick={false}
        onClose={() => this.setState({ popupInfo: null })} >
        <CityInfo info={popupInfo} />
      </Popup>
    );
  }

  render() {

    const { viewport } = this.state;
    console.log(this.props.cities.length + "maps rendering");
    return (
      <MapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/light-v9"
        onViewportChange={this._updateViewport}
        mapboxApiAccessToken={TOKEN} >
        
        {this.props.cities.map(this._renderCityMarker)}
        
        {this._renderPopup()}

        <div className="fullscreen" style={fullscreenControlStyle}>
          <FullscreenControl />
        </div>
        <div className="nav" style={navStyle}>
          <NavigationControl onViewportChange={this._updateViewport} />
        </div>

        <div className="scale" style={scaleControlStyle}>
          <ScaleControl />
        </div>

      </MapGL>
    );
  }

}
