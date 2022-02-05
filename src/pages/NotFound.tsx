import { PageHeading } from "src/layout";
import Link from "src/components/Link";

const NotFound = (): JSX.Element => (
  <>
    <PageHeading>Page Not Found :(</PageHeading>
    <p>The address you tried to reach does not exist.</p>
    <div className="text-center">
      <Link to="/" type="btn" color="primary">Back to Home</Link>
    </div>
  </>
);

export default NotFound;
