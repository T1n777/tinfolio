import GlassSurface from './react-bits/GlassSurface';

interface Props {
  href: string;
  label: string;
  direction?: 'up' | 'down';
  external?: boolean;
  download?: boolean;
  className?: string;
}

export default function GlassLink({
  href,
  label,
  direction = 'up',
  external,
  download,
  className = '',
}: Props) {
  return (
    <a
      href={href}
      className={`glass-link ${className}`}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      download={download || undefined}
    >
      <GlassSurface
        idPrefix={`link-${label.replace(/[^a-z0-9]/gi, '').toLowerCase()}`}
        width="100%"
        height={54}
        borderRadius={28}
        borderWidth={0.07}
        distortionScale={-180}
        displace={0.5}
        brightness={50}
        opacity={0.93}
        blur={11}
        backgroundOpacity={0.06}
        redOffset={0}
        greenOffset={10}
        blueOffset={20}
        refraction
        renderer="auto"
      >
        <span>{label}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d={direction === 'down' ? 'M12 4v16m-6-6 6 6 6-6' : 'M5 19 19 5M5 5h14v14'}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </GlassSurface>
    </a>
  );
}
