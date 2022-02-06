import {
  ChangeEventHandler,
  FormEventHandler,
  Reducer,
  useCallback,
  useReducer,
} from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useRequiredAuth } from "src/auth";
import { PageHeading } from "src/layout";

import Button from "src/components/Button";
import Input from "src/components/Input";
import Label from "src/components/Label";
import TextArea from "src/components/TextArea";

import {
  Comment as CommentType,
  numToSection,
  useComments,
} from "src/models/comment";
import courses, { Course } from "src/models/course";

import NotFound from "./NotFound";

interface CommentState {
  course: Readonly<Course> | null;
  code: string;
  name: string;
  section: string;
  comment: string;
}

const defaultState: CommentState = {
  course: null,
  code: "",
  name: "",
  section: "001",
  comment: "",
};
Object.freeze(defaultState);

const commentStateInit = (comment: CommentType | null): CommentState => ({
  course: courses[comment?.courseCode || "invalid"] || defaultState.course,
  code: comment?.courseCode || defaultState.code,
  name: courses[comment?.courseCode || "invalid"]?.name || defaultState.name,
  section: comment?.section || defaultState.section,
  comment: comment?.comment || defaultState.comment,
});

interface CommentAction {
  type: keyof CommentState;
  value: string;
}

const commentReducer: Reducer<CommentState, CommentAction> = (s, a) => {
  const n: CommentState = { ...s };

  switch (a.type) {
  case "course":
    n.course = courses[a.value] || null;
    if (n.course && n.course.sections < Number(n.section)) {
      n.section = numToSection(n.course.sections);
    }
    break;
  case "section":
    n.section = numToSection(Number(a.value));
    break;
  case "code":
  case "name":
  case "comment":
    n[a.type] = a.value;
    break;
  }

  return n;
};

type FormInputElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

const courseOption = ({ code, name }: Course): JSX.Element =>
  <option key={code} value={code}>{code} ({name})</option>;

/**
 * Comment page component
 */
const Comment = (): JSX.Element => {
  const { email } = useRequiredAuth();
  const { comments, add, edit } = useComments();
  const idxParam = useParams().commentIdx;
  const navigate = useNavigate();

  let currentIdx: number | undefined = undefined;
  try {
    currentIdx = Number(idxParam);
  } catch (e) {
    // ignore
  }

  const stateInitData =
    currentIdx !== undefined && currentIdx < comments.length
      ? comments[currentIdx]
      : null;

  // state for input values in the form
  const [{ course, code, name, section, comment }, dispatch] = useReducer(
    commentReducer,
    stateInitData,
    commentStateInit,
  );

  // handle input value changes
  const onFormInputChange = useCallback<ChangeEventHandler<FormInputElement>>(
    ({ target }) => dispatch({
      type: target.name as keyof CommentState,
      value: target.value,
    }),
    [],
  );

  if (stateInitData && stateInitData.studentEmail !== email) {
    return <NotFound />;
  }

  // form submit handler
  const courseCode = course?.code || code;
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (currentIdx !== undefined && currentIdx < comments.length) {
      edit(
        currentIdx,
        {
          courseCode,
          section: section,
          studentEmail: email,
          comment,
          createdAt: comments[currentIdx].createdAt,
        },
        () => navigate("/"),
      );
    } else {
      add(
        {
          courseCode,
          section: section,
          studentEmail: email,
          comment,
          createdAt: new Date(),
        },
        (idx) => navigate("/thankyou", { state: { newCommentIndex: idx } }),
      );
    }
  };

  return (
    <>
      <PageHeading>
        {stateInitData ? "Edit" : "Leave"} Your Comment
      </PageHeading>

      <form onSubmit={onSubmit} className="vstack gap-4">

        <fieldset className="vstack gap-3">
          <legend className="mb-0">Course Information</legend>
          <div>
            <Label htmlFor="course">Course</Label>
            <select
              value={course?.code || ""}
              onChange={onFormInputChange}
              name="course"
              id="course"
              className="form-select"
              required
            >
              {Object.keys(courses)
                .sort()
                .map((c) => courses[c])
                .map(courseOption)}
              <option value="">Other</option>
            </select>
          </div>
          <div className="row">
            <div className="col-12 col-sm mb-2 mb-sm-0">
              <Label htmlFor="course-code">Course Code</Label>
              <Input
                value={course?.code || code}
                onChange={onFormInputChange}
                type="text"
                name="code"
                required
                readOnly={!!course}
              />
            </div>
            <div className="col-12 col-sm">
              <Label htmlFor="course-section">Course Section</Label>
              <Input
                value={section}
                onChange={onFormInputChange}
                min="1"
                max={course?.sections || 999}
                type="number"
                name="section"
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="course-name">Course Name</Label>
            <Input
              value={course?.name || name}
              onChange={onFormInputChange}
              type="text"
              name="name"
              required
              readOnly={!!course}
            />
          </div>
        </fieldset>

        <fieldset className="vstack gap-3">
          <legend className="mb-0">Your Input</legend>
          <div>
            <Label htmlFor="student-email">Student Email</Label>
            <Input
              value={email || ""}
              type="email"
              name="student-email"
              required
              readOnly
            />
          </div>
          <div>
            <Label htmlFor="comment">Comment</Label>
            <TextArea
              value={comment}
              onChange={onFormInputChange}
              name="comment"
              required
            />
          </div>
        </fieldset>

        <Button type="submit">Submit</Button>

      </form>
    </>
  );
};

export default Comment;
