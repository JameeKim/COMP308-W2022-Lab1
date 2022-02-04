import { Provider, createContext, useContext } from "react";

/**
 * The return type of {@link generatePortalContext}
 */
interface GeneratedPortalContext<E extends HTMLElement = HTMLElement> {
  /**
   * Custom hook for retrieving the DOM node to inject the portal
   */
  readonly usePortal: () => E | null;

  /**
   * Context provider
   */
  readonly PortalProvider: Provider<E | null | undefined>;
}

/**
 * Generator of react portal context
 */
const generatePortalContext =
  <E extends HTMLElement = HTMLElement>(displayName = "Portal"):
  GeneratedPortalContext<E> => {
    const PortalContext = createContext<E | null | undefined>(undefined);
    PortalContext.displayName = displayName;

    const usePortal = (): E | null => {
      const data = useContext(PortalContext);

      if (data === undefined) {
        throw new Error(
          `use${displayName} must be used with ${displayName}.Provider`,
        );
      }

      return data;
    };

    const PortalProvider = PortalContext.Provider;

    return { usePortal, PortalProvider };
  };

export default generatePortalContext;
