import './style.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import * as THREE from 'three';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Initialize Smooth Scroll
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  touchMultiplier: 1.5
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Build App Layout
const app = document.querySelector('#app');
app.innerHTML = `
  <div class="noise-overlay"></div>
  <div class="custom-cursor hidden md:block"></div>
  <div class="custom-cursor-follower hidden md:block"></div>

  <!-- Cinematic Vignette Overlay -->
  <div class="cinematic-overlay"></div>

  <!-- Global Floating Cursor Video Preview Frame -->
  <div id="portfolio-cursor-preview" class="fixed pointer-events-none z-30 opacity-0 scale-75 overflow-hidden w-64 h-36 rounded-xl border border-gold-metallic/30 shadow-2xl bg-space-black/80 backdrop-blur-md transition-all duration-300">
    <video id="cursor-video-player" class="w-full h-full object-cover" loop muted playsinline></video>
    <div class="absolute inset-0 bg-gradient-to-t from-space-black/50 to-transparent"></div>
  </div>

  <!-- Glassmorphic Header -->
  <header class="glass-header fixed top-0 left-0 w-full z-50 py-5 px-6 md:px-12 flex justify-between items-center">
    <div class="flex items-center">
      <a href="#" class="logo text-white font-display font-extrabold text-2xl tracking-[0.2em] flex items-center relative group">
        <span class="logo-letters flex">
          <span class="logo-letter">K</span>
          <span class="logo-letter">I</span>
          <span class="logo-letter">N</span>
          <span class="logo-letter">T</span>
          <span class="logo-letter">S</span>
          <span class="logo-letter">U</span>
          <span class="logo-letter">G</span>
          <span class="logo-letter">I</span>
        </span>
        <span class="text-gold-metallic group-hover:scale-120 transition-transform duration-300 ml-1">®</span>
      </a>
    </div>

    <!-- Desktop Nav Links -->
    <nav class="hidden md:flex items-center space-x-10">
      <a href="#work-section" class="nav-link nav-link-mask font-sans text-xs tracking-[0.15em] uppercase text-muted-silver hover:text-white">
        <span class="nav-link-text">Work</span>
        <span class="nav-link-hover">Work</span>
      </a>
      <a href="#services-section" class="nav-link nav-link-mask font-sans text-xs tracking-[0.15em] uppercase text-muted-silver hover:text-white">
        <span class="nav-link-text">Services</span>
        <span class="nav-link-hover">Services</span>
      </a>
      <a href="#about" class="nav-link nav-link-mask font-sans text-xs tracking-[0.15em] uppercase text-muted-silver hover:text-white">
        <span class="nav-link-text">Philosophy</span>
        <span class="nav-link-hover">Philosophy</span>
      </a>
    </nav>

    <!-- Header Action Links -->
    <div class="flex items-center space-x-6">
      <button id="menu-toggle-services" class="btn-gold-liquid px-6 py-3 rounded-full text-white font-sans text-[10px] tracking-widest uppercase bg-transparent flex items-center space-x-2">
        <span>Explore Studios</span>
        <span class="w-1.5 h-1.5 rounded-full bg-gold-metallic animate-ping"></span>
      </button>

      <button id="menu-toggle" class="flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none z-50">
        <span class="w-6 h-0.5 bg-white transition-transform duration-300 origin-center" id="line1"></span>
        <span class="w-6 h-0.5 bg-white transition-opacity duration-300" id="line2"></span>
        <span class="w-6 h-0.5 bg-white transition-transform duration-300 origin-center" id="line3"></span>
      </button>
    </div>
  </header>

  <!-- Fullscreen Interactive Services Portal Menu -->
  <div id="services-menu" class="fixed inset-0 w-full h-full bg-space-black z-40 flex flex-col md:flex-row translate-y-full opacity-0 pointer-events-none transition-all duration-700 overflow-hidden">
    
    <!-- Background Video Previewer -->
    <div class="absolute inset-0 w-full h-full -z-10 opacity-0 transition-opacity duration-500 overflow-hidden" id="video-preview-container">
      <video id="menu-video-player" class="w-full h-full object-cover scale-105 filter brightness-50" loop muted playsinline></video>
      <div class="absolute inset-0 bg-gradient-to-r from-space-black via-space-black/75 to-transparent"></div>
    </div>

    <!-- Left side: Services List -->
    <div class="flex-grow flex flex-col justify-center px-8 md:px-24 py-24 space-y-8 z-10 w-full md:w-1/2">
      <h3 class="text-gold-metallic font-display text-xs tracking-[0.3em] uppercase opacity-60">STUDIOS & CAPABILITIES</h3>
      
      <div class="space-y-4">
        <div class="service-menu-item group" data-video="https://assets.mixkit.co/videos/preview/mixkit-futuristic-subway-station-with-neon-lights-43950-large.mp4" data-sound="brand">
          <span class="text-xs font-sans text-gold-metallic/40 group-hover:text-gold-metallic transition-colors">01 / BRANDING</span>
          <h4 class="text-3xl sm:text-5xl font-display font-black tracking-tight text-white/50 group-hover:text-white transition-all duration-300 group-hover:pl-4">
            BRAND CINEMA
          </h4>
        </div>
        
        <div class="service-menu-item group" data-video="https://assets.mixkit.co/videos/preview/mixkit-animation-of-lens-flares-in-a-dark-background-40742-large.mp4" data-sound="narrative">
          <span class="text-xs font-sans text-gold-metallic/40 group-hover:text-gold-metallic transition-colors">02 / STORIES</span>
          <h4 class="text-3xl sm:text-5xl font-display font-black tracking-tight text-white/50 group-hover:text-white transition-all duration-300 group-hover:pl-4">
            NARRATIVE SHORTS
          </h4>
        </div>

        <div class="service-menu-item group" data-video="https://assets.mixkit.co/videos/preview/mixkit-neon-light-strips-flashing-on-and-off-43949-large.mp4" data-sound="music">
          <span class="text-xs font-sans text-gold-metallic/40 group-hover:text-gold-metallic transition-colors">03 / LABELS</span>
          <h4 class="text-3xl sm:text-5xl font-display font-black tracking-tight text-white/50 group-hover:text-white transition-all duration-300 group-hover:pl-4">
            MUSIC VIDEOS
          </h4>
        </div>

        <div class="service-menu-item group" data-video="https://assets.mixkit.co/videos/preview/mixkit-particle-cluster-flowing-in-space-40624-large.mp4" data-sound="ip">
          <span class="text-xs font-sans text-gold-metallic/40 group-hover:text-gold-metallic transition-colors">04 / CREATION</span>
          <h4 class="text-3xl sm:text-5xl font-display font-black tracking-tight text-white/50 group-hover:text-white transition-all duration-300 group-hover:pl-4">
            ORIGINAL IP
          </h4>
        </div>
      </div>
    </div>

    <!-- Right side: Visual Showcase Details Panel -->
    <div class="hidden md:flex w-1/2 h-full flex-col justify-between p-24 border-l border-white/5 bg-deep-void/40 backdrop-blur-md z-10 transition-transform duration-700 translate-x-full" id="details-panel">
      <div class="space-y-6">
        <span class="text-xs tracking-widest text-gold-metallic uppercase font-display" id="detail-category">SELECT A STUDIO</span>
        <h2 class="text-4xl font-display font-bold leading-tight" id="detail-title">Mending Cinema with Gold</h2>
        <p class="text-sm text-muted-silver leading-relaxed font-sans" id="detail-desc">
          Hover over each service block on the left to activate film projection previews, dynamic sound environments, and technical deliverables.
        </p>
      </div>

      <div class="border-t border-white/5 pt-8 space-y-4">
        <div class="flex justify-between text-xs font-sans">
          <span class="text-muted-silver">PRODUCTION SPEED</span>
          <span class="text-white" id="detail-stat-speed">Days, not months</span>
        </div>
        <div class="flex justify-between text-xs font-sans">
          <span class="text-muted-silver">CORE ENGINE</span>
          <span class="text-white" id="detail-stat-engine">Directorial Instinct + AI Velocity</span>
        </div>
      </div>
    </div>

    <!-- Close Button inside menu -->
    <button id="close-services" class="absolute top-8 right-8 text-white font-sans text-xs tracking-widest uppercase border border-white/10 px-4 py-2 rounded-full hover:bg-white/15 transition-colors">
      Close Portal
    </button>
  </div>

  <main class="w-full">
    <!-- Hero Section -->
    <section id="hero" class="min-h-screen flex flex-col justify-center items-start pt-32 pb-20 px-6 md:px-24 relative overflow-hidden select-none">
      <div class="z-10 max-w-5xl space-y-8 text-left">
        <div class="space-y-4">
          <span class="text-xs font-display tracking-[0.3em] text-gold-metallic uppercase block opacity-0 translate-y-4" id="hero-tag">
            KINTSUGI AI STUDIO
          </span>
          <h1 class="text-5xl sm:text-7xl md:text-[6.5rem] font-display font-black leading-[0.95] tracking-tighter uppercase text-white flex flex-col" id="hero-title">
            <span class="hero-line overflow-hidden block py-1">
              <span class="hero-word inline-block translate-y-[100%] opacity-0">CINEMATIC</span>
            </span>
            <span class="hero-line overflow-hidden block py-1 text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gold-metallic">
              <span class="hero-word inline-block translate-y-[100%] opacity-0">VISION</span>
            </span>
            <span class="hero-line overflow-hidden block py-1">
              <span class="hero-word inline-block translate-y-[100%] opacity-0">MENDED IN GOLD</span>
            </span>
          </h1>
        </div>
        
        <p class="text-sm sm:text-lg text-muted-silver max-w-xl font-sans leading-relaxed translate-y-[30px] opacity-0" id="hero-subtitle">
          Generative models have fractured the traditional craft. We mend the seams visibly, combining directorial instinct with machine velocity.
        </p>

        <div class="flex items-center space-x-6 translate-y-[40px] opacity-0" id="hero-actions">
          <a href="#work-section" class="btn-gold-liquid px-8 py-4 text-xs tracking-widest uppercase bg-transparent text-white flex items-center space-x-3">
            <span>Explore Reel</span>
            <svg class="w-4 h-4 text-gold-metallic" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </a>
          <a href="#about" class="text-xs tracking-widest uppercase text-muted-silver hover:text-white transition-colors duration-300 font-sans">
            Our Philosophy →
          </a>
        </div>
      </div>

      <!-- Cinematic Bottom Stats bar -->
      <div class="absolute bottom-12 left-6 md:left-24 right-6 md:right-24 flex justify-between items-center border-t border-white/5 pt-8 z-10 text-[10px] tracking-widest text-muted-silver uppercase font-sans">
        <div class="flex space-x-8">
          <span>FPS: <span class="text-gold-metallic" id="fps-counter">60</span></span>
          <span>EST: 2024</span>
        </div>
        <span>Scroll to Descend</span>
      </div>
    </section>

    <!-- Phase 3: About / Philosophy Section -->
    <section id="about" class="min-h-screen w-full flex flex-col md:flex-row relative border-t border-white/5 bg-space-black">
      <!-- Left Side: Copy -->
      <div class="w-full md:w-1/2 px-6 md:px-24 py-24 md:py-32 flex flex-col justify-center space-y-12">
        <div class="space-y-4">
          <span class="text-xs font-display tracking-[0.3em] text-gold-metallic uppercase block">
            THE PHILOSOPHY
          </span>
          <h2 class="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight uppercase leading-[1.0] text-white" id="about-title">
            We mend the broken seams of cinema.
          </h2>
        </div>

        <div class="space-y-6 text-muted-silver font-sans text-sm md:text-base leading-relaxed">
          <p class="about-p">
            Kintsugi is the Japanese art of repairing fractured ceramics with lacquer dusted in precious gold—treating breakage as part of the object's history, not something to disguise.
          </p>
          <p class="about-p text-white">
            We hold the same belief about cinema in the age of generative models: the new tools have fractured the old craft. We mend the seams visibly, in gold.
          </p>
        </div>

        <!-- Pillars List -->
        <div class="space-y-8 border-t border-white/5 pt-10">
          <div class="about-pillar group">
            <div class="flex items-center space-x-4">
              <span class="text-gold-metallic text-xs font-display">01 / INTENT</span>
              <h4 class="text-lg font-display font-bold text-white">Directorial Instinct</h4>
            </div>
            <p class="text-xs text-muted-silver mt-1 max-w-sm">
              Every frame begins with intent. The model serves the eye, never the inverse.
            </p>
          </div>

          <div class="about-pillar group">
            <div class="flex items-center space-x-4">
              <span class="text-gold-metallic text-xs font-display">02 / VELOCITY</span>
              <h4 class="text-lg font-display font-bold text-white">Machine Velocity</h4>
            </div>
            <p class="text-xs text-muted-silver mt-1 max-w-sm">
              We move at the speed of imagination—concept to picture-lock in days, not months.
            </p>
          </div>

          <div class="about-pillar group">
            <div class="flex items-center space-x-4">
              <span class="text-gold-metallic text-xs font-display">03 / CRAFT</span>
              <h4 class="text-lg font-display font-bold text-white">Golden Finish</h4>
            </div>
            <p class="text-xs text-muted-silver mt-1 max-w-sm">
              Where seams remain, we mend them in gold. The repair is the artwork.
            </p>
          </div>
        </div>
      </div>

      <!-- Right Side: Sticky 3D WebGL Viewport -->
      <div class="w-full md:w-1/2 h-[50vh] md:h-screen md:sticky md:top-0 flex items-center justify-center bg-deep-void/10 overflow-hidden relative border-t md:border-t-0 md:border-l border-white/5">
        <div class="absolute inset-0 bg-gradient-to-t from-space-black via-transparent to-space-black pointer-events-none z-10"></div>
        <div class="text-center absolute top-12 text-[10px] tracking-widest text-gold-metallic/40 uppercase z-10 font-sans">
          Interactive 3D Mending Pipeline
        </div>
        <canvas id="mending-canvas" class="w-full h-full"></canvas>
      </div>
    </section>

    <!-- Phase 4: Horizontal Scroll Work Gallery -->
    <div id="work-section" class="relative w-full overflow-hidden bg-space-black border-t border-white/5">
      <div id="work-pin-container" class="h-screen w-full flex items-center relative">
        <div class="absolute left-6 md:left-24 z-20 pointer-events-none max-w-xs space-y-4">
          <span class="text-xs font-display tracking-[0.3em] text-gold-metallic uppercase block">
            SELECTED WORK
          </span>
          <h2 class="text-4xl md:text-5xl font-display font-black leading-tight uppercase text-white">
            The Golden Reels
          </h2>
          <p class="text-xs text-muted-silver font-sans leading-relaxed">
            Drag, hover or scroll dynamically to preview our latest campaigns, music videos and worlds.
          </p>
        </div>

        <div id="work-horizontal-track" class="flex items-center pl-[25vw] md:pl-[35vw] pr-[20vw] space-x-16 md:space-x-28 h-full">
          <div class="portfolio-card flex-shrink-0 w-[60vw] md:w-[32vw] h-[55vh] rounded-2xl overflow-hidden relative group border border-white/5 bg-deep-void/20 backdrop-blur-sm transition-transform duration-500 hover:scale-[1.03]" 
               data-video="https://assets.mixkit.co/videos/preview/mixkit-going-down-in-a-gold-glowing-elevator-43285-large.mp4">
            <div class="absolute inset-0 bg-gradient-to-t from-space-black via-transparent to-transparent z-10"></div>
            <div class="absolute top-8 left-8 text-[10px] font-sans text-gold-metallic tracking-widest uppercase">01 / BRAND CAMPAIGN</div>
            <div class="absolute bottom-8 left-8 space-y-2 z-20">
              <h3 class="text-2xl md:text-3xl font-display font-extrabold uppercase text-white">AURUM</h3>
              <p class="text-xs text-muted-silver font-sans">Visual campaigns for luxury fashion & design.</p>
            </div>
            <div class="absolute inset-0 bg-gold-metallic/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <div class="portfolio-card flex-shrink-0 w-[60vw] md:w-[32vw] h-[55vh] rounded-2xl overflow-hidden relative group border border-white/5 bg-deep-void/20 backdrop-blur-sm transition-transform duration-500 hover:scale-[1.03]"
               data-video="https://assets.mixkit.co/videos/preview/mixkit-raindrops-falling-on-glass-in-slow-motion-41870-large.mp4">
            <div class="absolute inset-0 bg-gradient-to-t from-space-black via-transparent to-transparent z-10"></div>
            <div class="absolute top-8 left-8 text-[10px] font-sans text-gold-metallic tracking-widest uppercase">02 / NARRATIVE SHORT</div>
            <div class="absolute bottom-8 left-8 space-y-2 z-20">
              <h3 class="text-2xl md:text-3xl font-display font-extrabold uppercase text-white">THE MENDED</h3>
              <p class="text-xs text-muted-silver font-sans">Anamorphic stories and award-winning shorts.</p>
            </div>
            <div class="absolute inset-0 bg-gold-metallic/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <div class="portfolio-card flex-shrink-0 w-[60vw] md:w-[32vw] h-[55vh] rounded-2xl overflow-hidden relative group border border-white/5 bg-deep-void/20 backdrop-blur-sm transition-transform duration-500 hover:scale-[1.03]"
               data-video="https://assets.mixkit.co/videos/preview/mixkit-cyberpunk-neon-city-streets-in-a-rainy-night-43952-large.mp4">
            <div class="absolute inset-0 bg-gradient-to-t from-space-black via-transparent to-transparent z-10"></div>
            <div class="absolute top-8 left-8 text-[10px] font-sans text-gold-metallic tracking-widest uppercase">03 / MUSIC VIDEO</div>
            <div class="absolute bottom-8 left-8 space-y-2 z-20">
              <h3 class="text-2xl md:text-3xl font-display font-extrabold uppercase text-white">NEON SUTRA</h3>
              <p class="text-xs text-muted-silver font-sans">High-energy visualizer and labels anchors.</p>
            </div>
            <div class="absolute inset-0 bg-gold-metallic/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <div class="portfolio-card flex-shrink-0 w-[60vw] md:w-[32vw] h-[55vh] rounded-2xl overflow-hidden relative group border border-white/5 bg-deep-void/20 backdrop-blur-sm transition-transform duration-500 hover:scale-[1.03]"
               data-video="https://assets.mixkit.co/videos/preview/mixkit-slow-motion-camera-tilt-up-a-church-ceiling-43946-large.mp4">
            <div class="absolute inset-0 bg-gradient-to-t from-space-black via-transparent to-transparent z-10"></div>
            <div class="absolute top-8 left-8 text-[10px] font-sans text-gold-metallic tracking-widest uppercase">04 / ARCHITECTURAL</div>
            <div class="absolute bottom-8 left-8 space-y-2 z-20">
              <h3 class="text-2xl md:text-3xl font-display font-extrabold uppercase text-white">CATHEDRA</h3>
              <p class="text-xs text-muted-silver font-sans">Moody lighting and structural campaign visualizers.</p>
            </div>
            <div class="absolute inset-0 bg-gold-metallic/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <div class="portfolio-card flex-shrink-0 w-[60vw] md:w-[32vw] h-[55vh] rounded-2xl overflow-hidden relative group border border-white/5 bg-deep-void/20 backdrop-blur-sm transition-transform duration-500 hover:scale-[1.03]"
               data-video="https://assets.mixkit.co/videos/preview/mixkit-digital-particle-explosion-in-dark-background-40626-large.mp4">
            <div class="absolute inset-0 bg-gradient-to-t from-space-black via-transparent to-transparent z-10"></div>
            <div class="absolute top-8 left-8 text-[10px] font-sans text-gold-metallic tracking-widest uppercase">05 / ORIGINAL IP</div>
            <div class="absolute bottom-8 left-8 space-y-2 z-20">
              <h3 class="text-2xl md:text-3xl font-display font-extrabold uppercase text-white">LAST LIGHT</h3>
              <p class="text-xs text-muted-silver font-sans">Developing science-fiction worlds and licenses.</p>
            </div>
            <div class="absolute inset-0 bg-gold-metallic/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Phase 5: "What We Make" (Dynamic Split-Screen 3D Morph Showcase) -->
    <section id="services-section" class="min-h-screen w-full flex flex-col md:flex-row relative border-t border-white/5 bg-space-black">
      
      <!-- Left side: Services List -->
      <div class="w-full md:w-1/2 px-6 md:px-24 py-24 md:py-32 flex flex-col justify-center space-y-12">
        <div class="space-y-4">
          <span class="text-xs font-display tracking-[0.3em] text-gold-metallic uppercase block animate-pulse">
            STUDIO CAPABILITIES
          </span>
          <h2 class="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight uppercase leading-[1.0] text-white">
            What We Make.
          </h2>
        </div>

        <!-- Scrollable stack that triggers the 3D Morph on the right -->
        <div class="space-y-8 border-t border-white/5 pt-10" id="services-interactive-list">
          
          <div class="service-item-selector group cursor-pointer border-b border-white/5 pb-6" data-morph="brand">
            <div class="flex justify-between items-center">
              <div class="flex items-center space-x-4">
                <span class="text-gold-metallic text-xs font-display">01 / CAMPAIGNS</span>
                <h4 class="text-2xl md:text-3xl font-display font-bold text-white group-hover:text-gold-metallic transition-colors">Brand Cinema</h4>
              </div>
              <span class="text-xs text-muted-silver group-hover:translate-x-2 transition-transform duration-300">Explore →</span>
            </div>
            <p class="text-xs text-muted-silver mt-2 max-w-md font-sans leading-relaxed">
              High-concept films for luxury automotive, fragrance, fashion, and hospitality.
            </p>
          </div>

          <div class="service-item-selector group cursor-pointer border-b border-white/5 pb-6" data-morph="narrative">
            <div class="flex justify-between items-center">
              <div class="flex items-center space-x-4">
                <span class="text-gold-metallic text-xs font-display">02 / STORIES</span>
                <h4 class="text-2xl md:text-3xl font-display font-bold text-white group-hover:text-gold-metallic transition-colors">Narrative Shorts</h4>
              </div>
              <span class="text-xs text-muted-silver group-hover:translate-x-2 transition-transform duration-300">Explore →</span>
            </div>
            <p class="text-xs text-muted-silver mt-2 max-w-md font-sans leading-relaxed">
              Script-driven original shorts, written, directed, and finished in-house.
            </p>
          </div>

          <div class="service-item-selector group cursor-pointer border-b border-white/5 pb-6" data-morph="music">
            <div class="flex justify-between items-center">
              <div class="flex items-center space-x-4">
                <span class="text-gold-metallic text-xs font-display">03 / LABELS</span>
                <h4 class="text-2xl md:text-3xl font-display font-bold text-white group-hover:text-gold-metallic transition-colors">Music Videos</h4>
              </div>
              <span class="text-xs text-muted-silver group-hover:translate-x-2 transition-transform duration-300">Explore →</span>
            </div>
            <p class="text-xs text-muted-silver mt-2 max-w-md font-sans leading-relaxed">
              Sound-reactive conceptual visualizers for major and independent artists.
            </p>
          </div>

          <div class="service-item-selector group cursor-pointer pb-6" data-morph="ip">
            <div class="flex justify-between items-center">
              <div class="flex items-center space-x-4">
                <span class="text-gold-metallic text-xs font-display">04 / CREATION</span>
                <h4 class="text-2xl md:text-3xl font-display font-bold text-white group-hover:text-gold-metallic transition-colors">Original IP</h4>
              </div>
              <span class="text-xs text-muted-silver group-hover:translate-x-2 transition-transform duration-300">Explore →</span>
            </div>
            <p class="text-xs text-muted-silver mt-2 max-w-md font-sans leading-relaxed">
              Developing, licensing, and financing of cinematic worlds and properties.
            </p>
          </div>

        </div>

        <!-- Spec Sheet Box -->
        <div id="services-spec-sheet" class="glass-card p-6 rounded-2xl border border-white/5 bg-deep-void/40 backdrop-blur-md opacity-0 translate-y-4 transition-all duration-500 hidden md:block">
          <div class="flex justify-between items-center border-b border-white/5 pb-3 mb-3">
            <span class="text-[9px] tracking-widest text-gold-metallic font-display uppercase font-bold">STUDIO SPECIFICATION SHEET</span>
            <span class="text-[9px] text-muted-silver font-mono" id="spec-status">ACTIVE PIPELINE</span>
          </div>
          <div class="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span class="text-[9px] text-muted-silver block uppercase tracking-wider">Lenses / Camera</span>
              <span class="text-white font-sans font-medium" id="spec-camera">-</span>
            </div>
            <div>
              <span class="text-[9px] text-muted-silver block uppercase tracking-wider">Aspect Ratio</span>
              <span class="text-white font-sans font-medium" id="spec-ratio">-</span>
            </div>
            <div>
              <span class="text-[9px] text-muted-silver block uppercase tracking-wider">VFX Pipeline</span>
              <span class="text-white font-sans font-medium" id="spec-vfx">-</span>
            </div>
            <div>
              <span class="text-[9px] text-muted-silver block uppercase tracking-wider">Delivery format</span>
              <span class="text-white font-sans font-medium" id="spec-delivery">-</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Right Side: Sticky 3D WebGL Morphing Viewport -->
      <div class="w-full md:w-1/2 h-[50vh] md:h-screen md:sticky md:top-0 flex items-center justify-center bg-deep-void/10 overflow-hidden relative border-t md:border-t-0 md:border-l border-white/5">
        <div class="absolute inset-0 bg-gradient-to-t from-space-black via-transparent to-space-black pointer-events-none z-10"></div>
        <div class="text-center absolute top-12 text-[10px] tracking-widest text-gold-metallic/40 uppercase z-10 font-sans">
          3D Morphing Studio Viewport
        </div>
        
        <!-- Local canvas for the morphing geometries -->
        <canvas id="morph-canvas" class="w-full h-full"></canvas>
      </div>

    </section>

    <!-- Phase 5 Part 2: Workflow Timeline (Scroll-tied draw line) -->
    <section class="py-24 bg-space-black relative border-t border-white/5">
      <div class="max-w-3xl mx-auto space-y-16" id="workflow-container">
        <div class="text-center space-y-2">
          <span class="text-xs tracking-widest text-gold-metallic font-display uppercase">THE PIPELINE</span>
          <h3 class="text-2xl md:text-3xl font-display font-bold uppercase text-white">Built like a film set, run like code.</h3>
        </div>

        <div class="relative pl-8 md:pl-0" id="timeline-track">
          <div class="absolute left-1 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/5 origin-top"></div>
          <div class="absolute left-1 md:left-1/2 top-0 w-[1px] bg-gold-metallic origin-top scale-y-0" id="timeline-draw-line" style="height: 100%;"></div>

          <div class="timeline-step relative md:w-1/2 pr-0 md:pr-12 md:text-right md:left-0 pb-16 opacity-30 transition-opacity duration-300">
            <div class="absolute -left-[31px] md:-right-[35px] top-1.5 w-3 h-3 rounded-full bg-space-black border-2 border-white/20 transition-colors duration-300 step-node z-10"></div>
            <div class="space-y-2">
              <span class="text-xs font-display text-gold-metallic">STAGE 01</span>
              <h4 class="text-xl font-display font-extrabold text-white">Prompt Scripting & Structure Mapping</h4>
              <p class="text-xs text-muted-silver leading-relaxed font-sans">
                We draft prompt templates and layout wireframes to define camera movements and lighting grids before launching video models.
              </p>
            </div>
          </div>

          <div class="timeline-step relative md:w-1/2 pl-0 md:pl-12 md:left-1/2 pb-16 opacity-30 transition-opacity duration-300">
            <div class="absolute -left-[31px] md:-left-[35px] top-1.5 w-3 h-3 rounded-full bg-space-black border-2 border-white/20 transition-colors duration-300 step-node z-10"></div>
            <div class="space-y-2">
              <span class="text-xs font-display text-gold-metallic">STAGE 02</span>
              <h4 class="text-xl font-display font-extrabold text-white">Pre-Visualization Moodboards</h4>
              <p class="text-xs text-muted-silver leading-relaxed font-sans">
                Generating high-resolution storyboard frames to establish style weight, color grading, and asset directions with the director.
              </p>
            </div>
          </div>

          <div class="timeline-step relative md:w-1/2 pr-0 md:pr-12 md:text-right md:left-0 pb-16 opacity-30 transition-opacity duration-300">
            <div class="absolute -left-[31px] md:-right-[35px] top-1.5 w-3 h-3 rounded-full bg-space-black border-2 border-white/20 transition-colors duration-300 step-node z-10"></div>
            <div class="space-y-2">
              <span class="text-xs font-display text-gold-metallic">STAGE 03</span>
              <h4 class="text-xl font-display font-extrabold text-white">Multi-Model Video Diffusion</h4>
              <p class="text-xs text-muted-silver leading-relaxed font-sans">
                Rendering raw visual footage on advanced GPU clusters using custom-trained models to ensure aesthetic coherence.
              </p>
            </div>
          </div>

          <div class="timeline-step relative md:w-1/2 pl-0 md:pl-12 md:left-1/2 pb-16 opacity-30 transition-opacity duration-300">
            <div class="absolute -left-[31px] md:-left-[35px] top-1.5 w-3 h-3 rounded-full bg-space-black border-2 border-white/20 transition-colors duration-300 step-node z-10"></div>
            <div class="space-y-2">
              <span class="text-xs font-display text-gold-metallic">STAGE 04</span>
              <h4 class="text-xl font-display font-extrabold text-white">Mending: VFX Painting & Upscaling</h4>
              <p class="text-xs text-muted-silver leading-relaxed font-sans">
                The core Kintsugi touch. We clean up model aberrations, paint gold highlights, and upscale footage to 4K resolution using hand-crafted methods.
              </p>
            </div>
          </div>

          <div class="timeline-step relative md:w-1/2 pr-0 md:pr-12 md:text-right md:left-0 pb-6 opacity-30 transition-opacity duration-300">
            <div class="absolute -left-[31px] md:-right-[35px] top-1.5 w-3 h-3 rounded-full bg-space-black border-2 border-white/20 transition-colors duration-300 step-node z-10"></div>
            <div class="space-y-2">
              <span class="text-xs font-display text-gold-metallic">STAGE 05</span>
              <h4 class="text-xl font-display font-extrabold text-white">Picture Lock & Sound Design</h4>
              <p class="text-xs text-muted-silver leading-relaxed font-sans">
                Adding Foley, music synchronizations, and fine-grain layers to deliver the final production master.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Phase 6: Project Inquiry Briefing Form & Footer -->
    <section id="contact" class="py-24 md:py-32 px-6 md:px-24 bg-space-black relative border-t border-white/5 overflow-hidden">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-aurora-indigo/15 rounded-full filter blur-[120px] pointer-events-none -z-10"></div>

      <div class="max-w-4xl mx-auto space-y-16">
        <div class="text-center space-y-4">
          <span class="text-xs font-display tracking-[0.3em] text-gold-metallic uppercase block">
            GET IN TOUCH
          </span>
          <h2 class="text-4xl md:text-6xl font-display font-black uppercase text-white leading-none">
            Have something to mend?
          </h2>
          <p class="text-sm text-muted-silver max-w-md mx-auto font-sans leading-relaxed">
            Brief us on your film, brand campaign or fictional universe. We respond within 48 hours, from whichever studio is awake.
          </p>
        </div>

        <div class="glass-card p-8 md:p-12 rounded-3xl border border-white/5 relative" id="brief-form-container">
          <form id="kintsugi-brief-form" class="space-y-10">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="space-y-2">
                <label class="text-[10px] tracking-widest text-gold-metallic font-display uppercase block">Your Name</label>
                <input type="text" required placeholder="E.g., Alexander" class="w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-gold-metallic transition-colors font-sans text-sm">
              </div>
              <div class="space-y-2">
                <label class="text-[10px] tracking-widest text-gold-metallic font-display uppercase block">Company / Brand</label>
                <input type="text" required placeholder="E.g., Porsche" class="w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-gold-metallic transition-colors font-sans text-sm">
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-[10px] tracking-widest text-gold-metallic font-display uppercase block">Email Address</label>
              <input type="email" required placeholder="alexander@brand.com" class="w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-gold-metallic transition-colors font-sans text-sm">
            </div>

            <div class="space-y-3">
              <label class="text-[10px] tracking-widest text-gold-metallic font-display uppercase block">Project Category</label>
              <div class="flex flex-wrap gap-3" id="form-category-pills">
                <button type="button" class="form-pill px-5 py-2.5 rounded-full border border-white/10 text-white font-sans text-xs tracking-wider bg-transparent hover:border-gold-metallic/50 transition-colors" data-cat="Brand Film">Brand Film</button>
                <button type="button" class="form-pill px-5 py-2.5 rounded-full border border-white/10 text-white font-sans text-xs tracking-wider bg-transparent hover:border-gold-metallic/50 transition-colors" data-cat="Narrative Short">Narrative Short</button>
                <button type="button" class="form-pill px-5 py-2.5 rounded-full border border-white/10 text-white font-sans text-xs tracking-wider bg-transparent hover:border-gold-metallic/50 transition-colors" data-cat="Music Video">Music Video</button>
                <button type="button" class="form-pill px-5 py-2.5 rounded-full border border-white/10 text-white font-sans text-xs tracking-wider bg-transparent hover:border-gold-metallic/50 transition-colors" data-cat="Original IP">Original IP</button>
              </div>
            </div>

            <div class="space-y-4">
              <div class="flex justify-between items-center text-[10px] tracking-widest text-gold-metallic font-display uppercase">
                <span>Estimated Budget</span>
                <span class="text-white" id="budget-counter-display">$50,000 - $100,000</span>
              </div>
              <input type="range" min="1" max="4" value="2" class="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold-metallic" id="form-budget-slider">
            </div>

            <div class="space-y-2">
              <label class="text-[10px] tracking-widest text-gold-metallic font-display uppercase block">Brief Overview / Idea</label>
              <textarea placeholder="Describe the fractured seams of the story you wish to mend..." rows="4" class="w-full bg-transparent border border-white/10 p-4 rounded-xl text-white focus:outline-none focus:border-gold-metallic transition-colors font-sans text-sm resize-none"></textarea>
            </div>

            <div class="text-center pt-4">
              <button type="submit" class="btn-gold-liquid px-10 py-5 rounded-full text-white font-sans text-xs tracking-widest uppercase bg-transparent w-full sm:w-auto">
                Commission a Film
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Global Premium Footer -->
      <footer class="mt-24 md:mt-36 border-t border-white/5 pt-16 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm text-muted-silver font-sans select-none">
        <div class="space-y-4">
          <div class="text-white font-display font-extrabold text-2xl tracking-[0.2em]">KINTSUGI®</div>
          <p class="text-xs leading-relaxed max-w-xs">
            An independent AI cinematic studio. We mend the fractured craft of cinema with gold.
          </p>
        </div>

        <div class="space-y-3">
          <h5 class="text-xs tracking-widest text-gold-metallic font-display uppercase">Active Studios</h5>
          <ul class="space-y-2 text-xs">
            <li>New Delhi / India</li>
            <li>New York City / USA</li>
            <li>Tokyo / Japan</li>
            <li class="text-[10px] text-muted-silver/50 uppercase mt-2">"Whichever is awake"</li>
          </ul>
        </div>

        <div class="space-y-3">
          <h5 class="text-xs tracking-widest text-gold-metallic font-display uppercase">Reels & Feeds</h5>
          <ul class="space-y-2 text-xs">
            <li><a href="#" class="hover:text-white transition-colors">Vimeo Pro</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Instagram</a></li>
            <li><a href="#" class="hover:text-white transition-colors">LinkedIn Profile</a></li>
          </ul>
        </div>

        <div class="space-y-3">
          <h5 class="text-xs tracking-widest text-gold-metallic font-display uppercase">Direct Contact</h5>
          <ul class="space-y-2 text-xs">
            <li><a href="mailto:studio@kintsugi.ai" class="hover:text-white transition-colors text-white font-bold">studio@kintsugi.ai</a></li>
            <li>Response within 48 Hours</li>
          </ul>
        </div>

        <div class="md:col-span-4 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-muted-silver/40 uppercase tracking-widest">
          <span>© 2026 Kintsugi AI. All Rights Reserved.</span>
          <span>Made for Visual Authority</span>
        </div>
      </footer>
    </section>
  </main>
`;

