import { Link as PlainLink, useNavigate } from "react-router-dom";

import { useAuth } from "src/auth";
import Button from "src/components/Button";
import Link from "src/components/Link";

const NavBar = (): JSX.Element => {
  const { email, endSession } = useAuth();
  const navigate = useNavigate();

  const onSignOut = (): void => endSession(() => navigate("/"));

  // Sign In / Sign Out buttons at the top right corner
  const authButtons = email
    ? (
      <>
        <span className="navbar-text me-3">{email}</span>
        <Button onClick={onSignOut}>Sign Out</Button>
      </>
    )
    : <Link to="signin" type="btn" color="outline-light">Sign In</Link>;

  return (
    <nav className="navbar navbar-expand navbar-dark bg-primary"
      style={{ "--bs-bg-opacity": 0.8 }}
    >
      <div className="container-md">
        <PlainLink to="/" className="navbar-brand">Navbar</PlainLink>
        <div className="d-flex">{authButtons}</div>
      </div>
    </nav>
  );
};

export default NavBar;
