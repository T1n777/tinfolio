import { useEffect, useState } from 'react';
import TechText from './react-bits/TechText';
import { person } from '../data/portfolio';

interface Props {
  text?: string;
  variant?: 'hero' | 'word';
}

export default function NameArt({ text, variant = 'hero' }: Props) {
  const displayText = text ?? `${person.name}.`;
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    const syncPause = () => setPaused(document.documentElement.dataset.motion === 'paused');
    update();
    syncPause();
    query.addEventListener('change', update);
    window.addEventListener('portfolio-motion-change', syncPause);
    let alive = true;
    document.fonts.ready.then(() => {
      if (alive) setReady(true);
    });
    return () => {
      alive = false;
      query.removeEventListener('change', update);
      window.removeEventListener('portfolio-motion-change', syncPause);
    };
  }, []);
  const animated = ready && !reduced && !paused;
  return (
    <div
      className={`name-art name-art-${variant} ${animated ? 'name-art-ready' : ''}`}
      aria-hidden="true"
    >
      <span className="name-fallback">{displayText}</span>
      {animated && (
        <TechText
          text={displayText}
          fontFamily="Manrope"
          fontWeight={500}
          fontSize={variant === 'hero' ? 230 : 90}
          letterSpacing={-0.055}
          color="#f2f5fa"
          accentColor="#b9dcf6"
          align={variant === 'hero' ? 'center' : 'left'}
          reveal="letter"
          reach={180}
          softness={0.7}
          dashLength={4}
          dashGap={2}
          strokeWidth={1.5}
          specks={10}
          selection
          labels
          draggable
          clickKick
          bounce={0.4}
          sweep
          speed={0.65}
          intro={variant === 'hero' ? 'metrics' : 'none'}
          introDuration={1.6}
          guides={false}
        />
      )}
    </div>
  );
}
