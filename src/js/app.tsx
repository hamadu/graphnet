import * as React from "react";
import * as ReactDOM from "react-dom";

import { World } from "./components/World";

ReactDOM.render(<World width={300} height={300} n={50} />, document.getElementById("app"));
