import { useEffect, useState } from 'react';
import GlassSurface from './react-bits/GlassSurface';
import GlassLink from './GlassLink';
import { person } from '../data/portfolio';

export default function Navigation({
  home = false,
  staticMode = false,
  blog = false,
}: {
  home?: boolean;
  staticMode?: boolean;
  blog?: boolean;
}) {
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
  if (staticMode)
    return (
      <div className="nav-shell static-nav">
        <nav className="navigation" aria-label="Main navigation">
          <a className="monogram" href="/" aria-label={`${person.name}, home`}>
            {person.monogram}<span>.</span>
          </a>
          <div className="nav-links">
            <a href="/#work">Work</a>
            <a href="/#about">About</a>
            <a href="/#experience">Experience</a>
            <a href="/blog/" aria-current={blog ? 'page' : undefined}>
              Blog
            </a>
          </div>
          <a href="/#contact" className="nav-contact">
            Let’s talk
          </a>
        </nav>
      </div>
    );
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
            <a href="/blog/">Blog</a>
          </div>
          <GlassLink href={`${prefix}#contact`} label="Let’s talk" className="nav-contact" />
        </nav>
      </GlassSurface>
    </div>
  );
}
