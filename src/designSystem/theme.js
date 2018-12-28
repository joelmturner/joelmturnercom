// @flow
import colors from './colors'

export type Theme = {
  background: string,
  header: {
    default: {
      background: string,
      boxShadow: string,
      color: string,
    },
    hover: {
      color: string,
    },
  },
  copy: {
    default: {
      color: string,
      fill: string,
    },
    hover: {
      color: string,
      fill: string,
    },
    h1: string,
    h2: string,
    h3: string,
    h4: string,
    p: string,
    link: {
      default: {
        color: string,
      },
      hover: {
        color: string,
      },
    },
  },
  page: {
    default: {
      color: string,
      fill: string,
    },
    hover: {
      color: string,
      fill: string,
    },
  },
  code: {
    default: {
      background: string,
    },
  },
  blockquote: {
    default: {
      background: string,
      color: string,
      border: string,
    },
  },
  Tabs: {
    default: {
      border: string,
    },
  },
  Tab: {
    default: {
      color: string,
      border: string,
      background: string,
    },
    active: {
      color: string,
      border: string,
      background: string,
    },
  },
  SizeIcons: {
    default: {
      color: string,
    },
    active: {
      color: string,
    },
  },
  Dialog: {
    default: {
      background: string,
    },
  },
}

export type PropType = {
  theme: Theme,
}

export type Themes = {
  light: Theme,
  dark: Theme,
}

export const themes: Themes = {
  light: {
    background: colors.white,
    header: {
      default: {
        background: colors.white,
        boxShadow: 'rgba(0, 0, 0, 0.21)',
        color: colors.navy,
      },
      hover: {
        color: colors.navy,
      },
    },
    copy: {
      default: {
        color: colors.navy,
        fill: colors.navy,
      },
      hover: {
        color: colors.sandstone,
        fill: colors.sandstone,
      },
      h1: colors.navy,
      h2: colors.sandstone,
      h3: colors.navy,
      h4: colors.sandstone,
      p: colors.black,
      link: {
        default: {
          color: colors.sandstone,
        },
        hover: {
          color: colors.sandstone,
        },
      },
    },
    page: {
      default: {
        color: colors.navy,
        fill: colors.navy,
      },
      hover: {
        color: colors.sandstone2,
        fill: colors.sandstone2,
      },
    },
    code: {
      default: {
        background: colors.offWhite,
      },
    },
    blockquote: {
      default: {
        background: colors.white,
        color: colors.sandstone,
        border: colors.sandstone,
      },
    },
    Tabs: {
      default: {
        border: colors.grey,
      },
    },
    Tab: {
      default: {
        color: colors.ash,
        border: 'transparent',
        background: 'transparent',
      },
      active: {
        color: colors.orange,
        border: colors.offWhite,
        background: colors.offWhite,
      },
    },
    SizeIcons: {
      default: {
        color: colors.grey,
      },
      active: {
        color: colors.shade,
      },
    },
    Dialog: {
      default: {
        background: colors.grey,
      },
    },
  },
  dark: {
    background: colors.shadow,
    header: {
      default: {
        background: colors.black,
        boxShadow: 'rgba(255, 255, 255, 0.21)',
        color: colors.navy,
      },
      hover: {
        color: colors.navy,
      },
    },
    copy: {
      default: {
        color: colors.orange,
        fill: colors.orange,
      },
      hover: {
        color: colors.greyishBrown,
        fill: colors.greyishBrown,
      },
      h1: colors.ash,
      h2: colors.orange,
      h3: colors.orange,
      h4: colors.orange,
      p: colors.ash,
      link: {
        default: {
          color: colors.orange,
        },
        hover: {
          color: colors.sandstone,
        },
      },
    },
    page: {
      default: {
        color: colors.navy,
        fill: colors.navy,
      },
      hover: {
        color: colors.sandstone2,
        fill: colors.sandstone2,
      },
    },
    code: {
      default: {
        background: colors.offWhite,
      },
    },
    blockquote: {
      default: {
        background: colors.charcoal,
        color: colors.sandstone,
        border: colors.sandstone,
      },
    },
    Tabs: {
      default: {
        border: colors.shade,
      },
    },
    Tab: {
      default: {
        color: colors.ash,
        border: 'transparent',
        background: 'transparent',
      },
      active: {
        color: colors.orange,
        border: colors.charcoal,
        background: colors.charcoal,
      },
    },
    SizeIcons: {
      default: {
        color: colors.shade,
      },
      active: {
        color: colors.grey,
      },
    },
    Dialog: {
      default: {
        background: colors.charcoal,
      },
    },
  },
}

export default themes
