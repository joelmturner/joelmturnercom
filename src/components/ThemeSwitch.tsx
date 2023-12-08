'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun, CircleDashed } from 'lucide-react';
import { Icon } from './Icon';
import { css } from 'styled-system/css';

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [setTheme, theme]);

  if (!mounted) {
    return (
      <Icon className={css({ opacity: '0.2' })}>
        <CircleDashed />
      </Icon>
    );
  }

  return (
    <Icon
      onClick={handleToggleTheme}
      className={css({
        color: { _light: 'brand.300', _dark: 'brand.500' },
        cursor: 'pointer',
      })}
    >
      {theme === 'dark' ? <Sun /> : <Moon />}
    </Icon>
  );
};

export default ThemeSwitch;
