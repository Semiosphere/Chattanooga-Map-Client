import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ReactDOM from "react-dom";
import "./Profile.css"

export const ProfileForm = () => {

    const history = useHistory();

    //fetches from "profile locations" table in database;
    useEffect(() => {
      fetch("http://localhost:8000/profiles/profile", {headers:{
        "Authorization": `Token ${localStorage.getItem("auth_token")}`
      }} )
      .then((res) => res.json())
    
      });

    const logout = () => {
    localStorage.removeItem("gourdgeous_user");
    history.push(`/login`);
    };
    

    return (
        <>
            <div id="menu-background" style={{ height: '100vh'}}>

                <div className="side-menu">
                    <h1 id="profile-header-text">My Profile</h1>
                    <button className="menu-buttons" id="map-button" onClick={() => history.push(`/map`)}>Return to map</button>
                    <button className="menu-buttons" id="profile-pic-button" onClick={() => history.push(`/profilepic`)}>Choose profile pic</button>
                    <button className="menu-buttons" id="discoveries-button" onClick={() => history.push(`/discoveries`)}>Discoveries</button>
                    <button className="menu-buttons" id="logout-button" onClick={() => logout()}>Logout</button>
                </div>


                <div id={`profile-view`}>
                    <h1 id="profile-header">Welcome to Chattanooga!</h1>
                        <h2 className="profile-questions">Who are the Chatturday Morning Cartoons?</h2>
                        <p className="profile-answers"></p>
                                
                </div>

                <div className="cmc-logo-container">
                    <img id="cmc-logo" src="https://res.cloudinary.com/dvdug0mzg/image/upload/v1655402702/Chattanooga%20Map/CMC_text_mxyiqp.png"></img>
                </div>

            </div>
        </>
    )
    
}





//need white button border when that button is currently selected