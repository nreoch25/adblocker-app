import loadable from "loadable-components";

export const Index = loadable(() => import("./components/Index"));
export const About = loadable(() => import("./components/About"));
export const Upload = loadable(() => import("./components/Upload"));
export const Inventory = loadable(() => import("./components/Inventory"));
export const Logout = loadable(() => import("./components/Logout"));
export const Signup = loadable(() => import("./components/Signup"));
export const PageNotFound = loadable(() => import("./components/PageNotFound"));
