import { css } from 'styled-system/css';
import { styled } from 'styled-system/jsx';

export function Divider(props) {
  return (
    <styled.hr
      className={css({
        opacity: '0.6',
        borderWidth: '0px 0px 1px',
        borderImage: 'initial',
        borderColor: 'inherit',
        borderStyle: 'solid',
        width: '100%',
        marginTop: 'fg.subtle',
      })}
      {...props}
    />
  );
}
