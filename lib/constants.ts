import { IllustrationTag } from "./types";

export const ILLUSTRATION_FILTER_OPTIONS: { value: IllustrationTag; label: string }[] = [
  { value: "joelmturner_featured", label: "Featured" },
  { value: "letterclash", label: "LetterClash" },
  { value: "handletteredabcs_2016", label: "Handlettered ABCs 2016" },
  { value: "joelmturner_abcs2017", label: "Handlettered ABCs 2017" },
  { value: "inktober2017", label: "Inktober 2017" },
  { value: "inktober2018", label: "Inktober 2018" },
  { value: "inktober2019", label: "Inktober 2019" },
  { value: "inktober2021", label: "Inktober 2021" },
];

export const TIL_CATEGORY_VS_LABEL = {
  "data-vis": "Data Visualization",
  "personal-development": "Personal Development",
  node: "Node",
  "state-management": "State Management",
  types: "Types",
  "ui-library": "UI Library",
  editor: "Editors",
};

export const ACTIVITIES = ["code", "draw", "hike", "drink tea", "learn", "share learnings", "drink kombucha", "camp"];
