import { useCallback } from "react";

import { useAuth } from "src/auth";

import { Comment, CommentsContextData, useComments } from "src/models/comment";
import courses from "src/models/course";

import Button from "./Button";
import DateDisplay from "./DateDisplay";
import Link from "./Link";

const doNothing = (): void => { /* empty callback */ };

interface CommentCardProps extends Comment {
  idx: number;
  remove: CommentsContextData["remove"];
}

const CommentCard = (props: CommentCardProps): JSX.Element => {
  const { email } = useAuth();

  const { idx, remove } = props;

  const onDelete = useCallback(() => remove(idx, doNothing), [remove, idx]);

  const editButtons = <>
    <Link
      to={`/comment/${props.idx}`}
      type="btn"
      color="outline-primary"
      className="btn-sm ms-auto align-middle"
    >
      Edit
    </Link>
    <Button
      onClick={onDelete}
      color="outline-danger"
      className="btn-sm ms-2"
    >
      Delete
    </Button>
  </>;

  return (
    <li className="card">
      <div className="card-header d-flex align-items-center">
        <h5 className="mb-0">{courses[props.courseCode].name}</h5>
        {props.studentEmail === email && editButtons}
      </div>
      <div className="card-body">
        <div className="card-title h6">Section {props.section}</div>
        <div className="card-subtitle h6 text-muted mb-2">
          {props.studentEmail}
        </div>
        <p className="card-text">{props.comment}</p>
      </div>
      <div className="card-footer text-muted">
        <small><DateDisplay date={props.createdAt} /></small>
      </div>
    </li>
  );
};

const Comments = (): JSX.Element => {
  const { comments, remove } = useComments();

  return (
    <ul className="list-unstyled vstack gap-3">
      {
        [...comments]
          .map((c, idx) =>
            <CommentCard
              key={c.createdAt.getTime()}
              idx={idx}
              remove={remove}
              {...c}
            />)
          .reverse()
      }
    </ul>
  );
};

export default Comments;
