import { IllustrationTag } from './types';

export const ILLUSTRATION_FILTER_OPTIONS: { value: IllustrationTag; label: string }[] = [
  { value: 'joelmturner_featured', label: 'Featured' },
  { value: 'letterclash', label: 'LetterClash' },
  { value: 'handletteredabcs_2016', label: 'Handlettered ABCs 2016' },
  { value: 'joelmturner_abcs2017', label: 'Handlettered ABCs 2017' },
  { value: 'inktober2017', label: 'Inktober 2017' },
  { value: 'inktober2018', label: 'Inktober 2018' },
  { value: 'inktober2019', label: 'Inktober 2019' },
  { value: 'inktober2021', label: 'Inktober 2021' },
  { value: 'inktober2022', label: 'Inktober 2022' },
];

export const TIL_CATEGORY_VS_LABEL = {
  'data-vis': 'Data Visualization',
  'personal-development': 'Personal Development',
  node: 'Node',
  'state-management': 'State Management',
  types: 'Types',
  'ui-library': 'UI Library',
  editor: 'Editors',
};

export const ACTIVITIES = [
  'code',
  'draw',
  'hike',
  'drink tea',
  'learn',
  'share learnings',
  'drink kombucha',
  'camp',
];

export const ILLUSTRATION_QUERY_VS_FILTER: { [key: string]: IllustrationTag } = {
  joelmturner_featured: 'joelmturner_featured',
  featured: 'joelmturner_featured',
  letterclash: 'letterclash',
  handletteredabcs_2016: 'handletteredabcs_2016',
  abcs16: 'handletteredabcs_2016',
  joelmturner_abcs2017: 'joelmturner_abcs2017',
  abcs17: 'joelmturner_abcs2017',
  inktober2017: 'inktober2017',
  inktober2018: 'inktober2018',
  inktober2019: 'inktober2019',
  inktober2021: 'inktober2021',
  inktober2022: 'inktober2022',
  ink17: 'inktober2017',
  ink18: 'inktober2018',
  ink19: 'inktober2019',
  ink21: 'inktober2021',
  ink22: 'inktober2022',
};
