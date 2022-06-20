import React from "react";
import { Route } from "react-router-dom";
import { MapForm } from "./map/Map.js";
import { DiscoveryForm } from "./profiles/Discoveries.js";
import { ProfileForm } from "./profiles/Profile.js"
import { ProfilePicForm } from "./profiles/ProfilePic.js"


export const ApplicationViews = () => {
  return (
    <>
      <Route exact path="/map">
        <MapForm />
      </Route>

      <Route exact path="/profile">
        <ProfileForm />
      </Route>

      <Route exact path="/profilepic">
        <ProfilePicForm />
      </Route>

      <Route exact path="/discoveries">
        <DiscoveryForm />
      </Route>
    </>
  );
};
