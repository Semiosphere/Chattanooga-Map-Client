import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ReactDOM from "react-dom";
import "./ProfilePic.css"

export const ProfilePicForm = () => {

    const history = useHistory();

    // //fetches from "profile locations" table in database;
     const [pics, setPics] = useState([]);
    // useEffect(() => {
    //     fetch("http://localhost:8000/profilepics", {
    //         headers: {
    //             "Authorization": `Token ${localStorage.getItem("auth_token")}`
    //         }
    //     })
    //         .then((res) => res.json())
    //         .then((picArray) => {
    //             setPics(picArray);
    //         });
    // }, []);

    //fetch profile info to change profile pic
    const [profile, setProfiles] = useState({});
    useEffect(() => {
        profileFetcher()
    }, []);


    const profileFetcher = () => {
        return fetch("http://localhost:8000/profiles/profile", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("auth_token")}`
            }
        })
            .then((res) => res.json())
            .then((profile) => {
                setProfiles(profile);

                const profilePics = []

                profile.locations.map((profileLocation) => {
                    profilePics.push(profileLocation.profile_pic)
                })
                setPics(profilePics)
            });
    }


    const saveProfilePic = (pic) => {
        const updateProfile = {
            id: parseInt(localStorage.getItem("auth_token")),
            profile_pic: pic.id
        };
        const fetchOption = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("auth_token")}`
            },
            body: JSON.stringify(updateProfile),
        };

        return fetch(`http://localhost:8000/profiles/${profile.id}`, fetchOption)
            .then(profileFetcher)
    }

    const logout = () => {
        localStorage.removeItem("gourdgeous_user");
        history.push(`/login`);
    };


    return (
        <>
            <div id="profile-pic-menu-background" style={{ height: '100vh' }}>

                <div className="side-menu">
                    <p id="profile-header-text">My Profile</p>
                    <button className="menu-buttons" id="map-button" onClick={() => history.push(`/map`)}>Return to map</button>
                    <button className="menu-buttons" id="profile-pic-button" onClick={() => history.push(`/profilepic`)}>Choose profile pic</button>
                    <button className="menu-buttons" id="discoveries-button" onClick={() => history.push(`/discoveries`)}>Discoveries</button>
                    <button className="menu-buttons" id="logout-button" onClick={() => logout()}>Logout</button>
                </div>


                <div id={`profile-pic-view`}>
                    <p id="profile-header">Select a profile pic!</p>
                    <img id="current-profile-pic" src={profile.profile_pic?.src}></img>
                    <div id="profile-pic-container">
                        {pics.map((pic) => {
                            return (
                                <>
                                    <img id="single-pic" src={pic.src} onClick={() => saveProfilePic(pic)}></img>
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




//need fetch all profile pics from database