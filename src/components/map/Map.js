//This module is responsible for displaying the map and providing all map page functionality

//On the map page, a user can click and grab to pan around the map.
//A user can click on different icons on the map to reveal a sidebar with info.
//A user can click their profile picture to route to their profile

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Map, Marker } from 'react-canvas-map'
import { useHistory } from "react-router-dom";
import "./Map.css"


export const MapForm = () => {
  
  const markerImage = new Image()
  markerImage.src = `https://res.cloudinary.com/dvdug0mzg/image/upload/v1655240156/Chattanooga%20Map/Transparent_Marker-svg_xfl7po.svg`

  const history = useHistory()

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
//fetch profile info from server
    const [ profile, setProfiles ] = useState({});
      useEffect(() => {
        fetch("http://localhost:8000/profiles/profile", {headers:{
          "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }} )
        .then((res) => res.json())
        .then((profile) => {
          setProfiles(profile);
        });
    }, [] );



  const [activeMarker, setActiveMarker] = useState({})
//This function is added to the onClick below to add the clicked location to the logged in user's list of discoveries
  const postDiscovery = (location) => {
    fetch(`http://localhost:8000/locations/${location.id}/discover`,
      {
        method: "POST",
        headers: {
          "Authorization": `Token ${localStorage.getItem("auth_token")}`,
          "Content-Type": "application/json",
        }
      }
    )
  }

  const handleMarkerClick = (marker) => {
    setActiveMarker(marker)
    
  }

  return (
    <>

      <div className="MapContainer" style={{ height: '100vh'}}>

        <div className="cmc-logo-container">
          <img id="cmc-logo" src="https://res.cloudinary.com/dvdug0mzg/image/upload/v1655402702/Chattanooga%20Map/CMC_text_mxyiqp.png"></img>
        </div>


        <div className="top-banner" id="map-banner">
          <h1 id="MapHeaderText">Explore the map and try clicking on anything interesting!</h1>
        </div>
        
        <img id="profile-page-button" src={profile.profile_pic?.src} onClick={() => history.push(`/profile`)}></img>

        <div className={`info-box ${activeMarker.name?"show":"hide"}`} id="infoBox">
          <h1 id="location-name">{activeMarker.name}</h1>
          <h2 id="location-coordinates">{activeMarker.coordinates}</h2>
          <p id="location-description">{activeMarker.description}</p>
          <img
            id="location-art" src={activeMarker.character_art}>
          </img>
        </div>
        
        <Map
          className="MapImage"
          image="https://res.cloudinary.com/dvdug0mzg/image/upload/v1655239993/Chattanooga%20Map/Map_test_2_f5hnxu.png"
          onClick={() => { setActiveMarker({})}}
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
                      handleMarkerClick(marker)
                      postDiscovery(marker)
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