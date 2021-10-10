import React from "react";
import { Global as GlobalEmotion } from "@emotion/react";

const Global = () => (
  <GlobalEmotion
    styles={(theme: any) => ({
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
