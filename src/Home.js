import React from "react";
import { Link } from "@reach/router";

class Home extends React.Component {
  render() {
    return (
      <div>
        <Link to={`/tommy`}>
          <button>Tommy - the best player</button>
        </Link>
        <Link to={`/tina`}>
          <button>Tina - runner up</button>
        </Link>
      </div>
    );
  }
}

export default Home;
