//This module is responsible for displaying the map and providing all map page functionality

//On the map page, a user can click and grab to pan around the map.
//A user can click on different icons on the map to reveal a sidebar with info.
//A user can click on the flag icon to place a flag on the map
//A user can click their profile picture to route to their profile

import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { Map, Marker, Tooltip } from 'react-canvas-map'
import "./Map.css"


export const MapForm = () => {
  const markerImage = new Image()
  markerImage.src = `https://res.cloudinary.com/dvdug0mzg/image/upload/v1655240156/Chattanooga%20Map/Transparent_Marker-svg_xfl7po.svg`

  const locationInfoBox = useRef()

  //The following code assigns click events to specific coordinates
  const [ markers, setMarkers ] = useState([]);
    useEffect(() => {
      fetch("http://localhost:8000/locations", {headers:{
        "Authorization": `Token ${localStorage.getItem("auth_token")}`
      }} )
      .then((res) => res.json())
      .then((markerArray) => {
        setMarkers(markerArray);
      });
    }, [] );

  

  const [activeMarker, setActiveMarker] = useState({})
  return (
    <>
      <h1 className="MapHeaderText">Explore the map and try clicking on anything interesting!</h1>
      <div className="MapContainer" style={{ height: '100vh', border: '1px solid #ddd', marginTop: '1rem' }}>

        
          <dialog className="info-box" ref={locationInfoBox} onClick={() => locationInfoBox.current.close()}>
            <h1 id="location-name">{activeMarker.name}</h1>
            <h2 id="location-coordinates">{activeMarker.coordinates}</h2>
            <p id="location-description">{activeMarker.description}</p>
            <img
              id="info-art" src={activeMarker.character_art}
            ></img>
          </dialog>
        

        <Map
          className="MapImage"
          image="https://res.cloudinary.com/dvdug0mzg/image/upload/v1655239993/Chattanooga%20Map/Map_test_2_f5hnxu.png"
          onClick={() => { setActiveMarker({}); }}
          minZoom={1.1}
          maxZoom={0}
          overPan={0}
        >
          {markers.map((marker, markerIndex) => {
            const active = markerIndex === activeMarker
            return (
              <>
                <Marker
                    markerKey={`marker-${markerIndex}`}
                    coords={marker}
                    image={markerImage}
                    onClick={() => {
                      setActiveMarker(marker)
                      setTimeout(locationInfoBox.current.showModal(), 500)

                    }}
                    markerIndex={markerIndex}
                  />
              </>
            )
          })}
        </Map>
      </div>
    </>
  )
}