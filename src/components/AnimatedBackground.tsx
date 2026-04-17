export default function AnimatedBackground() {
  return (
    <div className="global-svg-bg">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(127, 90, 240, 0.15)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <circle cx="20%" cy="30%" r="150" fill="var(--accent)" className="svg-anim-shape1" />
        <circle cx="80%" cy="80%" r="200" fill="var(--accent-secondary)" className="svg-anim-shape2" />
      </svg>
    </div>
  );
}
