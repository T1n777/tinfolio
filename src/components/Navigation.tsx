import { useEffect, useState } from 'react';
import GlassSurface from './react-bits/GlassSurface';
import GlassLink from './GlassLink';

import { person } from '../data/portfolio';

export default function Navigation({ home = false }: { home?: boolean }) {
  const [active, setActive] = useState('');
  useEffect(() => {
    if (!home) return;
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-20% 0px -55% 0px' },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [home]);
  const prefix = home ? '' : '/';
  return (
    <div className="nav-shell">
      <GlassSurface
        idPrefix="navigation"
        width="100%"
        height={60}
        borderRadius={100}
        backgroundOpacity={0.18}
        blur={11}
        displace={3.5}
        refraction
        distortionScale={-120}
        redOffset={0}
        greenOffset={3}
        blueOffset={6}
        className="navigation-glass"
      >
        <nav className="navigation" aria-label="Main navigation">
          <a className="monogram" href={home ? '#top' : '/'} aria-label={`${person.name}, home`}>
            {person.monogram}<span>.</span>
          </a>
          <div className="nav-links">
            {['work', 'about', 'experience'].map((id) => (
              <a
                key={id}
                href={`${prefix}#${id}`}
                aria-current={active === id ? 'location' : undefined}
              >
                {id === 'work' ? 'Work' : id === 'about' ? 'About' : 'Experience'}
              </a>
            ))}
          </div>
          <GlassLink href={`${prefix}#contact`} label="Let’s talk" className="nav-contact" />
        </nav>
      </GlassSurface>
    </div>
  );
}