// Web Audio API Sound Synthesizer
let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function playSound(type) {
  try {
    initAudio();
    if (!audioCtx) return;

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    if (type === 'hover') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(2200, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400, audioCtx.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.015, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.12);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.12);

      setTimeout(() => {
        const oscChime = audioCtx.createOscillator();
        const gainChime = audioCtx.createGain();
        oscChime.connect(gainChime);
        gainChime.connect(audioCtx.destination);
        
        oscChime.type = 'triangle';
        oscChime.frequency.setValueAtTime(880, audioCtx.currentTime);
        gainChime.gain.setValueAtTime(0.005, audioCtx.currentTime);
        gainChime.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.8);
        
        oscChime.start();
        oscChime.stop(audioCtx.currentTime + 0.8);
      }, 30);

    } else if (type === 'click') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.35);

      gainNode.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.35);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.35);
    } else if (type === 'shutter') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(3200, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.05);

      gainNode.gain.setValueAtTime(0.008, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.05);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
    } else if (type === 'tick') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1600, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.005, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.02);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.02);
    }
  } catch (error) {
    console.warn('Audio context blocked:', error);
  }
}

// Custom Cursor Easing
const cursor = document.querySelector('.custom-cursor');
const follower = document.querySelector('.custom-cursor-follower');

if (cursor && follower) {
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
  });

  const updateFollower = () => {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;

    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;

    requestAnimationFrame(updateFollower);
  };
  requestAnimationFrame(updateFollower);

  const hoverables = document.querySelectorAll('a, button, .service-menu-item, .portfolio-card, .service-item-selector, .form-pill');
  hoverables.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      cursor.classList.add('hovered');
      follower.classList.add('hovered');
    });

    item.addEventListener('mouseleave', () => {
      cursor.classList.remove('hovered');
      follower.classList.remove('hovered');
    });
  });
}

