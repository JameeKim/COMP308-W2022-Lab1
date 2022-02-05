import { Route, Routes } from "react-router-dom";

import { AuthProvider } from "src/auth";
import Layout from "src/layout";

import Home from "src/pages/Home";
import NotFound from "src/pages/NotFound";
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
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </AuthProvider>
);

export default App;
