import { CSSProperties, ElementType, ReactElement } from 'react';

export type FlexboxProps = React.HTMLAttributes<HTMLElement> & {
  className?: string;
  inline?: boolean;
  vertical?: boolean;
  wrap?: boolean;
  noGrow?: boolean;
  grow?: number;
  shrink?: number;
  basis?: number | 'auto';
  children?: React.ReactNode;
  //
  top?: boolean;
  middle?: boolean;
  bottom?: boolean;
  left?: boolean;
  center?: boolean;
  right?: boolean;
  between?: boolean;
  around?: boolean;

  gap?: boolean | number;
  as?: ElementType;
};

export const getFlexProperties = ({
  top,
  middle,
  bottom,
  left,
  center,
  right,
  between,
  around,
  vertical,
  gap,
}: FlexboxProps) => {
  // check all booleans and return appropriate css
  let primaryAxis = 'initial';
  let secondaryAxis = 'initial';
  let gridGap: string | number = 'none';

  // does primary axis have a value?
  if (left || center || right || between || around) {
    // set value
    if (left) {
      primaryAxis = 'flex-start';
    } else if (center) {
      primaryAxis = 'center';
    } else if (right) {
      primaryAxis = 'flex-end';
    } else if (between) {
      primaryAxis = 'space-between';
    } else if (around) {
      primaryAxis = 'space-around';
    }
  }

  // secondary axis
  if (top || middle || bottom) {
    if (top) {
      secondaryAxis = 'flex-start';
    } else if (middle) {
      secondaryAxis = 'center';
    } else if (bottom) {
      secondaryAxis = 'flex-end';
    }
  }

  // if vertical flip it
  if (vertical) {
    if (left || center || right) {
      if (left) {
        secondaryAxis = 'flex-start';
      } else if (center) {
        secondaryAxis = 'center';
      } else if (right) {
        secondaryAxis = 'flex-end';
      }
    }

    if (top || middle || bottom || between || around) {
      if (top) {
        primaryAxis = 'flex-start';
      } else if (middle) {
        primaryAxis = 'center';
      } else if (bottom) {
        primaryAxis = 'flex-end';
      } else if (between) {
        primaryAxis = 'space-between';
      } else if (around) {
        primaryAxis = 'space-around';
      }
    }
  }

  if (gap) {
    if (gap == true) {
      gridGap = 2;
    } else {
      gridGap = gap;
    }
  }

  return {
    justifyContent: primaryAxis,
    alignItems: secondaryAxis,
    marginLeft: gap && !vertical ? gridGap : 'initial',
    marginTop: gap && vertical ? gridGap : 'initial',
  };
};

export function Flexbox({
  top,
  middle,
  bottom,
  left,
  center,
  right,
  between,
  around,
  vertical,
  gap,
  inline,
  className,
  wrap,
  noGrow,
  children,
  as = 'div',
  ...rest
}: FlexboxProps) {
  const { justifyContent, alignItems, marginLeft, marginTop } = getFlexProperties({
    top,
    middle,
    bottom,
    left,
    center,
    right,
    between,
    around,
    vertical,
    gap,
  });
  const Element = as;
  return (
    <Element
      sx={{
        display: (inline ? 'inline-flex' : 'flex') as CSSProperties,
        flexDirection: (vertical ? 'column' : 'row') as CSSProperties,
        flexWrap: (wrap ? 'wrap' : 'no-wrap') as CSSProperties,
        flex: noGrow ? '0 0 auto' : '1 1 auto',
        justifyContent,
        alignItems,
        '& > * + *': {
          marginLeft,
          marginTop,
        },
      }}
      className={className}
      {...rest}
    >
      {children}
    </Element>
  );
}
