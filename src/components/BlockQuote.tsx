import type { ReactNode } from "react";

interface BlockQuoteProps {
  className?: string;
  children: ReactNode;
  source?: ReactNode;
}

const BlockQuote =
  ({ className, source, children }: BlockQuoteProps): JSX.Element => (
    <figure className={className}>
      <blockquote className="blockquote">{children}</blockquote>
      {source && (
        <figcaption className="blockquote-footer">{source}</figcaption>
      )}
    </figure>
  );

export default BlockQuote;
