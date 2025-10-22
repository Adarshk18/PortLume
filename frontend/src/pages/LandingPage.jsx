import React from "react";

const LandingPage = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #bfdbfe, #fef3c7, #fed7aa)',
      overflow: 'hidden'
    }}>
      {/* ---------- Header ---------- */}
      <header style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.5rem 2rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Robot Icon */}
          <div style={{
            width: '40px',
            height: '40px',
            background: 'white',
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="7" y="9" width="10" height="8" rx="1" fill="#3B82F6"/>
              <circle cx="10" cy="12" r="1" fill="white"/>
              <circle cx="14" cy="12" r="1" fill="white"/>
              <path d="M9 15h6" stroke="white" strokeWidth="1" strokeLinecap="round"/>
              <rect x="6" y="7" width="2" height="2" rx="0.5" fill="#3B82F6"/>
              <rect x="16" y="7" width="2" height="2" rx="0.5" fill="#3B82F6"/>
              <rect x="11" y="5" width="2" height="2" rx="0.5" fill="#3B82F6"/>
            </svg>
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827' }}>PortLume AI</span>
        </div>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem', color: '#374151', fontWeight: 500, fontSize: '0.875rem' }}>
          <a href="/dashboard" style={{ color: '#374151', textDecoration: 'none' }}>Dashboard</a>
          <a href="#" style={{ color: '#374151', textDecoration: 'none' }}>Features</a>
          <a href="#" style={{ color: '#374151', textDecoration: 'none' }}>About Us</a>
          <a href="#" style={{ color: '#374151', textDecoration: 'none' }}>Contact</a>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="/login" style={{ color: '#374151', fontWeight: 500, fontSize: '0.875rem', textDecoration: 'none' }}>
            Login
          </a>
          <button style={{
            background: '#0EA5E9',
            color: 'white',
            padding: '0.625rem 1.5rem',
            borderRadius: '0.5rem',
            fontWeight: 600,
            fontSize: '0.875rem',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            Get Started Free
          </button>
        </div>
      </header>

      {/* ---------- Hero ---------- */}
      <section style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '3rem 6rem',
        gap: '4rem',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Text */}
        <div style={{ maxWidth: '600px' }}>
          <h1 style={{
            fontSize: '5rem',
            fontWeight: 900,
            color: '#111827',
            lineHeight: '1',
            letterSpacing: '-0.025em',
            marginBottom: '1.5rem'
          }}>
            Revolutionize<br />
            Your Portfolio.<br />
            Effortlessly.
          </h1>

          <p style={{
            fontSize: '1.125rem',
            color: '#374151',
            lineHeight: '1.75',
            marginBottom: '2.5rem'
          }}>
            Harness the power of AI to create, manage, and optimize your<br />
            professional portfolio in minutes, not hours.
          </p>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button style={{
              background: '#38BDF8',
              color: 'white',
              padding: '0.875rem 2rem',
              borderRadius: '0.5rem',
              fontWeight: 600,
              fontSize: '1rem',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 10px 15px rgba(0,0,0,0.1)'
            }}>
              Start Building Your Portfolio
            </button>
            <button style={{
              background: 'white',
              color: '#374151',
              padding: '0.875rem 2rem',
              borderRadius: '0.5rem',
              fontWeight: 600,
              fontSize: '1rem',
              border: '1px solid #E5E7EB',
              cursor: 'pointer',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
            }}>
              See How It Works
            </button>
          </div>
        </div>

        {/* Laptop Mockup */}
        <div style={{ position: 'relative', transform: 'rotate(2deg)', transition: 'transform 0.5s' }}>
          {/* Screen */}
          <div style={{
            width: '500px',
            height: '320px',
            background: 'linear-gradient(to bottom right, #475569, #334155)',
            borderRadius: '1rem',
            boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
            overflow: 'hidden',
            border: '8px solid #1e293b',
            position: 'relative'
          }}>
            {/* Screen content */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom right, rgba(96, 165, 250, 0.2), rgba(71, 85, 105, 0.4), rgba(71, 85, 105, 0.6))'
            }}>
              {/* Browser frame */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                right: '1rem',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '0.5rem',
                padding: '1rem',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444' }}></div>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FBBF24' }}></div>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }}></div>
                </div>
                
                <p style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  textAlign: 'center',
                  marginBottom: '1.5rem'
                }}>
                  AI Portfolio Interface
                </p>

                {/* Node network */}
                <div style={{ position: 'relative', height: '128px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {/* Center node */}
                  <div style={{
                    position: 'absolute',
                    width: '12px',
                    height: '12px',
                    background: 'white',
                    borderRadius: '50%',
                    boxShadow: '0 0 20px rgba(255,255,255,0.5)',
                    animation: 'pulse 2s infinite',
                    zIndex: 10
                  }}></div>

                  {/* Surrounding nodes */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                    const radius = 50;
                    const x = Math.cos((angle * Math.PI) / 180) * radius;
                    const y = Math.sin((angle * Math.PI) / 180) * radius;
                    return (
                      <div
                        key={i}
                        style={{
                          position: 'absolute',
                          width: '8px',
                          height: '8px',
                          background: 'rgba(191, 219, 254, 0.6)',
                          borderRadius: '50%',
                          left: `calc(50% + ${x}px)`,
                          top: `calc(50% + ${y}px)`,
                          transform: 'translate(-50%, -50%)',
                          animation: `pulse 2s infinite ${i * 0.2}s`
                        }}
                      ></div>
                    );
                  })}

                  {/* Connection lines */}
                  <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                      const radius = 50;
                      const x = Math.cos((angle * Math.PI) / 180) * radius;
                      const y = Math.sin((angle * Math.PI) / 180) * radius;
                      return (
                        <line
                          key={i}
                          x1="50%"
                          y1="50%"
                          x2={`calc(50% + ${x}px)`}
                          y2={`calc(50% + ${y}px)`}
                          stroke="rgba(255,255,255,0.2)"
                          strokeWidth="1"
                        />
                      );
                    })}
                  </svg>

                  {/* Additional scattered nodes */}
                  <div style={{ position: 'absolute', top: '8px', left: '32px', width: '6px', height: '6px', background: 'rgba(147, 197, 253, 0.4)', borderRadius: '50%' }}></div>
                  <div style={{ position: 'absolute', top: '24px', right: '48px', width: '6px', height: '6px', background: 'rgba(147, 197, 253, 0.4)', borderRadius: '50%' }}></div>
                  <div style={{ position: 'absolute', bottom: '16px', left: '64px', width: '6px', height: '6px', background: 'rgba(147, 197, 253, 0.4)', borderRadius: '50%' }}></div>
                  <div style={{ position: 'absolute', bottom: '32px', right: '32px', width: '6px', height: '6px', background: 'rgba(147, 197, 253, 0.4)', borderRadius: '50%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Laptop bottom */}
          <div style={{
            width: '560px',
            height: '12px',
            background: '#1e293b',
            borderRadius: '0 0 0.75rem 0.75rem',
            margin: '0 auto',
            boxShadow: '0 20px 25px rgba(0,0,0,0.2)'
          }}></div>

          {/* Floating glow effects */}
          <div style={{
            position: 'absolute',
            bottom: '-48px',
            right: '-48px',
            width: '160px',
            height: '160px',
            background: 'rgba(252, 211, 77, 0.2)',
            borderRadius: '50%',
            filter: 'blur(60px)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '-32px',
            left: '-32px',
            width: '128px',
            height: '128px',
            background: 'rgba(147, 197, 253, 0.2)',
            borderRadius: '50%',
            filter: 'blur(40px)'
          }}></div>

          {/* Sparkle icon */}
          <div style={{ position: 'absolute', bottom: '32px', right: '0', color: 'white', opacity: 0.8 }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="currentColor" opacity="0.8"/>
              <path d="M19 3L19.5 5.5L22 6L19.5 6.5L19 9L18.5 6.5L16 6L18.5 5.5L19 3Z" fill="currentColor" opacity="0.6"/>
            </svg>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;