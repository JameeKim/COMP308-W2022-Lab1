import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

import { generateDelay } from "src/utils/serverStub";

export interface Comment {
  courseCode: string;
  section: string;
  studentEmail: string;
  comment: string;
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
        setComments(comments.concat(newComment));
        setTimeout(() => cb(comments.length), generateDelay());
      },
      [comments],
    );

    return (
      <CommentsContext.Provider value={{ comments, add }}>
        {children}
      </CommentsContext.Provider>
    );
  };
