import { ReactNode, RefCallback, useCallback, useState } from "react";

/**
 * Get a watch ref to an element using a callback ref
 */
const useWatchedRef = <E extends ReactNode>(): [E | null, RefCallback<E>] => {
  const [element, setElement] = useState<E | null>(null);

  const cbRef = useCallback<RefCallback<E>>(
    (node) => setElement(node),
    [],
  );

  return [element, cbRef];
};

export default useWatchedRef;
