import { Route, Routes } from "react-router-dom";

import { AuthProvider, RequireAuth } from "src/auth";
import Layout from "src/layout";

import Comment from "src/pages/Comment";
import Home from "src/pages/Home";
import NotFound from "src/pages/NotFound";
import SignIn from "src/pages/SignIn";
import ThankYou from "src/pages/ThankYou";

import { CommentsProvider } from "./models/comment";

/**
 * The main application
 */
const App = (): JSX.Element => (
  <AuthProvider>
    <CommentsProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="comment">
            <Route index element={<RequireAuth><Comment /></RequireAuth>} />
            <Route
              path=":commentIdx"
              element={<RequireAuth><Comment /></RequireAuth>}
            />
          </Route>
          <Route path="thankyou" element={<ThankYou />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </CommentsProvider>
  </AuthProvider>
);

export default App;
