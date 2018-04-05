import loadable from "loadable-components";

export const Index = loadable(() => import("./components/Index"));
export const Upload = loadable(() => import("./components/Upload"));
export const Inventory = loadable(() => import("./components/Inventory"));
export const PageNotFound = loadable(() => import("./components/PageNotFound"));