// Logo Stagger Letter Hover Animations
const logoLetters = document.querySelectorAll('.logo-letter');
const logoAnchor = document.querySelector('.logo');

if (logoAnchor) {
  logoAnchor.addEventListener('mouseenter', () => {
    playSound('hover');
    gsap.to(logoLetters, {
      y: -5,
      color: '#D4AF37',
      stagger: 0.04,
      duration: 0.3,
      ease: "power2.out"
    });
  });

  logoAnchor.addEventListener('mouseleave', () => {
    gsap.to(logoLetters, {
      y: 0,
      color: '#FFFFFF',
      stagger: 0.02,
      duration: 0.4,
      ease: "power2.in"
    });
  });
}

// Interactive Services Portal toggle controls
const menuToggleServices = document.querySelector('#menu-toggle-services');
const servicesMenu = document.querySelector('#services-menu');
const closeServices = document.querySelector('#close-services');
const detailsPanel = document.querySelector('#details-panel');
const videoContainer = document.querySelector('#video-preview-container');
const videoPlayer = document.querySelector('#menu-video-player');

const openServicesMenu = () => {
  playSound('click');
  servicesMenu.classList.remove('pointer-events-none');
  document.querySelector('.cinematic-overlay').classList.add('active');

  gsap.to(servicesMenu, {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power4.out"
  });

  gsap.to(detailsPanel, {
    x: 0,
    duration: 0.8,
    delay: 0.2,
    ease: "power3.out"
  });
};

