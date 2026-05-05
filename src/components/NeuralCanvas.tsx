import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
  phase: number;
  color: string;
}

const NODE_COLORS = [
  'rgba(192, 132, 252, 0.8)',
  'rgba(167, 139, 250, 0.8)',
  'rgba(99, 102, 241, 0.8)',
  'rgba(56, 189, 248, 0.7)',
  'rgba(129, 140, 248, 0.7)',
];

export function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let nodes: Node[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const initNodes = () => {
      nodes = Array.from({ length: 40 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        radius: 2 + Math.random() * 2,
        phase: Math.random() * Math.PI * 2,
        color: NODE_COLORS[Math.floor(Math.random() * NODE_COLORS.length)],
      }));
    };

    const draw = (time: number) => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach((node) => {
        if (!prefersReducedMotion) {
          node.x += node.dx;
          node.y += node.dy;
          if (node.x < 0 || node.x > canvas.width) node.dx *= -1;
          if (node.y < 0 || node.y > canvas.height) node.dy *= -1;
        }

        // Draw edges to nearby nodes
        nodes.forEach((other) => {
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150 && dist > 0) {
            const alpha = (1 - dist / 150) * 0.35;
            const gradient = ctx.createLinearGradient(node.x, node.y, other.x, other.y);
            gradient.addColorStop(0, `rgba(168, 85, 247, ${alpha})`);
            gradient.addColorStop(1, `rgba(56, 189, 248, ${alpha})`);
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });

        // Draw node with pulse
        const pulse = prefersReducedMotion ? 0 : Math.sin(time * 0.001 + node.phase) * 1.5;
        const r = node.radius + pulse;

        const grd = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 3);
        grd.addColorStop(0, node.color);
        grd.addColorStop(1, 'rgba(168, 85, 247, 0)');

        ctx.beginPath();
        ctx.arc(node.x, node.y, r * 3, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    initNodes();

    if (prefersReducedMotion) {
      draw(0);
    } else {
      animationId = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(() => {
      resize();
      initNodes();
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animationId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
