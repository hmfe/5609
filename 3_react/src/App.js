import React from "react";
import { ContextProvider } from "./context";

import Search from "./components/search";
import History from "./components/history";

const app = () => {
  return (
    <ContextProvider>
      <article className="container">
        <h1>Ruben's search autocomplete</h1>
        <Search />
        <History />
      </article>
    </ContextProvider>
  );
};

export default app;
