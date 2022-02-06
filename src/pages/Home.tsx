import { useAuth } from "src/auth";
import { PageHeading } from "src/layout";

import Comments from "src/components/Comments";
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
      <div className="mb-3">
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
      <div>
        <h2 className="mb-3">Comments</h2>
        <Comments />
      </div>
    </>
  );
};

export default Home;