const closeServicesMenu = () => {
  playSound('click');
  servicesMenu.classList.add('pointer-events-none');
  document.querySelector('.cinematic-overlay').classList.remove('active');

  gsap.to(servicesMenu, {
    y: '100%',
    opacity: 0,
    duration: 0.7,
    ease: "power4.inOut"
  });

  gsap.to(detailsPanel, {
    x: '100%',
    duration: 0.7,
    ease: "power4.inOut"
  });
  
  gsap.to(videoContainer, {
    opacity: 0,
    duration: 0.3
  });
  videoPlayer.pause();
};

menuToggleServices.addEventListener('click', openServicesMenu);
closeServices.addEventListener('click', closeServicesMenu);

// Hover details mapping
const serviceItems = document.querySelectorAll('.service-menu-item');
const detailCategory = document.querySelector('#detail-category');
const detailTitle = document.querySelector('#detail-title');
const detailDesc = document.querySelector('#detail-desc');
const detailSpeed = document.querySelector('#detail-stat-speed');
const detailEngine = document.querySelector('#detail-stat-engine');

const serviceDetails = {
  brand: {
    category: "01 / BRAND campaigns",
    title: "Brand Cinema",
    desc: "Luxury visual assets for high-end fashion, automotive, fragrance, and premium hospitality. We mold campaign stories at speed without compromising creative aesthetics.",
    speed: "48-72 Hours turnaround",
    engine: "Midjourney style matrices + Stable Diffusion upscaler"
  },
  narrative: {
    category: "02 / ORIGINAL FICTION",
    title: "Narrative Shorts",
    desc: "Festival-grade, script-driven cinematic shorts developed entirely in-house. Utilizing custom Lora fine-tuning to preserve character consistency and scene layouts.",
    speed: "5-7 Production Days",
    engine: "Custom Character Loras + Runway Gen-3 + Human finishing"
  },
  music: {
    category: "03 / MUSIC & LABELS",
    title: "Music Videos",
    desc: "Conceptual, fast-tempo videos for major and indie labels. Sound-reactive visual triggers, strobe transitions, and organic WebGL style integrations.",
    speed: "3 Production Days",
    engine: "Sound-to-image API triggers + Adobe Premier Post-VFX"
  },
  ip: {
    category: "04 / UNIVERSE LICENSE",
    title: "Original IP & Worlds",
    desc: "Conceptual development, licensing, and financing of cinematic worlds. Building modular asset engines to maintain cohesive characters across series.",
    speed: "Varies per property",
    engine: "Custom model fine-tuning checkpoints + proprietary pipelines"
  }
};

