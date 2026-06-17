# Kintsugi AI — Premium Cinematic Portfolio

Kintsugi AI is an Awwwards-grade, fully interactive immersive portfolio built for a creative cinematic studio. It embodies the "Kintsugi" philosophy—mending what is fractured in gold—as a metaphor for restoring creative directorial intent to the age of machine-generated cinema.

Live local development instance runs at: [http://localhost:5174/](http://localhost:5174/)

---

## 🌟 Interactive Experience & Core Features

### 1. The Cinematic Void (Hero Canvas)
*   A full-screen WebGL backdrop featuring a noise-deformed 3D `TorusKnot` with floating gold dust particles.
*   **Gravitational Cursor Warp**: Shaders track the mouse coordinates to distort the geometry dynamically on hover.
*   The camera zooms and rotates dynamically relative to scroll position, fading out cleanly as you scroll to reveal the philosophy.

### 2. Mending Bowls (Philosophy Canvas)
*   A scroll-pinned split-screen track where scrolling drives a 3D mending pipeline.
*   4 procedural ceramic shards **mend themselves together into a pristine bowl** on scroll progress, intensifying its inner gold emissive glow.

### 3. Golden Reels (Work Showcase)
*   A horizontal-scrolling sticky showcase track displaying the studio's portfolio.
*   **Elastic Viewfinder Cursor**: Custom magnetic preview plane follows the cursor, skewing and rotating relative to mouse speed, playing looping HD preview reels on hover.
*   Web Audio API camera shutter feedback on hover and clicks.

### 4. Cinematic Relics (What We Make Showcase)
*   **Procedural Metaphors**: Custom-engineered 3D models representing capabilities (Camera Cine-Lens, Mended Theatrical Mask, Ripple Sound disk, and a Saturn-like Kintsugi Planet).
*   **Spec Sheet Panel**: High-fidelity floating specifications card revealing camera configurations, aspect ratios, and VFX pipelines on hover.
*   **Audio Swells Synth**: Real-time synthesized ambient sounds (warm sweeps, heartbeat pulses, digital echoes, and pad drones).

### 5. Qualified Inquiry Pipeline
*   An interactive inline contact briefing form with custom category pills, dynamic budget range sliders, fake processing loaders, and success modals.

### 6. Performance Optimization
*   Equipped with local `IntersectionObserver` controllers that pause WebGL rendering loop frames (`requestAnimationFrame`) when canvases are out of the viewport, maintaining a constant **60 FPS** while protecting GPU overhead.

---

## 🛠️ Technology Stack
*   **Bundler**: Vite
*   **Styling**: Tailwind CSS v4 + Custom CSS Glassmorphism
*   **3D Render**: Three.js
*   **Animation**: GSAP + ScrollTrigger + Lenis Smooth Scroll
*   **Sound**: Native Web Audio API Sound Synthesizer

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js installed.

### Setup and Running
1. Clone the repository and navigate to the directory:
   ```bash
   cd kintsugi-portfolio
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```
