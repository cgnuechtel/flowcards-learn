import * as React from "react";
import { render } from "react-dom";
import "./styles.css";

import App from "./App";

const rootElement = document.getElementById("todomvcapp");
render(<App />, rootElement);
