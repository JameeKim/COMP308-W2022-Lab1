import { Route, Routes } from "react-router-dom";

import { AuthProvider } from "src/auth";
import Layout from "src/layout";

import Home from "src/pages/Home";
import SignIn from "src/pages/SignIn";

/**
 * The main application
 */
const App = (): JSX.Element => (
  <AuthProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="signin" element={<SignIn />} />
      </Route>
    </Routes>
  </AuthProvider>
);

export default App;