serviceItems.forEach((item) => {
  item.addEventListener('mouseenter', () => {
    playSound('hover');
    const videoUrl = item.getAttribute('data-video');
    const soundType = item.getAttribute('data-sound');
    
    videoPlayer.src = videoUrl;
    videoPlayer.play();
    
    gsap.to(videoContainer, {
      opacity: 0.35,
      duration: 0.5
    });

    const details = serviceDetails[soundType];
    if (details) {
      gsap.to([detailCategory, detailTitle, detailDesc, detailSpeed, detailEngine], {
        opacity: 0,
        y: -10,
        duration: 0.2,
        stagger: 0.02,
        onComplete: () => {
          detailCategory.textContent = details.category;
          detailTitle.textContent = details.title;
          detailDesc.textContent = details.desc;
          detailSpeed.textContent = details.speed;
          detailEngine.textContent = details.engine;
          
          gsap.to([detailCategory, detailTitle, detailDesc, detailSpeed, detailEngine], {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.04,
            ease: "power2.out"
          });
        }
      });
    }
  });
});

// ==========================================
// PHASE 2: 3D WEBGL HERO CANVAS (Three.js)
// ==========================================

const canvas = document.querySelector('#webgl-canvas');
if (canvas) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 8;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    uniform float uTime;
    uniform vec2 uMouse;

    vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

    float snoise(vec3 v){
      const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
      const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 =   v - i + dot(i, C.xxx) ;

      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );

      vec3 x1 = x0 - i1 + 1.0 * C.xxx;
      vec3 x2 = x0 - i2 + 2.0 * C.xxx;
      vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

      i = mod(i, 289.0 );
      vec4 p = permute( permute( permute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

      float n_ = 0.142857142857;
      vec3  ns = n_ * D.wyz - D.xzx;

      vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );

      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);

      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );

      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));

      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);

      vec4 sig = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= sig.x;
      p1 *= sig.y;
      p2 *= sig.z;
      p3 *= sig.w;

      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                    dot(p2,x2), dot(p3,x3) ) );
    }

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vec3 pos = position;
      float noise = snoise(pos * 1.5 + uTime * 0.35);
      float distToMouse = distance(pos.xy, uMouse * 3.0);
      float mouseInfluence = smoothstep(2.5, 0.0, distToMouse);
      pos += normal * (noise * 0.12 + mouseInfluence * 0.18);
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    uniform float uTime;
    uniform vec3 uBaseColor;
    uniform vec3 uGoldColor;

    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);
      float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.5);
      float crackStrength = sin(vUv.x * 24.0 + uTime * 0.2) * cos(vUv.y * 18.0 - uTime * 0.15);
      crackStrength = smoothstep(0.72, 0.76, abs(crackStrength));
      vec3 finalColor = mix(uBaseColor, uGoldColor, crackStrength);
      finalColor = mix(finalColor, vec3(1.0), fresnel * 0.45);
      gl_FragColor = vec4(finalColor, 0.85);
    }
  `;

  const geometry = new THREE.TorusKnotGeometry(1.6, 0.5, 150, 24);
  const material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    transparent: true,
    uniforms: {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uBaseColor: { value: new THREE.Color('#16161D') },
      uGoldColor: { value: new THREE.Color('#D4AF37') }
    }
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const particleCount = 650;
  const particleGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 15;
    positions[i + 1] = (Math.random() - 0.5) * 15;
    positions[i + 2] = (Math.random() - 0.5) * 10;
  }

  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const createPointTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(212, 175, 55, 1)');
    grad.addColorStop(0.5, 'rgba(212, 175, 55, 0.35)');
    grad.addColorStop(1, 'rgba(212, 175, 55, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 16, 16);
    return new THREE.CanvasTexture(canvas);
  };

  const particleMaterial = new THREE.PointsMaterial({
    color: '#D4AF37',
    size: 0.12,
    map: createPointTexture(),
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffd700, 1.2);
  dirLight.position.set(5, 5, 5);
  scene.add(dirLight);

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  let mouse = new THREE.Vector2();
  let targetMouse = new THREE.Vector2();

  window.addEventListener('mousemove', (e) => {
    targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  let lastTime = performance.now();
  let frameCount = 0;
  const fpsDisplay = document.querySelector('#fps-counter');

  const updateFPS = () => {
    const time = performance.now();
    frameCount++;
    if (time > lastTime + 1000) {
      const fps = Math.round((frameCount * 1000) / (time - lastTime));
      if (fpsDisplay) fpsDisplay.textContent = fps;
      frameCount = 0;
      lastTime = time;
    }
  };

  const clock = new THREE.Clock();

  let heroActive = true;
  const tick = () => {
    if (!heroActive) return;
    const elapsedTime = clock.getElapsedTime();
    updateFPS();
    mouse.x += (targetMouse.x - mouse.x) * 0.08;
    mouse.y += (targetMouse.y - mouse.y) * 0.08;
    material.uniforms.uTime.value = elapsedTime;
    material.uniforms.uMouse.value.copy(mouse);
    mesh.rotation.y = elapsedTime * 0.05 + mouse.x * 0.25;
    mesh.rotation.x = elapsedTime * 0.03 + mouse.y * 0.25;
    particles.rotation.y = elapsedTime * 0.015;
    particles.rotation.x = elapsedTime * 0.008;
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  };

  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !heroActive) {
        heroActive = true;
        tick();
      } else if (!entry.isIntersecting) {
        heroActive = false;
      }
    });
  }, { threshold: 0.02 });
  heroObserver.observe(canvas);

  tick();

  gsap.to(camera.position, {
    z: 3.5,
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  gsap.to(mesh.rotation, {
    z: Math.PI * 0.5,
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  gsap.to(canvas, {
    opacity: 0,
    scrollTrigger: {
      trigger: '#about',
      start: 'top 80%',
      end: 'top 20%',
      scrub: true
    }
  });
}

// ==========================================
// PHASE 3: INTERACTIVE 3D MENDING BOWL
// ==========================================
const mendingCanvas = document.querySelector('#mending-canvas');
if (mendingCanvas) {
  const mendingScene = new THREE.Scene();
  
  const mendingCamera = new THREE.PerspectiveCamera(45, mendingCanvas.clientWidth / mendingCanvas.clientHeight, 0.1, 100);
  mendingCamera.position.set(0, 1.2, 4);
  mendingCamera.lookAt(0, 0, 0);

  const mendingRenderer = new THREE.WebGLRenderer({
    canvas: mendingCanvas,
    alpha: true,
    antialias: true
  });
  mendingRenderer.setSize(mendingCanvas.clientWidth, mendingCanvas.clientHeight);
  mendingRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const shardsGroup = new THREE.Group();
  mendingScene.add(shardsGroup);

  const shardOuterMaterial = new THREE.MeshPhysicalMaterial({
    color: '#16161D',
    roughness: 0.45,
    metalness: 0.1,
    clearcoat: 0.8,
    clearcoatRoughness: 0.2,
    side: THREE.FrontSide
  });

  const shardInnerMaterial = new THREE.MeshStandardMaterial({
    color: '#D4AF37',
    roughness: 0.15,
    metalness: 0.95,
    emissive: '#FFD700',
    emissiveIntensity: 0.65,
    side: THREE.BackSide
  });

  const createShardMesh = (phiStart, phiLength) => {
    const shardGroup = new THREE.Group();
    const geom = new THREE.SphereGeometry(1.2, 32, 16, phiStart, phiLength, 0, Math.PI / 2);
    const outerMesh = new THREE.Mesh(geom, shardOuterMaterial);
    const innerMesh = new THREE.Mesh(geom, shardInnerMaterial);
    innerMesh.scale.setScalar(0.98);
    shardGroup.add(outerMesh, innerMesh);
    return shardGroup;
  };

  const shard1 = createShardMesh(0, Math.PI / 2);
  const shard2 = createShardMesh(Math.PI / 2, Math.PI / 2);
  const shard3 = createShardMesh(Math.PI, Math.PI / 2);
  const shard4 = createShardMesh(3 * Math.PI / 2, Math.PI / 2);

  shardsGroup.add(shard1, shard2, shard3, shard4);

  const initialOffset = 0.65;
  shard1.position.set(initialOffset, 0, initialOffset);
  shard1.rotation.set(0.3, 0.2, 0.4);
  shard2.position.set(-initialOffset, 0, initialOffset);
  shard2.rotation.set(0.3, -0.2, -0.4);
  shard3.position.set(-initialOffset, 0, -initialOffset);
  shard3.rotation.set(-0.3, -0.2, 0.4);
  shard4.position.set(initialOffset, 0, -initialOffset);
  shard4.rotation.set(-0.3, 0.2, -0.4);

  const goldCoreGeometry = new THREE.SphereGeometry(0.35, 32, 32);
  const goldCoreMaterial = new THREE.MeshStandardMaterial({
    color: '#FFD700',
    emissive: '#D4AF37',
    emissiveIntensity: 1.5,
    roughness: 0.05,
    metalness: 0.95
  });
  const goldCore = new THREE.Mesh(goldCoreGeometry, goldCoreMaterial);
  mendingScene.add(goldCore);

  const ambient = new THREE.AmbientLight(0xffffff, 0.3);
  mendingScene.add(ambient);

  const spotLight = new THREE.SpotLight(0xffd700, 3, 10, Math.PI / 4, 0.5, 1);
  spotLight.position.set(2, 4, 3);
  mendingScene.add(spotLight);

  const mendingTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: '#about',
      start: 'top top',
      end: 'bottom+=120% top',
      scrub: 1,
      pin: true,
      anticipatePin: 1
    }
  });

  mendingTimeline.to(shard1.position, { x: 0, y: 0, z: 0, duration: 1 }, 0)
    .to(shard1.rotation, { x: 0, y: 0, z: 0, duration: 1 }, 0)
    .to(shard2.position, { x: 0, y: 0, z: 0, duration: 1 }, 0)
    .to(shard2.rotation, { x: 0, y: 0, z: 0, duration: 1 }, 0)
    .to(shard3.position, { x: 0, y: 0, z: 0, duration: 1 }, 0)
    .to(shard3.rotation, { x: 0, y: 0, z: 0, duration: 1 }, 0)
    .to(shard4.position, { x: 0, y: 0, z: 0, duration: 1 }, 0)
    .to(shard4.rotation, { x: 0, y: 0, z: 0, duration: 1 }, 0)
    .to(goldCoreMaterial, { emissiveIntensity: 3.5, duration: 1 }, 0)
    .to(goldCore.scale, { x: 1.3, y: 1.3, z: 1.3, duration: 1 }, 0);

  window.addEventListener('resize', () => {
    mendingCamera.aspect = mendingCanvas.clientWidth / mendingCanvas.clientHeight;
    mendingCamera.updateProjectionMatrix();
    mendingRenderer.setSize(mendingCanvas.clientWidth, mendingCanvas.clientHeight);
  });

  const mendingClock = new THREE.Clock();
  let mendingMouseX = 0;
  window.addEventListener('mousemove', (e) => {
    mendingMouseX = (e.clientX / window.innerWidth) - 0.5;
  });

  let mendingActive = true;
  const mendingTick = () => {
    if (!mendingActive) return;
    const elapsed = mendingClock.getElapsedTime();
    shardsGroup.rotation.y = elapsed * 0.15 + mendingMouseX * 0.45;
    goldCore.rotation.y = -elapsed * 0.25;
    mendingRenderer.render(mendingScene, mendingCamera);
    requestAnimationFrame(mendingTick);
  };

  const mendingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !mendingActive) {
        mendingActive = true;
        mendingTick();
      } else if (!entry.isIntersecting) {
        mendingActive = false;
      }
    });
  }, { threshold: 0.02 });
  mendingObserver.observe(mendingCanvas);

  mendingTick();
}

// ==========================================
// PHASE 4: HORIZONTAL SCROLLING & CURSOR PREVIEWS
// ==========================================
const workTrack = document.querySelector('#work-horizontal-track');
const workPin = document.querySelector('#work-pin-container');

if (workTrack && workPin) {
  gsap.to(workTrack, {
    x: () => -(workTrack.scrollWidth - window.innerWidth),
    ease: "none",
    scrollTrigger: {
      trigger: '#work-section',
      start: 'top top',
      end: () => `+=${workTrack.scrollWidth - window.innerWidth}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1
    }
  });
}

