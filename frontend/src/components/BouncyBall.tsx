// src/components/BouncyBall.tsx

import { useTick } from "@pixi/react";
import { Graphics } from "pixi.js";
import { useEffect, useRef, useState } from "react";

export const BouncyBall = ({
  isRunning,
  containerRef,
}: {
  isRunning: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
}) => {
  const ballRef = useRef<Graphics | null>(null);
  const [positionY, setPositionY] = useState(200);
  const velocity = useRef(0);
  const gravity = 0.1;
  const bounce = 0.99;
  const wasOutOfScreen = useRef(false);
  const [canvasHeight, setCanvasHeight] = useState(window.innerHeight);
  const [canvasWidth, setCanvasWidth] = useState(window.innerWidth);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setCanvasWidth(containerRef.current.clientWidth);
        setCanvasHeight(containerRef.current.clientHeight);
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [containerRef]);

  const floorY = canvasHeight - 20;

  useTick(() => {
    if (!isRunning) return;

    velocity.current += gravity;
    let newY = positionY + velocity.current;

    if (newY < 0 || newY > canvasHeight) {
      wasOutOfScreen.current = true;
    }

    if (newY > floorY) {
      newY = floorY;
      velocity.current = -velocity.current * bounce;
      if (!wasOutOfScreen.current && Math.random() < 0.05) {
        velocity.current *= 1.2 + Math.random() * 0.5;
      }
      wasOutOfScreen.current = false;
    }

    setPositionY(newY);
    if (ballRef.current) {
      ballRef.current.y = newY;
    }
  });

  return (
    <pixiGraphics
      ref={ballRef}
      x={canvasWidth / 2}
      y={positionY}
      draw={(g) => {
        g.clear();
        g.beginFill(0xcccccc);
        g.drawCircle(0, 0, 10);
        g.endFill();
      }}
    />
  );
};
