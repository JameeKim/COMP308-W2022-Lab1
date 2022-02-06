import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { generateDelay } from "src/utils/serverStub";

export interface Comment {
  courseCode: string;
  section: string;
  studentEmail: string;
  comment: string;
  createdAt: Date;
}

export const numToSection = (num: number): string =>
  `${num < 10 ? "00" : num < 100 ? "0" : ""}${num}`;

export interface CommentsContextData {
  /**
   * Read-only list of all submitted comments
   */
  comments: readonly Readonly<Comment>[];

  /**
   * Add a new comment and return the index of the new comment in the list
   */
  add: (newComment: Readonly<Comment>, cb: (newIndex: number) => void) => void;

  /**
   * Edit a comment at the given index to the newly provided one
   */
  edit: (idx: number, newComment: Readonly<Comment>, cb: () => void) => void;

  /**
   * Remove a comment at the given index
   */
  remove: (idx: number, cb: () => void) => void;
}

const CommentsContext = createContext<CommentsContextData | null>(null);
CommentsContext.displayName = "Comments";

/**
 * Custom hook to use the comments context data
 */
export const useComments = (): CommentsContextData => {
  const data = useContext(CommentsContext);

  if (!data) throw new Error("useComments must be used with CommentsProvider");

  return data;
};

interface CommentsProviderProps {
  children?: ReactNode;
}

export const CommentsProvider =
  ({ children }: CommentsProviderProps): JSX.Element => {
    const [comments, setComments] = useState<readonly Readonly<Comment>[]>([]);

    const add = useCallback<CommentsContextData["add"]>(
      (newComment, cb) => {
        setTimeout(() => {
          setComments(comments.concat(newComment));
          cb(comments.length);
        }, generateDelay());
      },
      [comments],
    );

    const edit = useCallback<CommentsContextData["edit"]>(
      (idx, newComment, cb) => {
        setTimeout(() => {
          const newComments = [...comments];
          newComments[idx] = newComment;
          setComments(newComments);
          cb();
        }, generateDelay());
      },
      [comments],
    );

    const remove = useCallback<CommentsContextData["remove"]>(
      (idx, cb) => {
        setTimeout(() => {
          setComments(comments.filter((_, i) => i !== idx));
          cb();
        }, generateDelay());
      },
      [comments],
    );

    const value = useMemo<CommentsContextData>(
      () => ({ comments, add, edit, remove }),
      [add, comments, edit, remove],
    );

    return (
      <CommentsContext.Provider value={value}>
        {children}
      </CommentsContext.Provider>
    );
  };
