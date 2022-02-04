import { Link } from "react-router-dom";

const Layout = (): JSX.Element => (
  <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary"
      style={{ "--bs-bg-opacity": 0.5 }}
    >
      <div className="container-md">
        <Link to="/" className="navbar-brand">Navbar</Link>
      </div>
    </nav>
  </>
);

export default Layout;
