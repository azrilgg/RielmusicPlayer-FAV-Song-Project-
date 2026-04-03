import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Preloader.css';

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const titleRef = useRef(null);
  const subTitleRef = useRef(null);
  const subRef = useRef(null);
  const barRef = useRef(null);
  const iconRef = useRef(null);
  const ringRef1 = useRef(null);
  const ringRef2 = useRef(null);
  const ringRef3 = useRef(null);
  const percentRef = useRef(null);

  useEffect(() => {
    // Show container immediately smoothly to prevent any unstyled FOC (spoilers)
    gsap.set(containerRef.current, { opacity: 1 });
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Particle system — music notes, stars, geometric shapes
    const particles = [];
    const symbols = ['♪', '♫', '♬', '✦', '◇', '○', '△', '⬥', '●', '✧'];
    const colors = [
      'rgba(255, 215, 0, ',    // gold
      'rgba(0, 243, 255, ',    // cyan
      'rgba(188, 19, 254, ',   // pink
      'rgba(138, 43, 190, ',   // purple
      'rgba(255, 255, 255, ',  // white
    ];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 16 + 6,
        speedY: Math.random() * 0.6 + 0.15,
        speedX: (Math.random() - 0.5) * 0.3,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.4 + 0.05,
        alphaDir: Math.random() > 0.5 ? 0.003 : -0.003,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 1.5,
      });
    }

    // Lines connecting nearby particles
    let animId;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 215, 0, ${0.04 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach(p => {
        p.alpha += p.alphaDir;
        if (p.alpha > 0.45 || p.alpha < 0.03) p.alphaDir *= -1;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.font = `${p.size}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowColor = `${p.color}0.4)`;
        ctx.shadowBlur = 12;
        ctx.fillText(p.symbol, 0, 0);
        ctx.restore();

        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;
        if (p.y > canvas.height + 30) { p.y = -30; p.x = Math.random() * canvas.width; }
        if (p.x > canvas.width + 30) p.x = -30;
        if (p.x < -30) p.x = canvas.width + 30;
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    // GSAP Master Timeline
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          scale: 1.15,
          filter: 'blur(30px)',
          duration: 0.9,
          ease: 'power4.inOut',
          onComplete: () => {
            cancelAnimationFrame(animId);
            onComplete();
          }
        });
      }
    });

    // Rings expand
    tl.fromTo([ringRef1.current, ringRef2.current, ringRef3.current],
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'back.out(1.5)' }
    );

    // Icon entrance with bounce
    tl.fromTo(iconRef.current,
      { scale: 0, rotation: -180, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 0.8, ease: 'back.out(2)' },
      '-=0.5'
    );

    // Icon heartbeat pulse
    tl.to(iconRef.current, {
      scale: 1.2, duration: 0.25, repeat: 3, yoyo: true, ease: 'power2.inOut'
    }, '-=0.1');

    // Title: "AZRIEL" letter stagger
    tl.fromTo('.pl-letter',
      { opacity: 0, y: 80, rotationX: -90, scale: 0.5 },
      { opacity: 1, y: 0, rotationX: 0, scale: 1, stagger: 0.035, duration: 0.5, ease: 'back.out(1.7)' },
      '-=0.4'
    );

    // Subtitle: "MUSIC PLAYER"
    tl.fromTo('.pl-letter-sub',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.025, duration: 0.4, ease: 'power3.out' },
      '-=0.3'
    );

    // Tagline
    tl.fromTo(subRef.current,
      { opacity: 0, letterSpacing: '20px', y: 15 },
      { opacity: 1, letterSpacing: '6px', y: 0, duration: 0.7, ease: 'power3.out' },
      '-=0.2'
    );

    // Loading bar + percentage counter
    const counter = { val: 0 };
    tl.fromTo(barRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.8, ease: 'power2.inOut' },
      '-=0.3'
    );
    tl.to(counter, {
      val: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (percentRef.current) percentRef.current.textContent = Math.round(counter.val) + '%';
      }
    }, '<');

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div className="pl" ref={containerRef} style={{ opacity: 0 }}>
      <canvas ref={canvasRef} className="pl-canvas" />
      <div className="pl-bg-gradient" />

      <div className="pl-content">
        {/* Animated rings */}
        <div className="pl-icon-area">
          <div className="pl-ring pl-ring--1" ref={ringRef1} />
          <div className="pl-ring pl-ring--2" ref={ringRef2} />
          <div className="pl-ring pl-ring--3" ref={ringRef3} />
          <div className="pl-icon" ref={iconRef}>
            <span className="pl-icon-note">♪</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="pl-title" ref={titleRef}>
          {"AZRIEL".split('').map((char, i) => (
            <span key={i} className="pl-letter" style={{ display: 'inline-block' }}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>
        <h2 className="pl-subtitle" ref={subTitleRef}>
          {"MUSIC PLAYER".split('').map((char, i) => (
            <span key={i} className="pl-letter-sub" style={{ display: 'inline-block' }}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h2>
        <p className="pl-tagline" ref={subRef}>Experience The Dimension of Sound</p>

        {/* Loading bar */}
        <div className="pl-bar-area">
          <div className="pl-bar-track">
            <div className="pl-bar-fill" ref={barRef} />
          </div>
          <span className="pl-percent" ref={percentRef}>0%</span>
        </div>
      </div>
    </div>
  );
}
