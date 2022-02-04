import { Link as PlainLink } from "react-router-dom";

import { useAuth } from "src/auth";
import Button from "src/components/Button";
import Link from "src/components/Link";

const NavBar = (): JSX.Element => {
  const { email } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary"
      style={{ "--bs-bg-opacity": 0.5 }}
    >
      <div className="container-md">
        <PlainLink to="/" className="navbar-brand">Navbar</PlainLink>
        {
          email
            ? <Button>Sign Out</Button>
            : <Link to="signin" type="btn" color="outline-light">Sign In</Link>
        }
      </div>
    </nav>
  );
};

export default NavBar;
