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
    

    return (
        <>
            <div id="discovery-menu-background" style={{ height: '100vh'}}>

                <div className="side-menu">
                    <h1 id="profile-header-text">My Profile</h1>
                    <button className="menu-buttons" id="map-button" onClick={() => history.push(`/map`)}>Return to map</button>
                    <button className="menu-buttons" id="profile-pic-button" onClick={() => history.push(`/profilepic`)}>Choose profile pic</button>
                    <button className="menu-buttons" id="discoveries-button">Discoveries</button>
                    <button className="menu-buttons" id="logout-button">Logout</button>
                </div>


                <div id={`discoveries-view`}>
                    <h1 id="discoveries-header">Places I've discovered!</h1>
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

                <div className="cmc-logo-container">
                    <img id="cmc-logo" src="https://res.cloudinary.com/dvdug0mzg/image/upload/v1655402702/Chattanooga%20Map/CMC_text_mxyiqp.png"></img>
                </div>

            </div>
        </>
    )
}





//need white button border when that button is currently selected