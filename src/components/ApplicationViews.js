import React from "react";
import { Route } from "react-router-dom";
import { MapForm } from "./map/Map.js"


export const ApplicationViews = () => {
  return (
    <>
      <Route exact path="/map">
        <MapForm />
      </Route>
    </>
  );
};
