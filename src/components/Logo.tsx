'use client';

import { CldImage } from 'next-cloudinary';
import { useTheme } from 'next-themes';

export function Logo() {
  const { theme } = useTheme();
  const logo =
    theme === 'light'
      ? `https://res.cloudinary.com/joelmturner/image/upload/v1673573341/jmt-logo-light-500w_2_pmadzj.png`
      : `https://res.cloudinary.com/joelmturner/image/upload/v1673573341/jmt-logo-dark-500w_2_pxay5e.png`;

  return (
    <CldImage
      src={logo}
      alt="joelmturner pyramid logo"
      width={600}
      height={200}
      loading="eager"
      sizes="(max-width: 480px) 40vw, 14vw"
    />
  );
}
