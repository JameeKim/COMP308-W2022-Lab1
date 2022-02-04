import { ComponentPropsWithoutRef, ReactNode, forwardRef } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";

import generatePortalContext from "src/utils/portal";

/**
 * The type of DOM node that will be the target
 */
export type PageHeadingDOM = HTMLHeadingElement;

const pageHeadingContext = generatePortalContext<PageHeadingDOM>("PageHeading");
const usePageHeading = pageHeadingContext.usePortal;
/**
 * Context provider for the target of page heading
 */
export const PageHeadingProvider = pageHeadingContext.PortalProvider;

/**
 * The target for page heading
 */
export const PageHeadingTarget =
  forwardRef<PageHeadingDOM, ComponentPropsWithoutRef<"h1">>(
    ({ className, ...props }, ref) => (
      // eslint-disable-next-line jsx-a11y/heading-has-content
      <h1 ref={ref} className={classNames("mb-4", className)} {...props} />
    ),
  );
PageHeadingTarget.displayName = "PageHeadingTarget";

/**
 * Props for {@link PageHeading}
 */
interface PageHeadingProps {
  children: ReactNode;
}

/**
 * Injects the children into the page heading
 */
export const PageHeading =
  ({ children }: PageHeadingProps): JSX.Element | null => {
    const target = usePageHeading();

    if (!target) {
      return null;
    }

    return createPortal(children, target);
  };
