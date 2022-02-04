/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
declare module "csstype" {
  interface Properties<TLength = (string & {}) | 0, TTime = string & {}> {
      /**
       * Opacity of the background for Bootstrap background colors
       */
    "--bs-bg-opacity"?: Property.Opacity;
  }
}
