/* ==========================================================================
   Scales & Stones — Slow Midnight Water Ripple Effect
   Heavy, viscous, slow-motion dark water with pale parchment moonlight glints
   ========================================================================== */

class SlowMidnightWater {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.simWidth = 240;
    this.simHeight = 160;
    this.canvas.width = this.simWidth;
    this.canvas.height = this.simHeight;

    const size = this.simWidth * this.simHeight;
    this.bufA = new Float32Array(size);
    this.bufB = new Float32Array(size);
    this.displayBuf = new Float32Array(size);

    this.imageData = this.ctx.createImageData(this.simWidth, this.simHeight);
    this.pixels = this.imageData.data;

    // Deep ink-black base (#050707 to #0B1111 in center)
    this.baseColors = this.createBaseWater();

    // High viscosity + fractional time-stepping so ripples travel ~4x slower
    this.damping = 0.988;
    this.stepCounter = 0;
    this.stepInterval = 3; // Only advance wave physics every 3rd frame, interpolate in between
    this.time = 0;

    this.lastX = -1;
    this.lastY = -1;
    this.ambientCounter = 0;

    this.bindEvents();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  createBaseWater() {
    const colors = new Uint8Array(this.simWidth * this.simHeight * 3);
    for (let y = 0; y < this.simHeight; y++) {
      for (let x = 0; x < this.simWidth; x++) {
        const i = (y * this.simWidth + x) * 3;
        const cx = x / this.simWidth - 0.5;
        const cy = y / this.simHeight - 0.5;
        const dist = Math.sqrt(cx * cx + cy * cy);
        const vignette = Math.max(0, 1 - dist * 1.5);

        colors[i]     = Math.floor(5 + vignette * 4);  // R
        colors[i + 1] = Math.floor(7 + vignette * 7);  // G
        colors[i + 2] = Math.floor(7 + vignette * 7);  // B
      }
    }
    return colors;
  }

  bindEvents() {
    let lastDropTime = 0;
    const handleMove = (clientX, clientY) => {
      const now = performance.now();
      if (now - lastDropTime < 55) return; // Throttle drops for calm, slow trails

      const x = (clientX / window.innerWidth) * this.simWidth;
      const y = (clientY / window.innerHeight) * this.simHeight;

      if (this.lastX >= 0) {
        const dx = x - this.lastX;
        const dy = y - this.lastY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 0.8) {
          this.addDrop(x, y, 5, Math.min(dist * 7, 48));
          lastDropTime = now;
        }
      }
      this.lastX = x;
      this.lastY = y;
    };

    window.addEventListener('mousemove', (e) => handleMove(e.clientX, e.clientY));
    window.addEventListener('touchmove', (e) => {
      if (e.touches[0]) handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    window.addEventListener('click', (e) => {
      const x = (e.clientX / window.innerWidth) * this.simWidth;
      const y = (e.clientY / window.innerHeight) * this.simHeight;
      this.addDrop(x, y, 9, 85);
    });
  }

  addDrop(x, y, radius, strength) {
    const r = Math.floor(radius);
    const bx = Math.floor(x);
    const by = Math.floor(y);

    for (let dy = -r; dy <= r; dy++) {
      for (let dx = -r; dx <= r; dx++) {
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < r) {
          const px = bx + dx;
          const py = by + dy;
          if (px > 1 && px < this.simWidth - 2 && py > 1 && py < this.simHeight - 2) {
            // Smooth cosine bell curve for wide, gentle swells
            const falloff = (Math.cos((dist / r) * Math.PI) + 1) * 0.5;
            this.bufA[py * this.simWidth + px] += strength * falloff;
          }
        }
      }
    }
  }

  stepPhysics() {
    const w = this.simWidth;
    const h = this.simHeight;
    const a = this.bufA;
    const b = this.bufB;
    const damp = this.damping;

    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const i = y * w + x;
        b[i] = ((a[i - 1] + a[i + 1] + a[i - w] + a[i + w]) * 0.5 - b[i]) * damp;
      }
    }

    this.bufA = b;
    this.bufB = a;
  }

  render() {
    const w = this.simWidth;
    const h = this.simHeight;
    const cur = this.bufA;
    const prev = this.bufB;
    const disp = this.displayBuf;
    const pix = this.pixels;
    const base = this.baseColors;

    // Smooth blend factor between physics steps for ultra-slow silkiness
    const alpha = (this.stepCounter % this.stepInterval) / this.stepInterval;

    for (let i = 0; i < w * h; i++) {
      disp[i] = prev[i] * (1 - alpha) + cur[i] * alpha;
    }

    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const i = y * w + x;
        const pi = i * 4;
        const bi = i * 3;

        // Slow, breathing underlying swell
        const swell =
          Math.sin(x * 0.05 + this.time * 0.008) *
          Math.cos(y * 0.05 - this.time * 0.006) * 2.5;

        const gradX = (disp[i - 1] - disp[i + 1]) + swell * 0.25;
        const gradY = (disp[i - w] - disp[i + w]) + swell * 0.25;

        const light = gradX * 0.28 + gradY * 0.22;
        const spec = Math.pow(Math.min(1, Math.abs(light) * 0.014), 2.4) * 55;

        // Warm parchment/moonlight specular glints on ink-dark water
        pix[pi]     = Math.max(0, Math.min(255, base[bi]     + light * 0.35 + spec * 0.95));
        pix[pi + 1] = Math.max(0, Math.min(255, base[bi + 1] + light * 0.42 + spec * 0.92));
        pix[pi + 2] = Math.max(0, Math.min(255, base[bi + 2] + light * 0.40 + spec * 0.82));
        pix[pi + 3] = 255;
      }
    }

    this.ctx.putImageData(this.imageData, 0, 0);
  }

  animate() {
    this.time++;
    this.stepCounter++;

    if (this.stepCounter % this.stepInterval === 0) {
      this.stepPhysics();
    }

    // Very rare, slow ambient drop every ~4.5 seconds
    this.ambientCounter++;
    if (this.ambientCounter > 270) {
      this.ambientCounter = 0;
      const rx = 30 + Math.random() * (this.simWidth - 60);
      const ry = 30 + Math.random() * (this.simHeight - 60);
      this.addDrop(rx, ry, 7, 32);
    }

    this.render();
    requestAnimationFrame(this.animate);
  }

  splash(x, y) {
    const sx = (x / window.innerWidth) * this.simWidth;
    const sy = (y / window.innerHeight) * this.simHeight;
    this.addDrop(sx, sy, 14, 130);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('ripple-canvas');
  if (canvas) {
    window.waterRipple = new SlowMidnightWater(canvas);
  }
});
