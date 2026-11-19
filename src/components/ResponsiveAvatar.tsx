import React, { useState } from 'react';
import { profileData } from '../data/profile';

export interface ResponsiveAvatarProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  alt?: string;
  priority?: boolean;
}

export const ResponsiveAvatar: React.FC<ResponsiveAvatarProps> = ({
  size = 'md',
  className = '',
  alt = profileData.name,
  priority = false,
}) => {
  const [imageError, setImageError] = useState(false);

  // Size configurations with exact dimensions for zero CLS (Cumulative Layout Shift)
  const sizeStyles: Record<
    ResponsiveAvatarProps['size'] & string,
    {
      wrapper: string;
      width: number;
      height: number;
      avifSrcSet: string;
      jpgSrcSet: string;
      fallbackSrc: string;
    }
  > = {
    xs: {
      wrapper: 'w-7 h-7 sm:w-8 sm:h-8',
      width: 32,
      height: 32,
      avifSrcSet: '/assets/profile/avatar-sm.avif 1x, /assets/profile/avatar-md.avif 2x',
      jpgSrcSet: '/assets/profile/avatar-sm.jpg 1x, /assets/profile/avatar-md.jpg 2x',
      fallbackSrc: '/assets/profile/avatar-sm.jpg',
    },
    sm: {
      wrapper: 'w-8 h-8 sm:w-10 sm:h-10',
      width: 40,
      height: 40,
      avifSrcSet: '/assets/profile/avatar-sm.avif 1x, /assets/profile/avatar-md.avif 2x',
      jpgSrcSet: '/assets/profile/avatar-sm.jpg 1x, /assets/profile/avatar-md.jpg 2x',
      fallbackSrc: '/assets/profile/avatar-sm.jpg',
    },
    md: {
      wrapper: 'w-24 h-28 sm:w-32 sm:h-40',
      width: 128,
      height: 160,
      avifSrcSet: '/assets/profile/avatar-md.avif 1x, /assets/profile/avatar-lg.avif 2x',
      jpgSrcSet: '/assets/profile/avatar-md.jpg 1x, /assets/profile/avatar-lg.jpg 2x',
      fallbackSrc: '/assets/profile/avatar-md.jpg',
    },
    lg: {
      wrapper: 'w-32 h-40 sm:w-44 sm:h-52',
      width: 176,
      height: 208,
      avifSrcSet: '/assets/profile/avatar-lg.avif 1x, /assets/profile/avatar-lg.avif 2x',
      jpgSrcSet: '/assets/profile/avatar-lg.jpg 1x, /assets/profile/avatar-lg.jpg 2x',
      fallbackSrc: '/assets/profile/avatar-lg.jpg',
    },
    xl: {
      wrapper: 'w-48 h-60 sm:w-60 sm:h-76',
      width: 240,
      height: 304,
      avifSrcSet: '/assets/profile/avatar-lg.avif 1x, /assets/profile/avatar-lg.avif 2x',
      jpgSrcSet: '/assets/profile/avatar-lg.jpg 1x, /assets/profile/avatar-lg.jpg 2x',
      fallbackSrc: '/assets/profile/avatar-lg.jpg',
    },
  };

  const currentSize = sizeStyles[size] || sizeStyles.md;

  if (imageError || !profileData.avatarUrl) {
    return (
      <div
        className={`relative flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0F1A33] to-[#182D66] text-white shadow-xs select-none ${currentSize.wrapper} ${className}`}
        style={{ width: currentSize.width, height: currentSize.height }}
      >
        {/* Crisp Vector SVG Monogram for Instant Resolution Independence */}
        <svg
          viewBox="0 0 100 100"
          className="w-3/4 h-3/4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="50" cy="50" r="46" stroke="#4D9BFF" strokeWidth="2" strokeDasharray="4 4" opacity="0.4" />
          <path
            d="M32 72L48 28H52L68 72H60L56.5 61H43.5L40 72H32ZM45.8 54H54.2L50 41.5L45.8 54Z"
            fill="#E6F0FF"
          />
          <circle cx="70" cy="30" r="4" fill="#2563EB" />
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-xl border border-zinc-200/80 bg-zinc-100 shadow-xs ${currentSize.wrapper} ${className}`}
    >
      <picture>
        {/* Modern AVIF format (90%+ smaller, superior compression) */}
        <source type="image/avif" srcSet={currentSize.avifSrcSet} />
        {/* Universal Progressive JPEG fallback */}
        <source type="image/jpeg" srcSet={currentSize.jpgSrcSet} />
        <img
          src={currentSize.fallbackSrc}
          alt={alt}
          width={currentSize.width}
          height={currentSize.height}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          onError={() => setImageError(true)}
          className="h-full w-full object-cover object-top transition-transform duration-300 hover:scale-[1.02]"
        />
      </picture>
    </div>
  );
};