const previewFrame = document.querySelector('#portfolio-cursor-preview');
const previewVideo = document.querySelector('#cursor-video-player');
const cards = document.querySelectorAll('.portfolio-card');

let targetX = 0, targetY = 0;
let currentX = 0, currentY = 0;
let mouseSpeed = 0;
let lastMouseX = 0, lastMouseY = 0;

window.addEventListener('mousemove', (e) => {
  targetX = e.clientX;
  targetY = e.clientY;
  const dx = targetX - lastMouseX;
  const dy = targetY - lastMouseY;
  mouseSpeed = Math.sqrt(dx * dx + dy * dy);
  lastMouseX = targetX;
  lastMouseY = targetY;
});

const updatePreviewFrame = () => {
  currentX += (targetX - currentX) * 0.08;
  currentY += (targetY - currentY) * 0.08;
  const angle = Math.min(mouseSpeed * 0.18, 12);
  const scale = 1 + Math.min(mouseSpeed * 0.003, 0.15);
  previewFrame.style.left = `${currentX + 30}px`;
  previewFrame.style.top = `${currentY + 20}px`;
  previewFrame.style.transform = `translate(-50%, -50%) rotate(${angle}deg) scale(${scale})`;
  mouseSpeed *= 0.95;
  requestAnimationFrame(updatePreviewFrame);
};
requestAnimationFrame(updatePreviewFrame);

