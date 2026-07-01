import confetti from "canvas-confetti";

export function doomsdayDefeat()
{
  const dustColors = ["#5c3b1e", "#7a4a2a", "#3e2a1f", "#a06b3c", "#2b1a12"];
  const redColors = ["#8b0000", "#b30000", "#ff1a1a", "#5a0000"];

  const duration = 5600;
  const end = Date.now() + duration;

  const shake = () => {
    const intensity = 7;
    const x = (Math.random() - 0.5) * intensity;
    const y = (Math.random() - 0.5) * intensity;

    document.body.style.transform = `translate(${x}px, ${y}px)`;

    setTimeout(() => {
      document.body.style.transform = "";
    }, 65);
  };

  // MAIN DUST FALL (base layer)
  (function dustRain() {
    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 90,
        spread: 200,
        startVelocity: 7,
        gravity: 1.5,
        ticks: 620,
        origin: {
          x: Math.random(),
          y: -0.05,
        },
        colors: dustColors,
        scalar: 1.25,
        shapes: ["circle"],
        drift: (Math.random() - 0.5) * 3.8,
        decay: 0.92,
      });

      // more frequent red bleed into dust
      if (Math.random() > 0.82) {
        confetti({
          particleCount: 10,
          spread: 35,
          startVelocity: 26,
          gravity: 1.0,
          ticks: 140,
          origin: {
            x: Math.random(),
            y: Math.random() * 0.6,
          },
          colors: redColors,
          scalar: 0.95,
          shapes: ["circle"],
        });

        shake();
      }

      // occasional mixed “blood-dust crumble”
      if (Math.random() > 0.9) {
        confetti({
          particleCount: 12,
          spread: 30,
          startVelocity: 22,
          gravity: 1.1,
          ticks: 150,
          origin: {
            x: Math.random(),
            y: Math.random() * 0.5,
          },
          colors: [...dustColors, ...redColors],
          scalar: 0.9,
          shapes: ["square", "circle"],
        });
      }

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  })();

  // EDGE COLLAPSE — stronger red presence
  (function collapse() {
    let last = Date.now();

    const loop = () => {
      const now = Date.now();

      if (now - last > 650) {
        const burst = (x) => {
          confetti({
            particleCount: 18,
            spread: 70,
            startVelocity: 24,
            gravity: 1.3,
            ticks: 200,
            origin: { x, y: 1 },
            colors: [...dustColors, ...redColors],
            scalar: 1.05,
            shapes: ["square", "circle"],
            drift: (Math.random() - 0.5) * 3,
          });
        };

        burst(0.05);
        burst(0.95);

        // more frequent red “impact pulses”
        if (Math.random() > 0.7) {
          confetti({
            particleCount: 18,
            spread: 25,
            startVelocity: 34,
            gravity: 0.9,
            ticks: 110,
            origin: { x: 0.5, y: 0.5 },
            colors: redColors,
            scalar: 0.9,
          });

          shake();
        }

        if (Math.random() > 0.8) {
          confetti({
            particleCount: 20,
            spread: 18,
            startVelocity: 28,
            gravity: 0.8,
            ticks: 100,
            origin: { x: 0.5, y: 0.5 },
            colors: dustColors,
            scalar: 0.85,
          });
        }

        last = now;
      }

      if (now < end) {
        requestAnimationFrame(loop);
      }
    };

    loop();
  })();

  // FINAL COLLAPSE — heavier red dominance
  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 360,
      startVelocity: 52,
      gravity: 1.6,
      ticks: 110,
      origin: { x: 0.5, y: 0.5 },
      colors: [...dustColors, ...redColors],
      scalar: 1.5,
    });
  }, 5200);
}