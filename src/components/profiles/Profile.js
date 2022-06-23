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
                    <p id="profile-header-text">My Profile</p>
                    <button className="menu-buttons" id="map-button" onClick={() => history.push(`/map`)}>Return to map</button>
                    <button className="menu-buttons" id="profile-pic-button" onClick={() => history.push(`/profilepic`)}>Choose profile pic</button>
                    <button className="menu-buttons" id="discoveries-button" onClick={() => history.push(`/discoveries`)}>Discoveries</button>
                    <button className="menu-buttons" id="logout-button" onClick={() => logout()}>Logout</button>
                </div>


                <div id={`profile-view`}>
                    <p id="profile-header">Welcome to Chattanooga!</p>
                        <p className="profile-questions">Who are the Chatturday Morning Cartoons?</p>
                        <p className="profile-answers">This cartoonish collection is the result of an ongoing collaboration between myself and my favorite city, Booger Hole, West Virg er..... Chattanooga!
                        Each character represents a different local business. I factor in all kinds of details like the business's atmosphere, the colors of their branding, and the company's name when
                        designing each one. These illustrations are sold as prints and stickers at local markets and a few of the represented businesses even bought the rights to use the characters however
                        they like! </p>
                        <p className="profile-questions">Why a map?</p>
                        <p className="profile-answers">Since starting on my journey to become a web developer, I've grown more and more excited about breathing new life into my old projects. When the time
                        came to scheme up my final capstone project for my coding boot camp, I knew the Chatturday Morning Cartoons had potential. I envisioned these characters hiding around a map, waiting
                        to be discovered. Their friendly designs informed the direction of the project and the whole thing quickly fell into place.</p>
                        <p className="profile-questions">Who's next?</p>
                        <p className="profile-answers">I crank out a few characters whenever I get the itch. There is one currently in development but it didn't make the cut for this project. If there's a 
                        Chattanooga business that you just L O V E, reach out and maybe I'll add it to the pantheon!</p>
                                
                </div>

                <div className="cmc-logo-container">
                    <img id="cmc-logo" src="https://res.cloudinary.com/dvdug0mzg/image/upload/v1655402702/Chattanooga%20Map/CMC_text_mxyiqp.png"></img>
                </div>

                <p id="profile-contact-info"><p className="profile-info-header">Email:</p> ZachDuggerWebDev@gmail.com <p className="profile-info-header">LinkedIn:</p> https://www.linkedin.com/in/zach-dugger/ <p className="profile-info-header">Instagram:</p> @ZTD_Illustrated <p className="profile-info-header">Favorite Childhood Food:</p> Butter!</p>

            </div>
        </>
    )
    
}





//need white button border when that button is currently selected