import { Route, Routes } from "react-router-dom";

import Layout from "src/theme/Layout";

const App = (): JSX.Element => (
  <Routes>
    <Route path="/" element={<Layout />} />
  </Routes>
);

export default App;
