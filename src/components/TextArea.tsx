import { ComponentPropsWithoutRef, Ref, forwardRef } from "react";
import classNames from "classnames";

type TextAreaRef = HTMLTextAreaElement;
type TextAreaProps = Omit<ComponentPropsWithoutRef<"textarea">, "id">;

const TextArea = forwardRef<TextAreaRef, TextAreaProps>(
  ({ name, className, ...props }, ref: Ref<TextAreaRef>) => (
    <textarea ref={ref}
      className={classNames("form-control", className)}
      name={name}
      id={name}
      {...props}
    />
  ),
);

TextArea.displayName = "TextArea";

export default TextArea;
