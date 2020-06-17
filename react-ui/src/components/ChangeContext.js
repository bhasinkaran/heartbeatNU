import React from "react";
import { InfoContext } from "../App";

export default function ChangeContext() {
  const [context, setContext] = React.useContext(InfoContext);
  return (
    <div className="App">
      <h1>{context.userid} uid</h1>
      <a href="/check2">
      <button
        onClick={e => {
          setContext({ ...context, userid: 123 });
        }}
      >
        click me
      </button>
      </a>
    </div>
  );
}
