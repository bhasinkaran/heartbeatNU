import React from "react";
import { InfoContext } from "../App";

export default function ViewChange() {
  const [context, setContext] = React.useContext(InfoContext);
  return (
    <div className="App">
      <h1>{context.userid} uid</h1>
    </div>
  );
}
