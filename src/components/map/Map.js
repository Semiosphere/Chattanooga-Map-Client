//This module is responsible for displaying the map and providing all map page functionality

//On the map page, a user can click and grab to pan around the map.
//A user can click on different icons on the map to reveal a sidebar with info.
//A user can click on the flag icon to place a flag on the map
//A user can click their profile picture to route to their profile

import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Map, Marker, Tooltip } from 'react-canvas-map'
import "./Map.css"


export const MapForm = () => {
  const markerImage = new Image()
  markerImage.src = `https://res.cloudinary.com/dvdug0mzg/image/upload/v1655219025/Chattanooga%20Map/Marker_cklrxc.svg`


  const [markers] = useState([
    //be caff
    { x: 920, y: 630 },
    //mojo
    { x: 965, y: 940 },
    //Infinity Flux
    { x: 1380, y: 810 },
    //Milk and Honey
    { x: 1000, y: 1150 },
    //Southern Squeeze
    { x: 1315, y: 1150 },
    //I Go Tokyo
    { x: 1015, y: 1290 },
    //Good Dog
    { x: 1210, y: 1310 },
    //Lupi's
    { x: 995, y: 1595 },
    //Honest Pint
    { x: 1105, y: 1640 },
    //Pickle Barrel
    { x: 1220, y: 1625 },
    //Champy's
    { x: 1315, y: 1535 },
    //Mean Mug
    { x: 1020, y: 1745 },
    //Frothy Monkey
    { x: 1180, y: 1770 },
    //TBA
    { x: 1630, y: 1700 },
    //Barn Nursery
    { x: 1500, y: 1870 },
  ])
  const [activeMarker, setActiveMarker] = useState(null)
  return (
    <>
      <p className="MapHeaderText">Explore the map and try clicking on anything interesting!</p>
      <div className="MapContainer" style={{ height: '100vh', border: '1px solid #ddd', marginTop: '1rem' }}>
        <Map
          className="MapImage"
          image="https://res.cloudinary.com/dvdug0mzg/image/upload/v1655144891/Chattanooga%20Map/WIP_Map_misolb.png"
          onClick={() => { setActiveMarker(null) }}
          minZoom={1}
          maxZoom={0}
          overPan={0}
        >
          {markers.map((marker, markerIndex) => {
            const active = markerIndex === activeMarker
            return (
              <React.Fragment key={`marker-${markerIndex}`}>
                <Marker
                  markerKey={`marker-${markerIndex}`}
                  coords={marker}
                  image={markerImage}
                  onClick={() => {
                    setActiveMarker(markerIndex)
                  }}
                  markerIndex={markerIndex}
                />
                {active && (
                  <Tooltip coords={marker}>
                    <p>A link looks <a href="/">like this</a>.</p>
                    <p>I am marker {JSON.stringify(marker)}</p>
                  </Tooltip>
                )}
              </React.Fragment>
            )
          })}
        </Map>
      </div>
    </>
  )
}

