import React, { useState, useEffect, useRef } from 'react';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('frontend');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [currentRole, setCurrentRole] = useState('Computer Science Student');
  
  const roles = ['Machine Learning Learner', 'NLP Enthusiast', 'Front-end Developer', 'Debater & Speaker'];
  const canvasRef = useRef(null);

  useEffect(() => {
    let roleIndex = 0;
    const interval = setInterval(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      setCurrentRole(roles[roleIndex]);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    let mx = 0, my = 0;

    const pts = Array.from({ length: 140 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.4 + 0.3,
      life: Math.random() * 150,
      maxL: Math.random() * 300 + 150,
      fire: Math.random() > 0.82,
      alpha: 0
    }));

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });

    let animId;
    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      
      ctx.strokeStyle = 'rgba(255,77,26,0.015)';
      ctx.lineWidth = 0.5;
      for (let x = 0; x <= W; x += 90) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y <= H; y += 90) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      pts.forEach(p => {
        p.life++;
        p.alpha = Math.sin((p.life / p.maxL) * Math.PI);
        p.x += p.vx; p.y += p.vy;

        const dx = p.x - mx, dy = p.y - my, d = Math.hypot(dx, dy);
        if (d < 140) {
          const f = (140 - d) / 140 * 0.6;
          p.x += (dx / d) * f; p.y += (dy / d) * f;
        }

        if (p.life >= p.maxL || p.x < -10 || p.x > W + 10 || p.y < -10 || p.y > H + 10) {
          p.x = Math.random() * W; p.y = Math.random() * H; p.life = 0;
        }

        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        if (p.fire) {
          ctx.fillStyle = `rgba(255,77,26,${p.alpha * 0.85})`;
          ctx.shadowColor = '#ff4d1a'; ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = `rgba(242,237,228,${p.alpha * 0.3})`;
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      });
      animId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setFormSubmitted(false);
    }, 2500);
  };

  return (
    <div className="portfolio-wrapper">
      <canvas id="bgCanvas" ref={canvasRef}></canvas>

      <nav id="mainNav" className="scrolled">
        <div className="logo">
          <div className="logo-badge"><span>NJ</span></div>
          Nishat
        </div>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#education">Education</a>
          <a href="#contact">Contact</a>
        </div>
        <a href="/my-resume.pdf" download className="nav-cta">Download CV</a>
      </nav>

      <section className="hero" id="home">
        <div className="hero-top">
          <div className="hero-eyebrow">
            <div className="eyebrow-badge"><div className="e-dot"></div>Available for Research</div>
            <div className="eyebrow-line"></div>
            <span style={{ fontSize: '11px', color: 'var(--dim)', letterSpacing: '.14em' }}>Portfolio 2026</span>
          </div>

          <div className="hero-name">
            <span className="hero-num" aria-hidden="true">CSE</span>
            <span className="hn-row hn1"><span className="w">Noushin</span></span>
            <span className="hn-row hn2"><span className="w">Jahan</span></span>
            <span className="hn-row hn3"><span className="w">Nishat</span></span>
          </div>

          <div className="hero-sub">
            <div className="role-pill">{currentRole}</div>
            <div className="sub-sep"></div>
            <span className="sub-note">ML Researcher · NLP Enthusiast · Speaker</span>
          </div>

          <div className="hero-bot" style={{ marginTop: '64px' }}>
            <p className="hero-bio">
              Computer Science & Engineering Student at <strong>Daffodil International University</strong>. Focusing on predictive machine learning classifiers, Bangla parsing architectures, and web interfaces.
            </p>
            <div className="hero-actions">
              <a href="#projects" className="btn-fire">View Projects →</a>
              <a href="#contact" className="btn-ghost">Connect</a>
            </div>
          </div>
        </div>

        <div className="hero-stats">
          <div className="hs"><div className="hs-n">3.76</div><div className="hs-l">CGPA Record</div></div>
          <div className="hs"><div className="hs-n">10+</div><div className="hs-l">Tech Stack</div></div>
          <div className="hs"><div className="hs-n">3+</div><div className="hs-l">Core Projects</div></div>
        </div>
      </section>

      <section className="sec" id="about">
        <div className="wrap">
          <div className="about-grid">
            <div className="about-content">
              <span className="sec-tag">01 — Core Identity</span>
              <h2 className="sec-h">Who I Am</h2>
              <p className="about-p">
                I am <span className="hl">Noushin Jahan Nishat</span> — an engineer dedicated to machine intelligence architectures, processing mixed categorical-numerical datasets, and working with deep learning structures.
              </p>
              <p className="about-p">
                When I am not setting up complex coding environments inside stable <span className="hl">Anaconda</span> targets, I engage in structural argument styles, achieving <strong>Best Voice Speaker</strong> at the Inter-Hall Debate Tournament.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" id="skills">
        <div className="wrap">
          <div className="skills-layout">
            <div>
              <span className="sec-tag">02 — Stack</span>
              <h2 className="sec-h">What I Work With</h2>
              <div className="sk-tabs" style={{ marginTop: '40px' }}>
                <button className={`sktab ${activeTab === 'frontend' ? 'on' : ''}`} onClick={() => setActiveTab('frontend')}>
                  <span>🎨 Web Dev</span>
                </button>
                <button className={`sktab ${activeTab === 'ml' ? 'on' : ''}`} onClick={() => setActiveTab('ml')}>
                  <span>🤖 Data Science & ML</span>
                </button>
                <button className={`sktab ${activeTab === 'tools' ? 'on' : ''}`} onClick={() => setActiveTab('tools')}>
                  <span>🛠 Environments</span>
                </button>
              </div>
            </div>
            <div className="sk-panels" style={{ paddingTop: '10px' }}>
              {activeTab === 'frontend' && (
                <div className="sk-panel on">
                  <div className="skpill"><span className="skdot" style={{ background: '#f97316' }}></span>HTML5</div>
                  <div className="skpill"><span className="skdot" style={{ background: '#38bdf8' }}></span>CSS3</div>
                  <div className="skpill"><span className="skdot" style={{ background: '#fbbf24' }}></span>JavaScript</div>
                  <div className="skpill"><span className="skdot" style={{ background: '#a78bfa' }}></span>Responsive Design</div>
                </div>
              )}
              {activeTab === 'ml' && (
                <div className="sk-panel on">
                  <div className="skpill"><span className="skdot" style={{ background: '#4ade80' }}></span>Python</div>
                  <div className="skpill"><span className="skdot" style={{ background: '#fb923c' }}></span>Machine Learning</div>
                  <div className="skpill"><span className="skdot" style={{ background: '#fb7185' }}></span>Natural Language Processing</div>
                  <div className="skpill"><span className="skdot" style={{ background: '#38bdf8' }}></span>Categorical Representations</div>
                </div>
              )}
              {activeTab === 'tools' && (
                <div className="sk-panel on">
                  <div className="skpill"><span className="skdot" style={{ background: '#a78bfa' }}></span>Git & GitHub</div>
                  <div className="skpill"><span className="skdot" style={{ background: '#4ade80' }}></span>Anaconda Desktop</div>
                  <div className="skpill"><span className="skdot" style={{ background: '#38bdf8' }}></span>VS Code IDE</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="sec" id="projects">
        <div className="wrap">
          <span className="sec-tag">03 — Portfolio Work</span>
          <h2 className="sec-h">Engineering Projects</h2>
          <div className="proj-list">
            <div className="proj-item">
              <div className="proj-n">01</div>
              <div className="proj-body">
                <h3>Job Placement Readiness Prediction Pipeline</h3>
                <p>An intelligence model analyzing parameters to pre-evaluate student job placement readiness across private university systems in Bangladesh.</p>
                <div className="proj-tags"><span className="ptag">Python</span><span className="ptag">ML</span><span className="ptag">Classification</span></div>
              </div>
            </div>
            <div className="proj-item">
              <div className="proj-n">02</div>
              <div className="proj-body">
                <h3>DHCP and Proxy System Deployment</h3>
                <p>Network routing design implementing static network subnet spaces, precise gateway parameters, and granular server restrictions.</p>
                <div className="proj-tags"><span className="ptag">Infrastructure</span><span className="ptag">Proxy Server</span><span className="ptag">DHCP Configuration</span></div>
              </div>
            </div>
            <div className="proj-item">
              <div className="proj-n">03</div>
              <div className="proj-body">
                <h3>Computer Graphics Matrix Transformer</h3>
                <p>Mathematics algorithm sets supporting structural rendering routines, shearing logic, and geometric plane rotations.</p>
                <div className="proj-tags"><span className="ptag">Computer Graphics</span><span className="ptag">C++</span><span className="ptag">Algorithms</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" id="education">
        <div className="wrap">
          <span className="sec-tag">04 — Milestones</span>
          <h2 className="sec-h">Education Track</h2>
          <div style={{ marginTop: '60px' }}>
            <div className="edu-row">
              <div className="edu-date">Ongoing Track</div>
              <div className="edu-body">
                <h3>Computer Science & Engineering</h3>
                <p><strong>Daffodil International University</strong> — Current CGPA 3.76. Specialized interest branches across machine data models, deep neural language translation frameworks, and computer graphics loops.</p>
              </div>
            </div>
            <div className="edu-row">
              <div className="edu-date">Higher Secondary</div>
              <div className="edu-body">
                <h3>Dhaka City College</h3>
                <p>Science Discipline. Successfully validated track processing standard benchmarks with a absolute score profile of <strong>GPA 5.00</strong>.</p>
              </div>
            </div>
            <div className="edu-row">
              <div className="edu-date">Secondary School</div>
              <div className="edu-body">
                <h3>Shhamlapur High School</h3>
                <p>Science Baseline Program. Completed track certificates processing with an explicit profile metric evaluation of <strong>GPA 5.00</strong>.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" id="contact">
        <div className="wrap">
          <div className="contact-grid">
            <div>
              <span className="sec-tag">05 — Reach Out</span>
              <h2 className="sec-h">Let's Connect</h2>
              <p className="contact-desc">Open for research partnerships, engineering positions, or any machine learning workflow analytics discussion.</p>
            </div>
            <form className="cform" onSubmit={handleSubmit}>
              <h3>Send a Message</h3>
              <div className="ff">
                <label>Your Name</label>
                <input type="text" placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div className="ff">
                <label>Email Address</label>
                <input type="email" placeholder="john@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
              </div>
              <div className="ff">
                <label>Message Content</label>
                <textarea placeholder="Hi Nishat, let's collaborate on..." value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} required></textarea>
              </div>
              <button type="submit" className="fsend" style={{ background: formSubmitted ? '#22c55e' : '' }}>
                {formSubmitted ? 'Message Dispatched! ✓' : 'Send Message →'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer>
        <div className="fi"><p>© 2026 Noushin Jahan Nishat. All rights reserved.</p></div>
      </footer>
    </div>
  );
}