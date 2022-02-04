/**
 * Possible names of colors for the theme
 */
export type ColorNames =
    | "primary"
    | "secondary"
    | "success"
    | "info"
    | "warning"
    | "danger"
    | "light"
    | "dark";

type OutlineColorNames = `outline-${ColorNames}`;

/**
 * Possible names of button color styles
 */
export type ButtonColorNames = ColorNames | OutlineColorNames;
