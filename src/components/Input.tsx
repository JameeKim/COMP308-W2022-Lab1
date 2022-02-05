import { ComponentPropsWithoutRef, Ref, forwardRef } from "react";
import classNames from "classnames";

type InputRef = HTMLInputElement;
type InputProps = Omit<ComponentPropsWithoutRef<"input">, "id">;

const Input = forwardRef<InputRef, InputProps>(
  ({ name, className, ...props }, ref: Ref<InputRef>) => (
    <input ref={ref}
      className={classNames("form-control", className)}
      name={name}
      id={name}
      {...props}
    />
  ),
);

Input.displayName = "Input";

export default Input;
