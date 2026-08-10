import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import profileImg from './assets/profile.jpeg';
import './App.css';

export default function App() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [tickerText, setTickerText] = useState('Thesis Pipeline Active');
  
  const canvasRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const alerts = [
      'Research: Glioma Segmentation Active',
      'ASHO Care Coordinator (Remote, NY)',
      'AWS Cloud Certified',
      'DIU NLP & ML Lab Track Running',
      'CGPA 3.79 Milestone Verified'
    ];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % alerts.length;
      setTickerText(alerts[idx]);
    }, 3200);
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
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      r: Math.random() * 1.5 + 0.4,
      life: Math.random() * 200,
      maxL: Math.random() * 400 + 200,
      glow: Math.random() > 0.82,
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
      
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.015)';
      ctx.lineWidth = 0.5;
      for (let x = 0; x <= W; x += 80) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y <= H; y += 80) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      pts.forEach(p => {
        p.life++;
        p.alpha = Math.sin((p.life / p.maxL) * Math.PI);
        p.x += p.vx; p.y += p.vy;

        const dx = p.x - mx, dy = p.y - my, d = Math.hypot(dx, dy);
        if (d < 140) {
          const f = (140 - d) / 140 * 0.5;
          p.x += (dx / d) * f; p.y += (dy / d) * f;
        }

        if (p.life >= p.maxL || p.x < 0 || p.x > W || p.y < 0 || p.y > H) {
          p.x = Math.random() * W; p.y = Math.random() * H; p.life = 0;
        }

        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        if (p.glow) {
          ctx.fillStyle = `rgba(168, 85, 247, ${p.alpha * 0.9})`;
          ctx.shadowColor = '#a855f7'; ctx.shadowBlur = 10;
        } else {
          ctx.fillStyle = `rgba(242, 237, 228, ${p.alpha * 0.25})`;
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

  const handleContact = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs.sendForm(
      'service_3ak00uu',
      'template_ylnghp5',
      formRef.current,
      'NhR5JTSR2tdl5GOFb'
    )
    .then(() => {
      setIsSending(false);
      setFormSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => {
        setFormSubmitted(false);
      }, 4000);
    }, (error) => {
      console.error('EmailJS Error:', error);
      setIsSending(false);
      alert('Failed to send message. Please try again.');
    });
  };

  return (
    <div className="bento-portfolio-root">
      <canvas id="bgCanvas" ref={canvasRef}></canvas>

      <nav className="fixed-nav">
        <div className="nav-brand">NISHAT<span>.</span></div>
        <div className="nav-menu">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#awards">Awards</a>
          <a href="#contact">Contact</a>
        </div>
        <a href="/my-resume.pdf" download className="resume-btn">My Resume ↗</a>
      </nav>

      <section className="sec-wrapper" id="home">
        <div className="bento-master-grid">
          
          <div className="bento-card col-span-2 row-span-2 main-profile-card">
            <div className="profile-badge-strip">
              <span>WEB DEVELOPER</span>
              <span className="bullet-sep">•</span>
              <span>RESEARCH ENTHUSIAST</span>
              <span className="bullet-sep">•</span>
              <span>TECHNICAL PM</span>
            </div>
            
            <div className="profile-main-content-layout">
              <div className="bento-profile-img-frame">
               <img src={profileImg} alt="Noushin Jahan Nishat" />
                <div className="img-glow-overlay"></div>
              </div>

              <div className="profile-hero-title">
                <h1>Noushin</h1>
                <h1>Jahan</h1>
                <h1 className="glow-text-purple">Nishat</h1>
              </div>
            </div>

            <p className="profile-desc-p">
              A passionate and dedicated Computer Science & Engineering Graduate from Daffodil International University with strong skills in software development, technical problem-solving, and research. Currently working remotely as a Medicaid Care Coordinator at Autism Society Habilitation Organization (ASHO), supporting a professional team based in Jamaica, New York, USA.
            </p>
            <div className="card-corner-icon">+</div>
          </div>

          <div className="bento-card live-ticker-card">
            <div className="ticker-status-light">
              <span className="pulse-dot-purple"></span>
              <span className="ticker-label">LATEST ACTIVITY:</span>
            </div>
            <div className="ticker-text-view">{tickerText}</div>
          </div>

          <a href="#about" className="bento-card interaction-link-card">
            <div className="link-card-sub">IDENTITY METRICS</div>
            <h2>Self Summary</h2>
            <div className="arrow-action-icon">→</div>
          </a>

          <a href="#projects" className="bento-card interaction-link-card purple-gradient-accent">
            <div className="link-card-sub">SHOWCASE</div>
            <h2>Core Projects</h2>
            <div className="arrow-action-icon">→</div>
          </a>

          <div className="bento-card stat-pill-card">
            <div className="p-stat-box">
              <h3>3.79</h3>
              <p>DIU CGPA</p>
            </div>
            <div className="p-stat-box">
              <h3>+15</h3>
              <p>TECH TOOLS</p>
            </div>
            <div className="p-stat-box">
              <h3>5+</h3>
              <p>BUILT PROJECTS</p>
            </div>
          </div>

          <a href="#contact" className="bento-card work-together-cta-card col-span-2">
            <div className="cta-flex-wrap">
              <h2>Let's work <span>together.</span></h2>
              <div className="cta-plus-icon">+</div>
            </div>
          </a>

        </div>
      </section>

      <section className="sec-wrapper" id="about">
        <div className="section-header-wrap">
          <div className="decoration-star">✦</div>
          <h2 className="section-title-text">SELF-SUMMARY</h2>
          <div className="decoration-star">✦</div>
        </div>
        
        <div className="about-bento-layout">
          <div className="bento-card about-narrative-card">
            <div className="profile-tag-row">
              <span className="p-tag">DIU CSE GRADUATE</span>
              <span className="p-tag">DEEP LEARNING</span>
              <span className="p-tag">AWS GRADUATE</span>
            </div>
            <h3>Professional Profile</h3>
            <p>
              I am a fast learner with strong leadership and communication skills, eager to contribute to team success and grow in a professional environment. Experienced in documentation, screening, data management, task coordination, workflow organization, and professional communication.
            </p>
            
            <div className="academic-timeline-wrap">
              <h4>Academic Records</h4>
              <div className="timeline-item">
                <h5>B.Sc. in Computer Science & Engineering (2022 - 2026)</h5>
                <p>Daffodil International University (DIU) | <strong>CGPA: 3.79 / 4.00</strong></p>
              </div>
              <div className="timeline-item">
                <h5>Higher Secondary Certificate - HSC (2020)</h5>
                <p>Dhaka City College | <strong>GPA: 5.00 / 5.00</strong></p>
              </div>
              <div className="timeline-item">
                <h5>Secondary School Certificate - SSC (2018)</h5>
                <p>Shamlapur High School | <strong>GPA: 5.00 / 5.00</strong></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec-wrapper" id="experience">
        <div className="section-header-wrap">
          <span className="section-sub-tag">// CAREER PATH</span>
          <h2 className="section-title-text">Work Experience</h2>
        </div>

        <div className="about-bento-layout">
          <div className="bento-card about-narrative-card">
            <h3>Medicaid Care Coordinator (Remote)</h3>
            <p className="award-year" style={{ color: '#a855f7', fontWeight: 'bold' }}>
              Autism Society Habilitation Organization (ASHO) | 2026 – Present
            </p>
            <p style={{ marginTop: '10px' }}>
              Supporting a professional team based in Jamaica, New York, USA.
            </p>
            <ul style={{ marginTop: '10px', paddingLeft: '20px', lineHeight: '1.6' }}>
              <li>Manage and maintain accurate documentation and records while ensuring information is properly organized for workflow management.</li>
              <li>Conduct screening and review of relevant information to support appropriate service coordination.</li>
              <li>Handle and organize digital data, maintaining confidentiality, consistency, and accuracy across records.</li>
              <li>Coordinate tasks, follow up on assigned activities, and communicate professionally across remote channels.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="sec-wrapper" id="skills">
        <div className="section-header-wrap">
          <span className="section-sub-tag">// CAPABILITIES</span>
          <h2 className="section-title-text">Skills & Stack</h2>
        </div>

        <div className="skills-bento-grid">
          
          <div className="bento-card skill-block">
            <div className="skill-header"><span>01</span> Programming Languages</div>
            <div className="skill-pills-wrap">
              <span className="skill-pill">Python</span>
              <span className="skill-pill">C</span>
              <span className="skill-pill">C++</span>
              <span className="skill-pill">Java</span>
              <span className="skill-pill">JavaScript</span>
              <span className="skill-pill">PHP</span>
              <span className="skill-pill">SQL</span>
              <span className="skill-pill">HTML</span>
              <span className="skill-pill">CSS</span>
            </div>
          </div>

          <div className="bento-card skill-block">
            <div className="skill-header"><span>02</span> Frameworks & Libraries</div>
            <div className="skill-pills-wrap">
              <span className="skill-pill">React</span>
              <span className="skill-pill">Next.js</span>
              <span className="skill-pill">Node.js</span>
              <span className="skill-pill">Express.js</span>
              <span className="skill-pill">Tailwind CSS</span>
              <span className="skill-pill">NumPy</span>
            </div>
          </div>

          <div className="bento-card skill-block">
            <div className="skill-header"><span>03</span> Databases, Tools & UI</div>
            <div className="skill-pills-wrap">
              <span className="skill-pill">MongoDB</span>
              <span className="skill-pill">Firebase</span>
              <span className="skill-pill">Git & GitHub</span>
              <span className="skill-pill">Linux</span>
              <span className="skill-pill">Vercel</span>
              <span className="skill-pill">Figma</span>
              <span className="skill-pill">Adobe Photoshop</span>
              <span className="skill-pill">Adobe Illustrator</span>
            </div>
          </div>

          <div className="bento-card skill-block target-purple-card">
            <div className="g-stat-display">3.79</div>
            <p>VERIFIED DIU SYSTEM TRANSCRIPT CGPA RUNNING</p>
          </div>

        </div>
      </section>

      <section className="sec-wrapper" id="projects">
        <div className="section-header-wrap">
          <div className="decoration-star">✦</div>
          <h2 className="section-title-text">MY PROJECTS</h2>
          <div className="decoration-star">✦</div>
        </div>

        <div className="projects-showcase-grid">
          
          <div className="project-display-card bento-card highlight-research-border">
            <div className="project-meta-top">// CORE THESIS RESEARCH</div>
            <h3>Uncertainty-Calibrated Glioma Segmentation</h3>
            <p>Developed a deep learning-based glioma segmentation system capable of processing missing MRI (3D image) modalities while providing uncertainty-aware predictive estimates.</p>
            <div className="project-tags-row">
              <span>DEEP LEARNING</span><span>MEDICAL CV</span><span>PYTHON</span>
            </div>
          </div>

          <div className="project-display-card bento-card">
            <div className="project-meta-top">// MOBILE APPLICATION</div>
            <h3>AI-TravelMate</h3>
            <p>An AI-powered travel assistant platform for efficient trip planning, automatic bookings, and predictive recommendation metrics through an interactive user layout.</p>
            <div className="project-tags-row">
              <span>AI PLATFORM</span><span>MOBILE APP</span><span>UI/UX</span>
            </div>
          </div>

          <div className="project-display-card bento-card">
            <div className="project-meta-top">// WEB APPLICATION</div>
            <h3>Pet Adoption System</h3>
            <p>A web framework enabling users full secure database management integration and standard complete CRUD operations for pet profiles.</p>
            <div className="project-tags-row">
              <span>REACT</span><span>DATABASE</span><span>CRUD LAYER</span>
            </div>
          </div>

          <div className="project-display-card bento-card">
            <div className="project-meta-top">// COMPUTER NETWORKS</div>
            <h3>Retail Store Network with NAT</h3>
            <p>Designed structured commercial architecture mappings utilizing NAT constraints to guarantee isolation configurations and secure server lanes.</p>
            <div className="project-tags-row">
              <span>NETWORKING</span><span>NAT</span><span>TRAFFIC SECURITY</span>
            </div>
          </div>

          <div className="project-display-card bento-card">
            <div className="project-meta-top">// OPERATING SYSTEMS</div>
            <h3>DHCP & Proxy Server Setup</h3>
            <p>Configured automated network deployment scripts resolving automated IP mapping configurations and resource proxy filters.</p>
            <div className="project-tags-row">
              <span>LINUX SYSTEM</span><span>DHCP SERVER</span><span>PROXY LAYER</span>
            </div>
          </div>

        </div>
      </section>

      <section className="sec-wrapper" id="awards">
        <div className="section-header-wrap">
          <div className="decoration-star">✦</div>
          <h2 className="section-title-text">AWARDS & BADGES</h2>
          <div className="decoration-star">✦</div>
        </div>

        <div className="awards-bento-grid">
          <div className="bento-card award-item-card">
            <div className="award-year">2026</div>
            <h4>AWS Academy Graduate Cloud Foundations</h4>
            <p>Certificate of Completion for AWS Academy Cloud Foundations Training Badge framework metrics.</p>
          </div>

          <div className="bento-card award-item-card purple-glow-border">
            <div className="award-year">2025</div>
            <h4>Best Voice Speaker — Inter Hall Debate</h4>
            <p>Awarded Best Voice Speaker in the Inter Hall Debate Competition at DIU, organized by Creative International.</p>
          </div>

          <div className="bento-card award-item-card">
            <div className="award-year">2025</div>
            <h4>NDAC National Data Analytics Competition</h4>
            <p>Participated in the Data Visionary analytics challenge organized by the Department of CSE, DIU.</p>
          </div>

          <div className="bento-card award-item-card">
            <div className="award-year">2025</div>
            <h4>Medical Data Analysis Bootcamp</h4>
            <p>Completed the intensive "Computer Vision and Deep Learning for Medical Data Analysis" program conducted by Health Informatics Research Lab.</p>
          </div>
        </div>
      </section>

      <section className="sec-wrapper" id="contact">
        <div className="bento-contact-layout">
          <div className="contact-text-pnl">
            <span className="sec-tag">COMMUNICATION</span>
            <h2>Let's initiate a <span>connection.</span></h2>
            <p>Drop a message if you want to collaborate.</p>
            <div className="contact-direct-link">
              <strong>Direct Mail:</strong> <a href="mailto:nowrojnishat@gmail.com">nowrojnishat@gmail.com</a>
            </div>
            <div className="contact-direct-link" style={{ marginTop: '5px' }}>
              <strong>Phone:</strong> +8801715821532
            </div>
          </div>

          <form ref={formRef} className="bento-form-pnl bento-card" onSubmit={handleContact}>
            <div className="input-group-row">
              <label>Your Identity</label>
              <input 
                type="text" 
                name="user_name" 
                placeholder="Your Name..." 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                required 
              />
            </div>
            <div className="input-group-row">
              <label>Email Address</label>
              <input 
                type="email" 
                name="user_email" 
                placeholder="youremail@gmail.com" 
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                required 
              />
            </div>
            <div className="input-group-row">
              <label>Message Architecture</label>
              <textarea 
                name="message" 
                placeholder="Write your text here..." 
                value={formData.message} 
                onChange={(e) => setFormData({...formData, message: e.target.value})} 
                required
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="bento-submit-btn" 
              disabled={isSending}
              style={{ background: formSubmitted ? '#22c55e' : '' }}
            >
              {isSending ? 'Sending Message...' : formSubmitted ? 'Message Dispatched! ✓' : 'Send Message →'}
            </button>
          </form>
        </div>
      </section>

      <footer>
        <p>© 2026 Noushin Jahan Nishat. All rights reserved. Built with Bento Grid React Engine.</p>
      </footer>
    </div>
  );
}