"use client";

import { useEffect, useState } from 'react';

interface StarryIntroProps {
  onFinished: () => void;
  duration?: number; // in milliseconds
  numStars?: number;
}

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  animationDelay: string;
  animationDuration: string;
}

interface AsteroidState {
  id: string;
  visible: boolean;
  startX: number; 
  startY: number; 
  targetX: number; 
  targetY: number; 
  currentX: number; 
  currentY: number; 
  size: number; 
  rotation: number; 
  travelDuration: number; 
}

interface ExplosionState {
  visible: boolean;
  x: number;
  y: number;
  size: number;
  opacity: number;
}

export function StarryIntro({ onFinished, duration = 3000, numStars = 200 }: StarryIntroProps) {
  const [stars, setStars] = useState<Star[]>([]);
  const [fadeOut, setFadeOut] = useState(false);
  const [asteroid, setAsteroid] = useState<AsteroidState | null>(null);
  const [explosion, setExplosion] = useState<ExplosionState | null>(null);
  const [screenFlashOpacity, setScreenFlashOpacity] = useState(0);

  useEffect(() => {
    const generatedStars: Star[] = [];
    const baseAnimationDuration = duration / 1000; // seconds
    const centerPadding = 0.15; // 15% from center line, so 30% total dead zone width/height
    const outerBandEnd = 0.5 - centerPadding; // e.g., 0.35 (size of one outer band)
    const innerBandStart = 0.5 + centerPadding; // e.g., 0.65 (start of the other outer band)

    for (let i = 0; i < numStars; i++) {
      let xPos, yPos;

      // Decide if this star is primarily for a horizontal band or vertical band
      if (Math.random() < 0.5) { // Horizontal band star (top or bottom edges)
        yPos = Math.random() < 0.5 
               ? Math.random() * outerBandEnd * 100 
               : (innerBandStart + Math.random() * (1 - innerBandStart)) * 100;
        xPos = Math.random() * 100; // X can be anywhere
      } else { // Vertical band star (left or right edges)
        xPos = Math.random() < 0.5
               ? Math.random() * outerBandEnd * 100
               : (innerBandStart + Math.random() * (1 - innerBandStart)) * 100;
        yPos = Math.random() * 100; // Y can be anywhere
      }

      generatedStars.push({
        id: i,
        x: xPos, // percentage
        y: yPos, // percentage
        size: Math.random() * 2 + 0.5, // px
        opacity: Math.random() * 0.5 + 0.5, // 0.5 to 1
        animationDelay: `${Math.random() * (baseAnimationDuration / 2)}s`, // Stagger start times
        animationDuration: `${baseAnimationDuration * (0.8 + Math.random() * 0.4)}s` // Vary individual star animation times slightly
      });
    }
    setStars(generatedStars);
  }, [numStars, duration]);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, duration - 500);

    const finishTimer = setTimeout(() => {
      onFinished();
    }, duration);

    const ASTEROID_APPEAR_TIME = Math.max(0, Math.min(6000, duration - 4000));
    const ASTEROID_TRAVEL_DURATION = 2500;

    let asteroidLaunchTimer: NodeJS.Timeout | undefined;
    let asteroidMoveTimer: NodeJS.Timeout | undefined;
    let impactTimer: NodeJS.Timeout | undefined;
    let explosionAnimationTimer: NodeJS.Timeout | undefined;
    let flashFadeOutTimer: NodeJS.Timeout | undefined;

    if (duration > ASTEROID_APPEAR_TIME + ASTEROID_TRAVEL_DURATION + 500) {
      asteroidLaunchTimer = setTimeout(() => {
        const asteroidSize = Math.random() * 20 + 30;
        let sX = 0, sY = 0;
        const edge = Math.floor(Math.random() * 4);
        switch (edge) {
          case 0: sX = Math.random() * 100; sY = -10; break; 
          case 1: sX = 110; sY = Math.random() * 100; break; 
          case 2: sX = Math.random() * 100; sY = 110; break; 
          case 3: sX = -10; sY = Math.random() * 100; break; 
        }
        const tX = 50 + (Math.random() - 0.5) * 10;
        const tY = 50 + (Math.random() - 0.5) * 10;

        setAsteroid({
          id: 'main-asteroid',
          visible: true,
          startX: sX, startY: sY,
          targetX: tX, targetY: tY,
          currentX: sX, currentY: sY,
          size: asteroidSize,
          rotation: Math.random() * 360,
          travelDuration: ASTEROID_TRAVEL_DURATION,
        });

        asteroidMoveTimer = setTimeout(() => {
          setAsteroid(prev => prev ? {
            ...prev,
            currentX: tX,
            currentY: tY,
            rotation: prev.rotation + (Math.random() * 720 - 360)
          } : null);

          // Schedule impact, explosion, and flash
          const ASTEROID_IMPACT_TIME = ASTEROID_TRAVEL_DURATION + 50; // 50ms buffer for movement to start
          impactTimer = setTimeout(() => {
            setAsteroid(prevAst => prevAst ? { ...prevAst, visible: false } : null);
            setExplosion({
              visible: true, x: tX, y: tY, size: 20, opacity: 1
            });
            setScreenFlashOpacity(1);

            // Explosion animation
            explosionAnimationTimer = setTimeout(() => {
              setExplosion(prevExpl => prevExpl ? { ...prevExpl, size: Math.min(window.innerWidth, window.innerHeight) * 0.8, opacity: 0 } : null);
            }, 50);

            // Flash fade out
            flashFadeOutTimer = setTimeout(() => {
              setScreenFlashOpacity(0);
            }, 150); // Flash peak duration

          }, ASTEROID_IMPACT_TIME);

        }, 50); // Start moving asteroid shortly after setting its state
      }, ASTEROID_APPEAR_TIME);
    }

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
      if (asteroidLaunchTimer) clearTimeout(asteroidLaunchTimer);
      if (asteroidMoveTimer) clearTimeout(asteroidMoveTimer);
      if (impactTimer) clearTimeout(impactTimer);
      if (explosionAnimationTimer) clearTimeout(explosionAnimationTimer);
      if (flashFadeOutTimer) clearTimeout(flashFadeOutTimer);
    };
  }, [onFinished, duration]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'black',
        overflow: 'hidden',
        zIndex: 9999, // Ensure it's on top
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.5s ease-out',
        perspective: '600px', // Added perspective for 3D effect
      }}
    >
      {stars.map((star) => (
        <div
          key={star.id}
          style={{
            position: 'absolute',
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: 'white',
            borderRadius: '50%',
            opacity: star.opacity,
            animationName: 'zoomIn',
            animationDuration: star.animationDuration,
            animationTimingFunction: 'ease-in', // Changed from ease-out
            animationDelay: star.animationDelay,
            animationFillMode: 'forwards',
            transform: 'scale(0.05)', // Start smaller
          }}
        />
      ))}
      {asteroid && asteroid.visible && (
        <div
          style={{
            position: 'absolute',
            left: `${asteroid.currentX}%`,
            top: `${asteroid.currentY}%`,
            width: `${asteroid.size}px`,
            height: `${asteroid.size}px`,
            backgroundImage: 'radial-gradient(circle, #888 20%, #666 50%, #444 80%)',
            borderRadius: '50%',
            transform: `translate(-50%, -50%) rotate(${asteroid.rotation}deg)`,
            transition: `left ${asteroid.travelDuration}ms cubic-bezier(0.25, 0.1, 0.5, 1), top ${asteroid.travelDuration}ms cubic-bezier(0.25, 0.1, 0.5, 1), transform ${asteroid.travelDuration}ms linear`,
            zIndex: 10000,
            boxShadow: 'inset -2px -2px 5px rgba(0,0,0,0.5), inset 2px 2px 5px rgba(255,255,255,0.2)',
            display: 'flex', // To help center the tail if needed
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* Fiery Tail */}
          <div
            style={{
              width: `${asteroid.size * 0.6}px`, // Tail is narrower than asteroid
              height: `${asteroid.size * 1.5}px`, // Tail is longer
              backgroundImage: 'linear-gradient(to top, rgba(255,100,0,0) 0%, rgba(255,165,0,0.7) 50%, rgba(255,220,0,1) 100%)',
              borderRadius: '50% 50% 0 0 / 100% 100% 0 0', // Teardrop shape, adjust as needed
              transform: 'translateY(60%) rotate(180deg)', // Position behind and point away
              opacity: 0.8,
              filter: 'blur(3px)',
            }}
          />
        </div>
      )}
      {explosion && explosion.visible && (
        <div
          style={{
            position: 'absolute',
            left: `${explosion.x}%`,
            top: `${explosion.y}%`,
            width: `${explosion.size}px`,
            height: `${explosion.size}px`,
            backgroundImage: 'radial-gradient(circle, rgba(255,255,200,0.8) 0%, rgba(255,180,0,0.7) 40%, rgba(255,100,0,0.4) 70%, rgba(200,0,0,0) 100%)',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            transition: 'width 0.5s ease-out, height 0.5s ease-out, opacity 0.5s ease-out 0.1s',
            zIndex: 10001, // Above asteroid, below flash
          }}
        />
      )}
      <div 
        style={{
          position: 'fixed',
          top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'white',
          opacity: screenFlashOpacity,
          transition: 'opacity 0.3s ease-out', // Flash fade duration
          zIndex: 10002, // Highest zIndex
          pointerEvents: 'none',
        }}
      />
      <style jsx global>{`
        @keyframes zoomIn {
          0% {
            transform: scale(0.1) translateZ(-600px); /* Start small and even further */
            opacity: 0;
          }
          10% { /* Become visible */
            opacity: 1;
          }
          99% { /* Animate almost to the end with full opacity */
            transform: scale(30) translateZ(300px); /* End much larger and further past camera */
            opacity: 1;
          }
          100% { /* Fade out completely at the very end */
            transform: scale(32) translateZ(350px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
