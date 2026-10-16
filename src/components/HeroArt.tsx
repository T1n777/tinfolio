import { useEffect, useState } from 'react';
import MicroSlats from './react-bits/MicroSlats';
import GlassSurface from './react-bits/GlassSurface';

export default function HeroArt() {
  const [supported, setSupported] = useState(false);
  const [paused, setPaused] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motion.matches);
    setPaused(motion.matches);
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2');
    if (gl && !connection?.saveData) {
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      setSupported(true);
      setPaused(motion.matches);
    }
    const update = () => {
      setReducedMotion(motion.matches);
      setPaused(motion.matches);
    };
    motion.addEventListener('change', update);
    return () => motion.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion = paused ? 'paused' : 'playing';
    window.dispatchEvent(new Event('portfolio-motion-change'));
  }, [paused]);
  return (
    <>
      <div className="hero-art" aria-hidden="true">
        <div className="slats-fallback" />
        {supported && (
          <MicroSlats
            key={reducedMotion ? 'still' : 'animated'}
            preset="swell"
            color="#91aabb"
            glintColor="#ecf7ff"
            backgroundColor="#080b10"
            slatWidth={10}
            slatHeight={25}
            gap={3}
            roundness={0.75}
            interactive={!paused && !reducedMotion}
            cursorStrength={1}
            cursorSize={40}
            swirl={0}
            trail={1.4}
            lean={0}
            intro={!reducedMotion}
            scale={1.5}
            speed={0.6}
            direction={250}
            chop={0.55}
            stretch={0}
            glint={0.7}
            contrast={1.25}
            perspective={0.55}
            fog={0.55}
            introDuration={1.5}
            paused={paused}
            maxDpr={1}
            maxFps={30}
          />
        )}
        <div className="hero-art-shade" />
      </div>
      {supported && !reducedMotion && (
        <button
          className="motion-control"
          type="button"
          onClick={() => setPaused(!paused)}
          aria-pressed={paused}
          aria-label={paused ? 'Play motion' : 'Pause motion'}
        >
          <GlassSurface
            idPrefix="motion-control"
            width="100%"
            height={36}
            borderRadius={20}
            distortionScale={-180}
            displace={0.5}
            backgroundOpacity={0.06}
          >
            <span aria-hidden="true">{paused ? '▷' : 'Ⅱ'}</span>{' '}
            <span>{paused ? 'Play motion' : 'Pause motion'}</span>
          </GlassSurface>
        </button>
      )}
    </>
  );
}
