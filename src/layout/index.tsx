import { Outlet } from "react-router-dom";

import useWatchedRef from "src/utils/useWatchedRef";

import NavBar from "./NavBar";
import {
  PageHeadingDOM,
  PageHeadingProvider,
  PageHeadingTarget,
} from "./PageHeading";

export { PageHeading } from "./PageHeading";

/**
 * The main layout of the whole page
 */
const Layout = (): JSX.Element => {
  const [headingDOM, headingRef] = useWatchedRef<PageHeadingDOM>();

  return (
    <>
      <NavBar />
      <div className="container-max-md mt-4 p-3">
        <PageHeadingTarget ref={headingRef} />
        <PageHeadingProvider value={headingDOM}>
          <Outlet />
        </PageHeadingProvider>
      </div>
    </>
  );
};

export default Layout;
