import type { IllustrationCollectionParam, IllustrationTag } from "./types";

export function updateCollection(): IllustrationTag {
  let collection: IllustrationCollectionParam = "joelmturner_featured";
  if (typeof window !== "undefined") {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    collection = (params.collection as IllustrationTag) ?? "featured";
  }

  return ILLUSTRATION_QUERY_VS_FILTER[collection];
}

export const ILLUSTRATION_QUERY_VS_FILTER: { [key: string]: IllustrationTag } =
  {
    joelmturner_featured: "joelmturner_featured",
    featured: "joelmturner_featured",
    jmt_dorbs: "jmt_dorbs",
    letterclash: "letterclash",
    handletteredabcs_2016: "handletteredabcs_2016",
    abcs16: "handletteredabcs_2016",
    joelmturner_abcs2017: "joelmturner_abcs2017",
    abcs17: "joelmturner_abcs2017",
    inktober2017: "inktober2017",
    inktober2018: "inktober2018",
    inktober2019: "inktober2019",
    inktober2021: "inktober2021",
    inktober2022: "inktober2022",
    inktober2023: "inktober2023",
    inktober2024: "inktober2024",
    ink17: "inktober2017",
    ink18: "inktober2018",
    ink19: "inktober2019",
    ink21: "inktober2021",
    ink22: "inktober2022",
    ink23: "inktober2023",
  } as const;
