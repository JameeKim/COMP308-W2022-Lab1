import { useCallback } from "react";
import { Link as PlainLink, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "src/auth";

import Button from "src/components/Button";
import Link from "src/components/Link";

const NavBar = (): JSX.Element => {
  const { email, endSession } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const onSignOut = useCallback(
    () => {
      endSession(() => {
        if (location.pathname !== "/") {
          navigate("/");
        }
      });
    },
    [endSession, location.pathname, navigate],
  );

  // Sign In / Sign Out buttons at the top right corner
  const splitEmail = email?.split("@");
  const authButtons = splitEmail
    ? (
      <>
        <span className="navbar-text">{splitEmail[0]}</span>
        <span className="navbar-text d-none d-sm-inline">
          @{splitEmail[1]}
        </span>
        <Button onClick={onSignOut} className="ms-3">Sign Out</Button>
      </>
    )
    : (
      <Link
        to="/signin"
        type="btn"
        color="outline-light"
        replace
        state={{ from: location }}
      >
        Sign In
      </Link>
    );

  return (
    <nav className="navbar navbar-expand navbar-dark bg-primary"
      style={{ "--bs-bg-opacity": 0.8 }}
    >
      <div className="container">
        <PlainLink to="/" className="navbar-brand">Navbar</PlainLink>
        <div className="d-flex">{authButtons}</div>
      </div>
    </nav>
  );
};

export default NavBar;
