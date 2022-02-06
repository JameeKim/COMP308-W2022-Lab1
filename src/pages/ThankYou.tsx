import { useLocation } from "react-router-dom";

import { useAuth } from "src/auth";
import { PageHeading } from "src/layout";

import BlockQuote from "src/components/BlockQuote";
import Link from "src/components/Link";

import { useComments } from "src/models/comment";

import type { LocationState } from "src/utils/routes";

import NotFound from "./NotFound";

/**
 * Thank you page component
 */
const ThankYou = (): JSX.Element => {
  const { email } = useAuth();
  const { comments } = useComments();
  const location = useLocation();

  const idx = (location.state as LocationState)?.newCommentIndex;

  if (!email || idx === undefined) {
    return <NotFound />;
  }

  const { courseCode, section, comment } = comments[idx];

  return (
    <>
      <PageHeading>Thank you</PageHeading>
      <p>Thank you for submitting your comment:</p>
      <BlockQuote
        className="my-4 text-center"
        source={<>{email} on course <em>{courseCode} (Sec. {section})</em></>}
      >
        <p>{comment}</p>
      </BlockQuote>
      <div className="hstack gap-2 justify-content-center">
        <Link to="/comment" type="btn" color="primary">
          Leave a New Comment
        </Link>
        <Link to="/" type="btn" color="primary">Back to Home</Link>
      </div>
    </>
  );
};

export default ThankYou;
