// import "./Map.css";
import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";

const customMarker = new L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [13, 0]
});

const MapLeaflet = ()=> {
 
var state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 13
};

 
    const position = [state.lat, state.lng];
    return (
      <div id="map">
        <Map style={{ height: "100vh" }} center={position} zoom={13}>
          <TileLayer
            detectRetina={true}
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position} icon={customMarker}>
            <Popup>
              A pretty CSS3 popup.
              <br />
              Easily customizable.
            </Popup>
          </Marker>
        </Map>
      </div>
    );
  
}
export default  MapLeaflet;