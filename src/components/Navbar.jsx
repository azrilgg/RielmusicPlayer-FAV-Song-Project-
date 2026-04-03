import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, ExternalLink, Menu, X } from 'lucide-react';
import './Navbar.css';

const links = [
  { label: 'Portfolio', url: 'https://ahmadazriel.vercel.app/' },
  { label: 'Playlist Spotify', url: 'https://azrilgg.github.io/Azriel-fav-music/' },
  { label: 'Azriel Space', url: 'https://azrielspace.vercel.app' },
];

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

const menuVariants = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: { type: 'tween', duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  exit: { x: '100%', transition: { type: 'tween', duration: 0.3, ease: [0.4, 0, 1, 1] } }
};

const linkVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: (i) => ({
    opacity: 1, x: 0,
    transition: { delay: 0.15 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }
  }),
  exit: { opacity: 0, x: 20, transition: { duration: 0.2 } }
};

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Brand */}
        <a className="navbar-brand" href="#">
          <Music size={18} className="navbar-brand-icon" />
          <span className="navbar-brand-text">RIEL</span>
          <span className="navbar-brand-gold">MPLAYER</span>
        </a>

        {/* Desktop links */}
        <ul className="navbar-desktop">
          {links.map(l => (
            <li key={l.label}>
              <a href={l.url} target="_blank" rel="noopener noreferrer">
                {l.label}
                <ExternalLink size={11} />
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger button */}
        <button
          className={`navbar-hamburger ${open ? 'navbar-hamburger--open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          type="button"
        >
          <span className="navbar-hamburger-line" />
          <span className="navbar-hamburger-line" />
          <span className="navbar-hamburger-line" />
        </button>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <>
              {/* Backdrop */}
              <motion.div
                className="navbar-backdrop"
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
                onClick={closeMenu}
              />

              {/* Menu panel */}
              <motion.div
                className="navbar-mobile"
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Close button inside menu */}
                <button className="navbar-mobile-close" onClick={closeMenu} type="button" aria-label="Close menu">
                  <X size={24} />
                </button>

                <div className="navbar-mobile-content">
                  <p className="navbar-mobile-label">NAVIGATION</p>
                  <ul className="navbar-mobile-links">
                    {links.map((l, i) => (
                      <motion.li
                        key={l.label}
                        custom={i}
                        variants={linkVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <a href={l.url} target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
                          <span>{l.label}</span>
                          <ExternalLink size={14} className="navbar-mobile-link-icon" />
                        </a>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="navbar-mobile-footer">
                    <Music size={14} />
                    <span>RIEL<strong>MPLAYER</strong></span>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
