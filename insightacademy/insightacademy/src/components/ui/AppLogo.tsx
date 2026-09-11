'use client';

import React, { memo, useMemo } from 'react';


interface AppLogoProps {
  src?: string;
  iconName?: string;
  size?: number;
  className?: string;
  onClick?: () => void;
}

const AppLogo = memo(function AppLogo({
  src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRIL0jk_tHS1m_zxXz5ZQSK_6Ng_ekMvpYzCLmpyY2jPE7R08E8hlcq7s&s=10',
  iconName = 'SparklesIcon',
  size = 64,
  className = '',
  onClick,
}: AppLogoProps) {
  const containerClassName = useMemo(() => {
    const classes = ['flex items-center gap-2'];
    if (onClick) classes.push('cursor-pointer hover:opacity-80 transition-opacity');
    if (className) classes.push(className);
    return classes.join(' ');
  }, [onClick, className]);

  return (
    null
  );
});

export default AppLogo;
