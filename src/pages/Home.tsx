import { useAuth } from "src/auth";
import { PageHeading } from "src/layout";

import Link from "src/components/Link";

const Home = (): JSX.Element => {
  const { email } = useAuth();

  const text = email
    ? "To leave a new comment, press the button below."
    : "Please sign in to leave a comment.";
  const btnText = email ? "Leave a New Comment" : "Sign In";

  return (
    <>
      <PageHeading>
        Welcome{email && <small>, {email.split("@")[0]}</small>}
      </PageHeading>
      <div>
        <p className="h4 mb-4">{text}</p>
        <div className="text-center">
          <Link
            to={email ? "comment" : "signin"}
            type="btn"
            color="primary"
            className="btn-lg"
          >{btnText}</Link>
        </div>
      </div>
    </>
  );
};

export default Home;
