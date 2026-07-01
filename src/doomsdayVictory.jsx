import confetti from "canvas-confetti";

export function doomsdayVictory() {
  const mainColors = ["#00ff88", "#00c2ff", "#b56bff", "#00ffd5"];
  const goldColors = ["#ffd700", "#ffcc33", "#ffb300"];

  const duration = 4500;
  const end = Date.now() + duration;

  // MAIN RAIN (green/blue/purple)
  (function rain() {
    const frame = () => {
      confetti({
        particleCount: 6,
        angle: 90 + (Math.random() * 10 - 5), // slight wobble
        spread: 180,
        startVelocity: 18,
        gravity: 0.85,
        ticks: 350,
        origin: {
          x: Math.random(),
          y: 0,
        },
        colors: mainColors,
        scalar: 0.9,
        shapes: ["circle"],
        drift: (Math.random() - 0.5) * 1.2,
        decay: 0.92,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  })();

  // GOLD BURSTS (bottom-left & bottom-right)
  const burst = (x) => {
    confetti({
      particleCount: 18,
      spread: 70,
      startVelocity: 25,
      gravity: 0.7,
      ticks: 200,
      origin: {
        x,
        y: 1,
      },
      colors: goldColors,
      scalar: 0.85,
      shapes: ["star", "circle"],
    });
  };

  // repeat golden bursts periodically
  (function goldLoop() {
    let last = Date.now();

    const loop = () => {
      const now = Date.now();

      if (now - last > 600) {
        burst(0.05); // bottom-left
        burst(0.95); // bottom-right
        last = now;
      }

      if (now < end) {
        requestAnimationFrame(loop);
      }
    };

    loop();
  })();
}