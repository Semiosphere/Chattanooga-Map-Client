import React from "react";
import { Route } from "react-router-dom";
import { MapForm } from "./map/Map.js";
import { ProfileForm } from "./profiles/Profile.js"


export const ApplicationViews = () => {
  return (
    <>
      <Route exact path="/map">
        <MapForm />
      </Route>

      <Route exact path="/profile">
        <ProfileForm />
      </Route>
    </>
  );
};
