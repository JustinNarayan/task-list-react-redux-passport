import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <div className="nav">
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/comments">
          <button>Comments</button>
        </Link>
        <Link to="/compose">
          <button>Compose</button>
        </Link>
      </div>
    </>
  );
};

export default Nav;
