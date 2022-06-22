import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ReactDOM from "react-dom";
import "./Discoveries.css"

export const DiscoveryForm = () => {

    const history = useHistory();

    //fetches from "profile locations" table in database
    const [ discoveries, setDiscoveries ] = useState({});
    useEffect(() => {
      fetch("http://localhost:8000/profiles/profile", {headers:{
        "Authorization": `Token ${localStorage.getItem("auth_token")}`
      }} )
      .then((res) => res.json())
      .then((discoveryArray) => {
        setDiscoveries(discoveryArray);
      });
    }, [] );

    const logout = () => {
        localStorage.removeItem("auth_token");
        history.push(`/login`);
      };
    

    return (
        <>
            <div id="discovery-menu-background" style={{ height: '100vh'}}>

                <div className="side-menu">
                    <p id="profile-header-text">My Profile</p>
                    <button className="menu-buttons" id="map-button" onClick={() => history.push(`/map`)}>Return to map</button>
                    <button className="menu-buttons" id="profile-pic-button" onClick={() => history.push(`/profilepic`)}>Choose profile pic</button>
                    <button className="menu-buttons" id="discoveries-button">Discoveries</button>
                    <button className="menu-buttons" id="logout-button" onClick={() => logout()}>Logout</button>
                </div>

                <div id="discoveries-container">
                    <p id="discoveries-header">Places I've discovered!</p>
                    <div id={`discoveries-view`}>
                        {discoveries.locations?.map((discovery) => {
                            return (
                                <>
                                    <ul id="discoveries-list">
                                        <li>{discovery.name}</li>
                                    </ul>
                                </>
                            )
                        })}
                    </div>
                </div>

                <div className="cmc-logo-container">
                    <img id="cmc-logo" src="https://res.cloudinary.com/dvdug0mzg/image/upload/v1655402702/Chattanooga%20Map/CMC_text_mxyiqp.png"></img>
                </div>

            </div>
        </>
    )
}
