import { ComponentPropsWithoutRef, Ref, forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import classNames from "classnames";

import type { ButtonColorNames, ColorNames } from "src/theme";

type LinkRef = HTMLAnchorElement;

type LinkStyleConfig =
  | { type?: "link", color?: ColorNames }
  | { type: "btn", color?: ButtonColorNames };

type LinkProps = LinkStyleConfig & ComponentPropsWithoutRef<typeof RouterLink>;

const Link = forwardRef<LinkRef, LinkProps>(
  ({
    type = "link",
    color = "primary",
    className,
    ...props
  }, ref: Ref<LinkRef>) => {
    const classes = classNames(
      { btn: type === "btn" },
      `${type}-${color}`,
      className,
    );
    return <RouterLink ref={ref} className={classes} {...props} />;
  },
);

Link.displayName = "Link";

export default Link;