cards.forEach((card) => {
  card.addEventListener('mouseenter', () => {
    playSound('shutter');
    const videoUrl = card.getAttribute('data-video');
    previewVideo.src = videoUrl;
    previewVideo.play();
    gsap.to(previewFrame, { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" });
  });

  card.addEventListener('mouseleave', () => {
    gsap.to(previewFrame, {
      opacity: 0,
      scale: 0.75,
      duration: 0.3,
      ease: "power3.in",
      onComplete: () => { previewVideo.pause(); }
    });
  });

  card.addEventListener('click', () => {
    playSound('click');
    gsap.to(card, { scale: 0.98, duration: 0.1, yoyo: true, repeat: 1 });
  });
});

// ==========================================
// PHASE 5: WHAT WE MAKE — 3D GEOMETRY MORPH VIEWPORT
// ==========================================
const morphCanvas = document.querySelector('#morph-canvas');
if (morphCanvas) {
  const morphScene = new THREE.Scene();
  
  const morphCamera = new THREE.PerspectiveCamera(
    45,
    morphCanvas.clientWidth / morphCanvas.clientHeight,
    0.1,
    100
  );
  morphCamera.position.z = 5.5;

  const morphRenderer = new THREE.WebGLRenderer({
    canvas: morphCanvas,
    alpha: true,
    antialias: true
  });
  morphRenderer.setSize(morphCanvas.clientWidth, morphCanvas.clientHeight);
  morphRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Shared Materials & Groups
  const morphGroup = new THREE.Group();
  morphScene.add(morphGroup);

  const goldMat = new THREE.MeshStandardMaterial({
    color: '#D4AF37',
    roughness: 0.15,
    metalness: 0.9,
    emissive: '#FFD700',
    emissiveIntensity: 0.2
  });

  // 1. BRAND CINEMA: The Cinematic Lens (Glass & Gold)
  const lensGroup = new THREE.Group();
  
  const barrelGeom = new THREE.CylinderGeometry(0.55, 0.55, 0.9, 32);
  const barrelMat = new THREE.MeshStandardMaterial({
    color: '#0e0e12',
    roughness: 0.65,
    metalness: 0.85
  });
  const barrel = new THREE.Mesh(barrelGeom, barrelMat);
  barrel.rotation.x = Math.PI / 2;
  lensGroup.add(barrel);

  const goldRingGeom = new THREE.TorusGeometry(0.56, 0.02, 8, 32);
  const goldRing1 = new THREE.Mesh(goldRingGeom, goldMat);
  goldRing1.position.z = 0.25;
  goldRing1.rotation.x = Math.PI / 2;
  const goldRing2 = new THREE.Mesh(goldRingGeom, goldMat);
  goldRing2.position.z = -0.25;
  goldRing2.rotation.x = Math.PI / 2;
  lensGroup.add(goldRing1, goldRing2);

  const glassGeom = new THREE.SphereGeometry(0.54, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: '#ffffff',
    transmission: 0.92,
    roughness: 0.05,
    ior: 1.55,
    thickness: 0.35,
    clearcoat: 1.0,
    transparent: true,
    opacity: 1
  });
  const glass = new THREE.Mesh(glassGeom, glassMat);
  glass.position.z = 0.45;
  glass.rotation.x = Math.PI / 2;
  lensGroup.add(glass);

  const reflectorGeom = new THREE.CylinderGeometry(0.52, 0.52, 0.02, 32);
  const reflector = new THREE.Mesh(reflectorGeom, goldMat);
  reflector.position.z = 0.43;
  reflector.rotation.x = Math.PI / 2;
  lensGroup.add(reflector);
  
  morphGroup.add(lensGroup);

  // 2. NARRATIVE SHORTS: The Theatrical Mask / Porcelain Shard (Drama)
  const maskGroup = new THREE.Group();
  
  const shardOuterMat = new THREE.MeshPhysicalMaterial({
    color: '#16161D',
    roughness: 0.15,
    metalness: 0.1,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    side: THREE.FrontSide
  });

  const shardInnerMat = new THREE.MeshStandardMaterial({
    color: '#D4AF37',
    roughness: 0.15,
    metalness: 0.95,
    side: THREE.BackSide
  });

  const leftShardGroup = new THREE.Group();
  const leftGeom = new THREE.SphereGeometry(0.85, 32, 16, 0, Math.PI * 0.9, 0, Math.PI);
  const leftOuter = new THREE.Mesh(leftGeom, shardOuterMat);
  const leftInner = new THREE.Mesh(leftGeom, shardInnerMat);
  leftInner.scale.setScalar(0.98);
  leftShardGroup.add(leftOuter, leftInner);
  leftShardGroup.position.x = -0.05;
  leftShardGroup.rotation.y = 0.08;

  const rightShardGroup = new THREE.Group();
  const rightGeom = new THREE.SphereGeometry(0.85, 32, 16, Math.PI * 1.1, Math.PI * 0.9, 0, Math.PI);
  const rightOuter = new THREE.Mesh(rightGeom, shardOuterMat);
  const rightInner = new THREE.Mesh(rightGeom, shardInnerMat);
  rightInner.scale.setScalar(0.98);
  rightShardGroup.add(rightOuter, rightInner);
  rightShardGroup.position.x = 0.05;
  rightShardGroup.rotation.y = -0.08;

  const goldSutureGroup = new THREE.Group();
  for (let i = 0; i < 8; i++) {
    const t = i / 7;
    const y = (t - 0.5) * 1.4;
    const x = Math.sin(t * Math.PI * 4.0) * 0.035;
    const beadGeom = new THREE.SphereGeometry(0.03, 8, 8);
    const bead = new THREE.Mesh(beadGeom, goldMat);
    bead.position.set(x, y, 0.65 * Math.sqrt(Math.max(0, 1.0 - (y/0.85)*(y/0.85))));
    goldSutureGroup.add(bead);
  }

  maskGroup.add(leftShardGroup, rightShardGroup, goldSutureGroup);
  maskGroup.visible = false;
  maskGroup.scale.setScalar(0.001);
  morphGroup.add(maskGroup);

  // 3. MUSIC VIDEOS: The Audio-Reactive Vinyl/Sound Disk (Rhythm)
  const musicGroup = new THREE.Group();
  
  const diskGeom = new THREE.CylinderGeometry(0.9, 0.9, 0.04, 64);
  const diskMat = new THREE.MeshStandardMaterial({
    color: '#0a0a0d',
    roughness: 0.3,
    metalness: 0.95
  });
  const disk = new THREE.Mesh(diskGeom, diskMat);
  disk.rotation.x = Math.PI / 5;
  musicGroup.add(disk);

  const centerSpindle = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.05, 32), goldMat);
  centerSpindle.position.y = 0.01;
  disk.add(centerSpindle);

  for (let r = 0.35; r <= 0.8; r += 0.15) {
    const grooveGeom = new THREE.TorusGeometry(r, 0.008, 8, 64);
    const groove = new THREE.Mesh(grooveGeom, goldMat);
    groove.rotation.x = Math.PI / 2;
    groove.position.y = 0.015;
    disk.add(groove);
  }

  // Sound particles
  const soundParticleCount = 180;
  const soundParticleGeometry = new THREE.BufferGeometry();
  const soundParticlePositions = new Float32Array(soundParticleCount * 3);
  const soundParticleVelocities = [];

  for (let i = 0; i < soundParticleCount; i++) {
    soundParticlePositions[i * 3] = 0;
    soundParticlePositions[i * 3 + 1] = 0.02;
    soundParticlePositions[i * 3 + 2] = 0;
    
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.012 + Math.random() * 0.02;
    soundParticleVelocities.push({
      x: Math.cos(angle) * speed,
      z: Math.sin(angle) * speed,
      y: (Math.random() - 0.2) * 0.01,
      life: Math.random(),
      maxLife: 1.0
    });
  }

  soundParticleGeometry.setAttribute('position', new THREE.BufferAttribute(soundParticlePositions, 3));
  const soundPointsMat = new THREE.PointsMaterial({
    color: '#FFD700',
    size: 0.05,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending
  });
  const soundPoints = new THREE.Points(soundParticleGeometry, soundPointsMat);
  disk.add(soundPoints);

  musicGroup.visible = false;
  musicGroup.scale.setScalar(0.001);
  morphGroup.add(musicGroup);

  // 4. ORIGINAL IP: The Kintsugi Planet / Globe (Worldbuilding)
  const planetGroup = new THREE.Group();

  const coreGeom = new THREE.SphereGeometry(0.65, 32, 32);
  const coreMat = new THREE.MeshStandardMaterial({
    color: '#0c0c10',
    roughness: 0.55,
    metalness: 0.85
  });
  const planetCore = new THREE.Mesh(coreGeom, coreMat);
  planetGroup.add(planetCore);

  const goldWrapGroup = new THREE.Group();
  for (let i = 0; i < 5; i++) {
    const bandGeom = new THREE.TorusGeometry(0.66, 0.022, 8, 32, Math.PI * 0.7);
    const band = new THREE.Mesh(bandGeom, goldMat);
    band.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    goldWrapGroup.add(band);
  }
  planetGroup.add(goldWrapGroup);

  const ringGeom = new THREE.RingGeometry(0.85, 1.15, 64);
  const ringMat = new THREE.MeshStandardMaterial({
    color: '#D4AF37',
    transparent: true,
    opacity: 0.5,
    side: THREE.DoubleSide,
    roughness: 0.2,
    metalness: 0.95
  });
  const planetRing = new THREE.Mesh(ringGeom, ringMat);
  planetRing.rotation.x = Math.PI / 2.3;
  planetGroup.add(planetRing);

  planetGroup.visible = false;
  planetGroup.scale.setScalar(0.001);
  morphGroup.add(planetGroup);

  // Add lighting
  const ambient = new THREE.AmbientLight(0xffffff, 0.3);
  morphScene.add(ambient);

  const dirLight1 = new THREE.DirectionalLight('#D4AF37', 2.5);
  dirLight1.position.set(5, 5, 5);
  morphScene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight('#403075', 1.8);
  dirLight2.position.set(-5, -5, -2);
  morphScene.add(dirLight2);

  // Resize handler
  window.addEventListener('resize', () => {
    morphCamera.aspect = morphCanvas.clientWidth / morphCanvas.clientHeight;
    morphCamera.updateProjectionMatrix();
    morphRenderer.setSize(morphCanvas.clientWidth, morphCanvas.clientHeight);
  });

  // Selector mappings & soundscape controller
  const playStudioSoundscape = (type) => {
    try {
      initAudio();
      if (!audioCtx) return;
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();
      
      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      if (type === 'brand') {
        osc.type = 'sawtooth';
        filter.type = 'lowpass';
        osc.frequency.setValueAtTime(65, audioCtx.currentTime);
        filter.frequency.setValueAtTime(80, audioCtx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(320, audioCtx.currentTime + 1.2);
        gainNode.gain.setValueAtTime(0.001, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.02, audioCtx.currentTime + 0.3);
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 1.4);
        osc.start();
        osc.stop(audioCtx.currentTime + 1.4);
      } else if (type === 'narrative') {
        osc.type = 'triangle';
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(100, audioCtx.currentTime);
        osc.frequency.setValueAtTime(55, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.001, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.06, audioCtx.currentTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.35);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.8);
        
        setTimeout(() => {
          const osc2 = audioCtx.createOscillator();
          const gain2 = audioCtx.createGain();
          osc2.connect(gain2);
          gain2.connect(audioCtx.destination);
          osc2.type = 'triangle';
          osc2.frequency.setValueAtTime(50, audioCtx.currentTime);
          gain2.gain.setValueAtTime(0.06, audioCtx.currentTime);
          gain2.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.35);
          osc2.start();
          osc2.stop(audioCtx.currentTime + 0.35);
        }, 250);
      } else if (type === 'music') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.08);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.08);
        
        for (let i = 1; i <= 3; i++) {
          setTimeout(() => {
            const oscE = audioCtx.createOscillator();
            const gainE = audioCtx.createGain();
            oscE.connect(gainE);
            gainE.connect(audioCtx.destination);
            oscE.type = 'sine';
            oscE.frequency.setValueAtTime(880 - (i * 100), audioCtx.currentTime);
            gainE.gain.setValueAtTime(0.006 / i, audioCtx.currentTime);
            gainE.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.06);
            oscE.start();
            oscE.stop(audioCtx.currentTime + 0.06);
          }, i * 120);
        }
      } else if (type === 'ip') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(110, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.001, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.015, audioCtx.currentTime + 0.4);
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 1.5);
        osc.start();
        osc.stop(audioCtx.currentTime + 1.5);
        
        const oscH = audioCtx.createOscillator();
        const gainH = audioCtx.createGain();
        oscH.connect(gainH);
        gainH.connect(audioCtx.destination);
        oscH.type = 'sine';
        oscH.frequency.setValueAtTime(165, audioCtx.currentTime);
        gainH.gain.setValueAtTime(0.001, audioCtx.currentTime);
        gainH.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
        gainH.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 1.5);
        oscH.start();
        oscH.stop(audioCtx.currentTime + 1.5);
      }
    } catch (error) {
      console.warn('Audio sweep error:', error);
    }
  };

  const selectors = document.querySelectorAll('.service-item-selector');
  const specSheet = document.querySelector('#services-spec-sheet');
  const specCamera = document.querySelector('#spec-camera');
  const specRatio = document.querySelector('#spec-ratio');
  const specVfx = document.querySelector('#spec-vfx');
  const specDelivery = document.querySelector('#spec-delivery');
  
  const studioSpecs = {
    brand: {
      camera: "ARRI Alexa 35 + Cooke Anamorphic",
      ratio: "2.39:1 Cinema Wide",
      vfx: "Gold-Seam Upscaler & Color Grading",
      delivery: "Apple ProRes 4444 XQ / Rec. 2020"
    },
    narrative: {
      camera: "RED V-Raptor 8K + Atlas Orion",
      ratio: "2.00:1 Univisium",
      vfx: "Custom Actor LoRA & Face Restore",
      delivery: "OpenEXR ACES Linear"
    },
    music: {
      camera: "Sony Venice 2 + Kowa Anamorphic",
      ratio: "1.85:1 Academy Flat",
      vfx: "Sound-to-VFX Strobe & Particles",
      delivery: "H.264 Master 120 FPS"
    },
    ip: {
      camera: "Virtual Unreal Engine Camera Rig",
      ratio: "Custom Multi-Format Wide",
      vfx: "Modular Character Asset Engine",
      delivery: "Stereoscopic Cinematic Masters"
    }
  };

  let currentActiveMesh = lensGroup;

  const transitionToMesh = (targetGroup) => {
    if (currentActiveMesh === targetGroup) return;
    
    const prevMesh = currentActiveMesh;
    currentActiveMesh = targetGroup;
    
    // Scale out previous
    gsap.to(prevMesh.scale, {
      x: 0.001,
      y: 0.001,
      z: 0.001,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => {
        prevMesh.visible = false;
      }
    });
    
    // Scale in target
    targetGroup.visible = true;
    targetGroup.scale.set(0.001, 0.001, 0.001);
    gsap.to(targetGroup.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 0.75,
      ease: "elastic.out(1.0, 0.65)"
    });
  };

  selectors.forEach((sel) => {
    sel.addEventListener('mouseenter', () => {
      const type = sel.getAttribute('data-morph');
      
      // Update typography highlights (Active states)
      selectors.forEach(s => s.querySelector('h4').style.color = 'rgba(255, 255, 255, 0.45)');
      sel.querySelector('h4').style.color = '#D4AF37';

      // Switch 3D mesh
      let targetMesh;
      if (type === 'brand') targetMesh = lensGroup;
      else if (type === 'narrative') targetMesh = maskGroup;
      else if (type === 'music') targetMesh = musicGroup;
      else if (type === 'ip') targetMesh = planetGroup;

      transitionToMesh(targetMesh);

      // Play audio sweep
      playStudioSoundscape(type);

      // Update Spec Sheet
      const specs = studioSpecs[type];
      if (specs && specSheet) {
        gsap.to([specCamera, specRatio, specVfx, specDelivery], {
          opacity: 0,
          y: 4,
          duration: 0.15,
          stagger: 0.02,
          onComplete: () => {
            specCamera.textContent = specs.camera;
            specRatio.textContent = specs.ratio;
            specVfx.textContent = specs.vfx;
            specDelivery.textContent = specs.delivery;
            
            gsap.to([specCamera, specRatio, specVfx, specDelivery], {
              opacity: 1,
              y: 0,
              duration: 0.3,
              stagger: 0.03,
              ease: "power2.out"
            });
          }
        });
        
        gsap.to(specSheet, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power3.out"
        });
      }
    });
  });

  // Local render loop with IntersectionObserver
  const morphClock = new THREE.Clock();
  let morphMouseX = 0;
  let morphActive = true;
  
  window.addEventListener('mousemove', (e) => {
    morphMouseX = (e.clientX / window.innerWidth) - 0.5;
  });

  const morphTick = () => {
    if (!morphActive) return;
    const elapsed = morphClock.getElapsedTime();

    // Constant rotations for different active meshes
    if (lensGroup.visible) {
      lensGroup.rotation.y = elapsed * 0.2 + morphMouseX * 0.45;
      lensGroup.rotation.x = Math.PI * 0.05 + Math.sin(elapsed * 0.5) * 0.06;
    }
    
    if (maskGroup.visible) {
      maskGroup.rotation.y = elapsed * 0.15 + morphMouseX * 0.5;
      maskGroup.rotation.x = Math.sin(elapsed * 0.3) * 0.04;
    }
    
    if (musicGroup.visible) {
      musicGroup.rotation.y = elapsed * 0.35 + morphMouseX * 0.3;
      // Vibrating scale
      disk.scale.set(1, 1 + Math.sin(elapsed * 45.0) * 0.05, 1);
      
      // Update particles
      const positions = soundParticleGeometry.attributes.position.array;
      for (let i = 0; i < soundParticleCount; i++) {
        const vel = soundParticleVelocities[i];
        positions[i * 3] += vel.x;
        positions[i * 3 + 1] += vel.y;
        positions[i * 3 + 2] += vel.z;
        vel.life += 0.015;
        
        if (vel.life >= vel.maxLife) {
          positions[i * 3] = 0;
          positions[i * 3 + 1] = 0.02;
          positions[i * 3 + 2] = 0;
          vel.life = 0;
        }
      }
      soundParticleGeometry.attributes.position.needsUpdate = true;
    }
    
    if (planetGroup.visible) {
      planetGroup.rotation.y = elapsed * 0.22 + morphMouseX * 0.4;
      goldWrapGroup.rotation.y = elapsed * 0.06;
      planetRing.rotation.z = elapsed * 0.08;
    }

    morphRenderer.render(morphScene, morphCamera);
    requestAnimationFrame(morphTick);
  };

  const morphObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !morphActive) {
        morphActive = true;
        morphTick();
      } else if (!entry.isIntersecting) {
        morphActive = false;
      }
    });
  }, { threshold: 0.02 });
  morphObserver.observe(morphCanvas);

  morphTick();
}

