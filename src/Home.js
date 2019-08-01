import React from "react";
import { Link } from "@reach/router";

class Home extends React.Component {
  render() {
    return (
      <div>
        <Link to={`/tommy`}>
          <button>Tommy - skillful tien len master</button>
        </Link>
        <Link to={`/tina`}>
          <button>Tina - ok at tien len</button>
        </Link>
      </div>
    );
  }
}

export default Home;
