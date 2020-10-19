/** @jsx jsx */
import { jsx } from "theme-ui";
import { FC } from "react";

type NoteProps = {
  children: any;
};

const Note: FC<NoteProps> = ({ children }) => {
  return (
    <div
      sx={{
        bg: "backgroundSubtle",
        pt: 2,
        px: 2,
        pb: 1,
        borderLeftStyle: "solid",
        borderLeftWidth: "5px",
        borderLeftColor: "secondary",
        mb: 2,
        "> p": {
          fontSize: 1,
        },
      }}
    >
      {children}
    </div>
  );
};

Note.displayName = "Note";
export default Note;
