import { useRef } from 'react';
import GlassSurface from './react-bits/GlassSurface';

export default function GlassProfile() {
  const image = useRef<HTMLImageElement>(null);
  return (
    <div className="glass-profile">
      <img
        ref={image}
        src="/images/optical-field.svg"
        width="520"
        height="520"
        alt=""
        className="profile-backdrop"
      />
      <div className="profile-lens">
        <GlassSurface
          idPrefix="profile-lens"
          width="100%"
          height="100%"
          borderRadius={48}
          backdrop={image}
          renderer="webgl"
          refraction
          distortionScale={-180}
          displace={0.5}
          borderWidth={0.09}
          blur={11}
          backgroundOpacity={0.02}
          brightness={50}
          opacity={0.93}
          redOffset={0}
          greenOffset={10}
          blueOffset={20}
        >
          <span className="profile-edition">PERSONAL INDEX / 001</span>
          <span className="profile-initials" aria-hidden="true">
            yr<span>.</span>
          </span>
          <div className="profile-caption">
            <strong>Yatin Rajesh</strong>
            <span>BENGALURU · BUILDING & EXPLORING</span>
          </div>
        </GlassSurface>
      </div>
      <span className="profile-coordinate" aria-hidden="true">
        12.97° N &nbsp; 77.59° E
      </span>
    </div>
  );
}
