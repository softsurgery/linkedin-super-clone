import React from "react";

export type BreadcrumbRoute = { title: string; href?: string };

export const BreadcrumbContext = React.createContext({
  routes: [] as BreadcrumbRoute[],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setRoutes: (_routes: BreadcrumbRoute[]) => {},
});

export const useBreadcrumb = () => React.useContext(BreadcrumbContext);
