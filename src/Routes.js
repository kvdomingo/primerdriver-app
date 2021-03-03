import React, { lazy } from "react";
import { Route, Switch } from "react-router-dom";
import Menu from "./components/menu/Menu";
import "./App.css";

const Characterize = lazy(() => import("./components/menu/Characterize"));
const Dna = lazy(() => import("./components/menu/DnaView"));
const Protein = lazy(() => import("./components/menu/ProteinView"));
const Results = lazy(() => import("./components/menu/Result"));

export default function Routes(props) {
  return (
    <Switch>
      <Route exact path="/" component={Menu} />
      <Route path="/characterize" render={() => <Characterize {...props} />} />
      <Route path="/dna" render={() => <Dna {...props} />} />
      <Route path="/protein" render={() => <Protein {...props} />} />
      <Route path="/results" render={() => <Results results={props.res} mode={props.mode} />} />
    </Switch>
  );
}
