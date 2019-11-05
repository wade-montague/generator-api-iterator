import * as React from "react";
import { render } from "react-dom";
import SuperGoTeam from "./SuperGoTeam";

import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";

import "./SuperGoTeam.css";
import "./app.css";

import { StarwarsHeroes } from "./StarwarsHeroes";

const App = () => {
  const [started, setStarted] = React.useState(false);
  return started ? (
    <StarwarsHeroes />
  ) : (
    <SuperGoTeam onClick={() => setStarted(true)} />
  );
};

render(<App />, document.getElementById("root"));
