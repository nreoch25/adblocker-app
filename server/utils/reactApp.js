import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { Provider } from "react-redux";
import { getLoadableState } from "loadable-components/server";
import { configureStore } from "../../client/store";
import AppContainer from "../../client/AppContainer";
import renderer from "./renderer";
import serverConfig from "../config";

export default async (req, res) => {
  const store = configureStore();
  const context = {};
  const appWithRouter = (
    <Provider store={store}>
      <StaticRouter context={{}} location={req.url}>
        <AppContainer />
      </StaticRouter>
    </Provider>
  );
  if (context.url) {
    return res.redirect(context.url);
  }

  const finalState = store.getState();
  const loadableState = await getLoadableState(appWithRouter);
  const initialView = renderToString(appWithRouter)
  res
    .set("Content-Type", "text/html")
    .status(200)
    .end(renderer(initialView, finalState, loadableState));
};
