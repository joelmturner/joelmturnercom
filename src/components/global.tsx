import React from "react";
import { Global as GlobalEmotion } from "@emotion/core";

const Global = () => (
  <GlobalEmotion
    styles={(theme) => ({
      html: {
        fontSize: "100%",
      },
      body: {
        color: theme.colors?.text,
        backgroundColor: theme.colors?.background,
        margin: 0,
      },
    })}
  />
);

export default Global;
