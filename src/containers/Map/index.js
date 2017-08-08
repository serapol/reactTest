/* eslint-disable react/prop-types,react/jsx-boolean-value */
import './styles.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import throttle from 'lodash/throttle';
import { Map, Marker, Popup, Icon } from '2gis-maps-react';
import * as Actions from '../../actions';
import {
  ZoomControl,
  Button,
  Dropdown,
  DropdownItem,
  Dialog
} from '../../components';
import POI from '../../constants/POI';

class MapPage extends Component {
  state = {
    zoom: 15,
    center: [46.40644318971359, 30.706990957260135],
    currentPosition: [46.40644318971359, 30.706990957260135],
    markers: [],
    mapSize: {
      width: 800,
      height: 800,
    },
    poiType: '',
    showConfirmClearDialog: false,
    confirmClearCallback: null,
  };

  componentDidMount() {
    this.updateCenterByCurrentLocation();
    this.resizeMap();

    window.addEventListener('resize', this.resizeMap, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeMap, false);
  }

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
    const { center, poiType } = this.state;
    const { findNearbyByType } = this.props.redux.actions.POIActions;

    findNearbyByType(poiType, center);
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

  resizeMap = throttle(() => {
    const rect = this.domNode.getBoundingClientRect();

    this.setState({
      mapSize: {
        width: rect.width,
        height: rect.height,
      },
    });
  }, 200);

  openClearConfirmDialog = () => {
    this.setState({ showConfirmClearDialog: true });
  };

  closeClearConfirmDialog = () => {
    this.setState({ showConfirmClearDialog: false });
  };

  handleZoomChange = (zoom) => {
    this.setState({ zoom });
  };

  handlePOIDropdownChange = (poiType) => {
    this.setState({
      poiType
    }, this.findPOI);
  };

  handleZoomend = (e) => {
    const zoom = e.target.getZoom();

    if (zoom !== this.state.zoom) {
      this.setState({
        zoom
      });
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
      });
    }
  };

  renderActionControls() {
    return (
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
          onClick={this.openClearConfirmDialog}
        >
          Clear map points
        </Button>
      </div>
    );
  }

  renderPOIControls() {
    const { poiType } = this.state;

    return (
      <div className="poi-controls">
        <Dropdown
          value={poiType}
          defaultValue="Choose POI category"
          onChange={this.handlePOIDropdownChange}
        >
          {POI.map((poi, index) => (
            <DropdownItem
              key={index}
              label={poi.title}
              value={poi.type}
            />
          ))}
        </Dropdown>
      </div>
    );
  }

  renderClearConfirmDialog() {
    const { showConfirmClearDialog } = this.state;
    const actions = [
      <Button
        key="button1"
        className="btn-rounded"
        onClick={this.clearMapPoints}
        focused={true}
      >
        Ok
      </Button>,
      <Button
        key="button2"
        className="btn-transparent"
        onClick={this.closeClearConfirmDialog}
      >
        Cancel
      </Button>
    ];

    return (
      <Dialog
        title="Confirm"
        open={showConfirmClearDialog}
        onHide={this.closeClearConfirmDialog}
        actions={actions}
      >
        Are you sure you want clear the all points?
      </Dialog>
    );
  }

  render() {
    const {
      center,
      zoom,
      mapSize,
      currentPosition,
    } = this.state;
    const { mapPoints, poi } = this.props.redux.state;

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
          {poi.map((marker, index) => (
            <Marker
              key={index}
              pos={marker.pos}
            >
              <Popup>{marker.description}</Popup>
              <Icon iconUrl={marker.icon} iconSize={[24, 24]}/>
            </Marker>
          ))}
          <Marker
            pos={currentPosition}
            staticLabel={'My current location'}
          />
        </Map>
        {this.renderActionControls()}
        {this.renderPOIControls()}
        {this.renderClearConfirmDialog()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  mapPoints: state.mapPoints.data,
  poi: state.poi.data,
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
