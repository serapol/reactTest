import './styles.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import throttle from 'lodash/throttle';
import {
  ZoomControl,
  Button,
  Dropdown,
  DropdownItem,
} from '../../components';
import { Map, Marker, Popup } from '2gis-maps-react';

const POI_CATEGORIES = [
  'pharmacies',
  'gas stations',
  'schools',
  'restaurants',
];

class MapPage extends Component {
  state = {
    zoom: 20,
    center: [46.40644318971359, 30.706990957260135],
    currentPosition: [46.40644318971359, 30.706990957260135],
    markers: [],
    mapSize: {
      width: 800,
      height: 800,
    },
    poiCategory: ''
  };

  updateCenterByCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        const { latitude, longitude } = location.coords;

        this.setState({
          center: [latitude, longitude],
          currentPosition: [latitude, longitude],
        });
      }
    );
  }

  componentDidMount() {
    this.updateCenterByCurrentLocation();
    this.resizeMap();

    window.addEventListener('resize', this.resizeMap, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeMap, false);
  }

  resizeMap = throttle(() => {
    const rect = this.domNode.getBoundingClientRect();

    this.setState({
      mapSize: {
        width: rect.width,
        height: rect.height,
      },
    });
  }, 200);

  handleZoomChange = (zoom) => {
    this.setState({ zoom });
  };

  addMarker = ({ latlng }) => {
    const description = prompt('Please fill a marker description');

    this.props.redux.actions.MapPointsActions.addPoint({
      description,
      pos: [latlng.lat, latlng.lng]
    });
  };

  saveMapPoints = () => {
    const { mapPoints } = this.props.redux.state;
    const { savePoints } = this.props.redux.actions.MapPointsActions;

    savePoints(mapPoints);
  };

  loadMapPoints = () => {
    const { loadPoints } = this.props.redux.actions.MapPointsActions;

    loadPoints();
  };

  clearMapPoints = () => {
    const { mapPoints } = this.props.redux.state;
    const { clearPoints } = this.props.redux.actions.MapPointsActions;

    clearPoints(mapPoints);
  };

  findPOI = () => {
    const { center, poiCategory } = this.state;

  };

  handlePOIDropdownChange = (poiCategory) => {
    this.setState({
      poiCategory
    }, this.findPOI)
  };

  handleZoomend = (e) => {
    const zoom = e.target.getZoom();

    if (zoom !== this.state.zoom) {
      this.setState({
        zoom
      })
    }
  };

  handleMoveend = (e) => {
    const center = e.target.getCenter();
    const [ lat, lng ] = this.state.center;

    if (lat !== center.lat
      && lng !== center.lng
    ) {
      this.setState({
        center: [center.lat, center.lng]
      })
    }
  };

  render() {
    const {
      center,
      zoom,
      mapSize,
      poiCategory,
      currentPosition,
    } = this.state;
    const { mapPoints } = this.props.redux.state;

    return (
      <div
        className="map-page page-content"
        ref={(node) => this.domNode = node}
      >
        <ZoomControl
          max={20}
          min={10}
          value={zoom}
          onChange={this.handleZoomChange}
        />
        <Map
          style={mapSize}
          center={center}
          zoom={zoom}
          zoomControl={false}
          fullscreenControl={false}
          onClick={this.addMarker}
          onZoomend={this.handleZoomend}
          onMoveend ={this.handleMoveend}
        >
          {mapPoints.map((marker, index) => (
            <Marker
              key={index}
              pos={marker.pos}
            >
              <Popup>{marker.description}</Popup>
            </Marker>
          ))}
          <Marker
            pos={currentPosition}
            staticLabel={'My current location'}
          />
        </Map>
        <div className="action-controls">
          <Button
            className="btn-rounded"
            onClick={this.saveMapPoints}
          >
            Save map points
          </Button>
          <Button
            className="btn-rounded"
            onClick={this.loadMapPoints}
          >
            Load map points
          </Button>
          <Button
            className="btn-rounded btn-danger"
            onClick={this.clearMapPoints}
          >
            Clear map points
          </Button>
        </div>
        <div className="filter-controls">
          <Dropdown
            value={poiCategory}
            defaultValue="Choose POI category"
            onChange={this.handlePOIDropdownChange}
          >
            {POI_CATEGORIES.map((poiCategory) => (
              <DropdownItem
                label={poiCategory}
                value={poiCategory}
              />
            ))}
          </Dropdown>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  mapPoints: state.mapPoints.data,
});

const mapDispatchToProps = (dispatch) => {
  let obj = {};

  Object.keys(Actions).map(function (actionsName) {
    if (actionsName !== '__esModule') {
      obj[actionsName] = bindActionCreators(Actions[actionsName], dispatch);
    }
  });

  return obj;
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  redux: {
    state: stateProps,
    actions: dispatchProps
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(MapPage);
