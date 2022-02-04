import { ComponentPropsWithoutRef, Ref, forwardRef } from "react";
import classNames from "classnames";

import type { ButtonColorNames } from "src/theme";

type ButtonRef = HTMLButtonElement;

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  color?: ButtonColorNames | "link";
}

const Button = forwardRef<ButtonRef, ButtonProps>(
  ({ color = "primary", className, ...props }, ref: Ref<ButtonRef>) => (
    <button ref={ref}
      className={classNames("btn", `btn-${color}`, className)}
      {...props}
    />
  ),
);

Button.displayName = "Button";

export default Button;
