<div align="center">

# 🎵 AZRIEL MUSIC PLAYER <br> **「 GOD EDITION 」**

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
<img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E"/>
<img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white"/>
<img src="https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white"/>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>

---

**Experience The Dimension of Sound.** <br>
A fully reimagined, high-performance, cinematic music player web application designed with god-tier aesthetics, glassmorphism, and flawlessly synchronized lyrics.

</div>

---

## ⚡ Overview

Welcome to the **Azriel Music Player: God Edition**. This project is a complete rewrite from vanilla web technologies to a modern **React.js (Vite)** architecture. Every aspect of the user interface was engineered to feel premium, utilizing **Framer Motion** and **GSAP** to orchestrate intricate, fluid animations across the entire application.

From the particle-system preloader to the glowing glassmorphic song cards, this music player isn't just about listening to audio—it's about an *immersive visual experience*.

---

## ✨ God-Tier Features

| Feature | Description |
| :--- | :--- |
| 🌌 **Cinematic Preloader** | A pure-CSS/GSAP orchestrated intro featuring a dynamic particle network, animated rotating rings, and letter-by-letter 3D text reveals. |
| 💿 **Analog Vinyl Player** | A beautifully rendered spinning vinyl disc that reacts to the playback state, complete with a neon conic-gradient aura. |
| 🎤 **Time-Synced Lyrics** | Real-time lyric tracking with auto-scrolling, highlighting the active lyric with a golden neon glow and fading past lines into the void. |
| 🎥 **Optimized Video Backgrounds** | High-res background videos synced to every track that lazily load and smoothly crossfade to ensure **zero lag** and high performance. |
| 🎛️ **Advanced Audio Controls** | Custom React hooks managing playback, volume, scrub-seeking, playback speed (0.5x - 2.0x), shuffle, and repeat loops. Custom neon track sliders. |
| 📱 **Flawless Responsiveness** | Perfect fluid scaling from 1440px desktop down to 360px mobile viewports, including a seamless slide-out mobile navigation panel. |
| 💎 **Glassmorphic UI** | Premium dark-mode glass styling (`backdrop-filter`) with pure CSS layers allowing video backgrounds to gracefully shine through the UI. |

---

## 🛠️ Architecture & Tech Stack

This project leverages modern frontend tooling to ensure maximum frame rates and developer velocity.

*   **Core:** React 18 ⚛️
*   **Build Tool:** Vite ⚡ *(with advanced vendor chunk splitting)*
*   **Animations:** 
    *   **GSAP:** Master timeline orchestration for the complex `Preloader`.
    *   **Framer Motion:** Seamless page transitions (`AnimatePresence`) and spring-physics interactions for the `SongCard`s and React state-based layouts.
*   **Styling:** Pure Vanilla CSS 🎨 with heavily structured CSS Variables for a maintainable design system (Neon Blue, Purple, Gold).
*   **Icons:** Lucide React 🌟 *(Lightweight, scalable SVG icons replacing legacy font-based icons).*

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/azrilgg/Azriel-fav-music.git
   cd azriel-fav-music--main
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Symlink or Add Assets:**
   *Note: Due to file sizes, media might need to be downloaded or symlinked in your local environment. Ensure the following folders exist inside the `public/` directory:*
   *   `public/audio/`
   *   `public/videos/`
   *   `public/images/`

4. **Launch the Development Server:**
   ```bash
   npm run dev
   ```
   *The server will start at `http://localhost:5173`.*

---

## 🎨 Design System Preview

```css
/* Core Color Palette */
--gold: #FFD700;           /* Accents and active states */
--neon-blue: #00F3FF;      /* Secondary accents */
--neon-pink: #BC13FE;      /* Glow effects */
--bg-dark: #06060E;        /* Void background */
--glass-bg: rgba(6, 6, 14, 0.35); /* Transparent paneling */
```

### Typography
*   **Orbitron:** Used for numbers, percentages, and futuristic displays.
*   **Cinzel:** Used for the cinematic, god-tier main titles.
*   **Poppins:** Used for highly readable body text and lyrics.

---

<div align="center">
  <p><b>Designed and Engineered by AZRIEL</b></p>
  <p><i>Made with ❤️ and excessive GSAP animations</i></p>
  <a href="https://ahmadazriel.vercel.app/" target="_blank">View Portfolio</a> •
  <a href="https://azrilgg.github.io/Azriel-fav-music/" target="_blank">View Original Version</a>
</div>
