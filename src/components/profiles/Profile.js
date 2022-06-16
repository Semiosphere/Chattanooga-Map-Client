import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ReactDOM from "react-dom";
import "./Profile.css"

export const ProfileForm = () => {

    const history = useHistory();

    const [ discoveries, setDiscoveries ] = useState([]);
    useEffect(() => {
      fetch("http://localhost:8000/profilelocations", {headers:{
        "Authorization": `Token ${localStorage.getItem("auth_token")}`
      }} )
      .then((res) => res.json())
      .then((discoveryArray) => {
        setDiscoveries(discoveryArray);
      });
    }, [] );
    
    
    
    
    return (
        <>
            <div id="menu-background" style={{ height: '100vh'}}>

                <div className="side-menu">
                    <h1 id="profile-header-text">My Profile</h1>
                    <button className="menu-buttons" id="map-button" onClick={() => history.push(`/map`)}>Return to map</button>
                    <button className="menu-buttons" id="profile-pic-button">Choose profile pic</button>
                    <button className="menu-buttons" id="discoveries-button">Discoveries</button>
                    <button className="menu-buttons" id="logout-button">Logout</button>
                </div>

                <div id="discoveries-view">
                    <h1 id="discoveries-header">Places I've discovered!</h1>
                    {discoveries.map((discovery) => {
                        return (
                            <>
                                <ul id="discoveries-list">
                                    <li>{discovery.location.name}</li>
                                </ul>
                            </>
                        )
                    })}
                </div>

                <div className="cmc-logo-container">
                    <img id="cmc-logo" src="https://res.cloudinary.com/dvdug0mzg/image/upload/v1655402702/Chattanooga%20Map/CMC_text_mxyiqp.png"></img>
                </div>

            </div>
        </>
    )
}




//profile page is currently displaying the discovered locations of ALL users

//need white button border when that button is currently selected