// Timeline Draw line
const drawLine = document.querySelector('#timeline-draw-line');
const steps = document.querySelectorAll('.timeline-step');

if (drawLine && steps.length > 0) {
  gsap.to(drawLine, {
    scaleY: 1,
    ease: "none",
    scrollTrigger: {
      trigger: '#workflow-container',
      start: 'top 50%',
      end: 'bottom 60%',
      scrub: true
    }
  });

  steps.forEach((step) => {
    const node = step.querySelector('.step-node');
    ScrollTrigger.create({
      trigger: step,
      start: 'top 65%',
      end: 'bottom 45%',
      onEnter: () => {
        playSound('tick');
        step.classList.remove('opacity-30');
        step.classList.add('opacity-100');
        if (node) {
          node.style.borderColor = '#D4AF37';
          node.style.backgroundColor = '#D4AF37';
        }
      },
      onLeaveBack: () => {
        step.classList.remove('opacity-100');
        step.classList.add('opacity-30');
        if (node) {
          node.style.borderColor = 'rgba(255, 255, 255, 0.2)';
          node.style.backgroundColor = '#0D0D11';
        }
      }
    });
  });
}

// ==========================================
// PHASE 6: HIGH-CONVERSION BRIEFING FORM
// ==========================================
const formPills = document.querySelectorAll('.form-pill');
let selectedCategory = '';

formPills.forEach((pill) => {
  pill.addEventListener('click', () => {
    playSound('shutter');
    formPills.forEach(p => {
      p.style.borderColor = 'rgba(255, 255, 255, 0.1)';
      p.style.backgroundColor = 'transparent';
    });
    pill.style.borderColor = '#D4AF37';
    pill.style.backgroundColor = 'rgba(212, 175, 55, 0.08)';
    selectedCategory = pill.getAttribute('data-cat');
  });
});

const budgetSlider = document.querySelector('#form-budget-slider');
const budgetDisplay = document.querySelector('#budget-counter-display');
const budgetTiers = {
  1: "$10,000 - $30,000",
  2: "$30,000 - $75,000",
  3: "$75,000 - $150,000",
  4: "$150,000+ (Enterprise Worldbuilding)"
};

if (budgetSlider && budgetDisplay) {
  budgetSlider.addEventListener('input', (e) => {
    playSound('tick');
    const val = e.target.value;
    budgetDisplay.textContent = budgetTiers[val];
  });
}

const form = document.querySelector('#kintsugi-brief-form');
const formContainer = document.querySelector('#brief-form-container');

if (form && formContainer) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    playSound('click');

    formContainer.innerHTML = `
      <div class="py-20 flex flex-col justify-center items-center space-y-6 text-center select-none" id="form-success-panel">
        <div class="w-16 h-16 rounded-full border-t-2 border-r-2 border-gold-metallic animate-spin" id="success-ring"></div>
        <p class="text-xs font-sans tracking-widest text-gold-metallic uppercase animate-pulse">
          MENDING YOUR BRIEF IN GOLD...
        </p>
      </div>
    `;

    setTimeout(() => {
      formContainer.innerHTML = `
        <div class="py-12 flex flex-col justify-center items-center space-y-6 text-center max-w-md mx-auto" id="success-prompt">
          <svg class="w-16 h-16 text-gold-metallic" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
          </svg>
          <div class="space-y-2">
            <h3 class="text-2xl font-display font-bold text-white uppercase tracking-tight">Brief Received</h3>
            <p class="text-xs text-muted-silver font-sans leading-relaxed">
              We have received your parameters. A creative director from whichever studio is awake (New Delhi, New York or Tokyo) will respond within 48 hours.
            </p>
          </div>
          <button onclick="window.location.reload();" class="text-xs text-gold-metallic hover:text-white transition-colors uppercase tracking-widest font-sans font-bold border-b border-gold-metallic/30 pb-0.5 mt-2">
            Send another brief
          </button>
        </div>
      `;
      playSound('shutter');
      
      gsap.from('#success-prompt', {
        scale: 0.95,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });
    }, 2200);
  });
}

// ==========================================
// GSAP ENTRANCE ANIMATIONS (Hero Section)
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
  gsap.to('.hero-word', {
    y: 0,
    opacity: 1,
    duration: 1.4,
    stagger: 0.12,
    ease: "power4.out",
    delay: 0.5
  });

  gsap.to('#hero-subtitle', {
    y: 0,
    opacity: 1,
    duration: 1.2,
    delay: 1.1,
    ease: "power3.out"
  });

  gsap.to('#hero-tag', {
    y: 0,
    opacity: 0.8,
    duration: 1.2,
    delay: 0.3,
    ease: "power3.out"
  });

  gsap.to('#hero-actions', {
    y: 0,
    opacity: 1,
    duration: 1.2,
    delay: 1.3,
    ease: "power3.out"
  });

  gsap.from('header', {
    y: -80,
    opacity: 0,
    duration: 1.4,
    ease: "power4.out"
  });
});
