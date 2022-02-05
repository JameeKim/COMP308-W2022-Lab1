import { ComponentPropsWithoutRef, Ref, forwardRef } from "react";
import classNames from "classnames";

type LabelRef = HTMLLabelElement;

interface LabelProps extends ComponentPropsWithoutRef<"label"> {
  /**
   * Should this label be considered a column?
   */
  col?: boolean;
}

const Label = forwardRef<LabelRef, LabelProps>(
  ({ col, className, ...props }, ref: Ref<LabelRef>) => {
    const classes = classNames(
      `${col ? "col-" : ""}form-label`,
      className,
    );
    return (
      <label ref={ref} className={classes} {...props} />
    );
  },
);

Label.displayName = "Label";

export default Label;
