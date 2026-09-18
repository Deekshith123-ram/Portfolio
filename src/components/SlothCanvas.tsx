import React, { useEffect, useRef, useState, useCallback } from 'react';
import { SlothState } from '../types';
import { Moon, Sun, Sparkles, Volume2, VolumeX } from 'lucide-react';

interface SlothCanvasProps {
  onInteract?: (interaction: string) => void;
}

export const SlothCanvas: React.FC<SlothCanvasProps> = ({ onInteract }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [slothState, setSlothState] = useState<SlothState>('idle');
  const [isSleeping, setIsSleeping] = useState<boolean>(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(true);
  const [snackActive, setSnackActive] = useState<boolean>(false);
  const [reactionText, setReactionText] = useState<string>('');

  // Audio synthesizer for offline haptic audio
  const playSound = useCallback((type: 'poke' | 'snack' | 'sleep' | 'wake') => {
    if (!isSoundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === 'poke') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(480, now + 0.12);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'snack') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(540, now);
        osc.frequency.setValueAtTime(620, now + 0.08);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
      } else if (type === 'sleep') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.25);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.28);
        osc.start(now);
        osc.stop(now + 0.28);
      } else if (type === 'wake') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.exponentialRampToValueAtTime(520, now + 0.2);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.22);
        osc.start(now);
        osc.stop(now + 0.22);
      }
    } catch {
      // Audio context might be restricted before user gesture
    }
  }, [isSoundEnabled]);

  // Keep ref for state values needed inside the requestAnimationFrame loop
  const stateRef = useRef({
    currentFrame: 24,
    targetFrame: 24,
    mode: 'idle' as SlothState,
    lastMoveTime: performance.now(),
    wanderStart: 0,
    isSleeping: false,
    blinkCounter: 0,
    isBlinking: false,
    snackLevel: 0, // 0 to 1 for eating animation
    snackStartTime: 0,
    leafX: 170,
    leafY: 200,
  });

  // Sync sleeping state with ref
  useEffect(() => {
    stateRef.current.isSleeping = isSleeping;
    if (isSleeping) {
      setSlothState('sleep');
      stateRef.current.mode = 'sleep';
    } else {
      setSlothState('idle');
      stateRef.current.mode = 'idle';
      stateRef.current.lastMoveTime = performance.now();
    }
  }, [isSleeping]);

  // Canvas Drawing & Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 340;
    const H = 340;
    const HEAD_CX = 170;
    const HEAD_CY = 128;
    const HEAD_R = 62;
    const FRAME_COUNT = 50;
    const ANGLE_RANGE = 50;

    // Retina DPI Scaling
    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;

    function frameToAngle(f: number) {
      return -ANGLE_RANGE + (f / (FRAME_COUNT - 1)) * (ANGLE_RANGE * 2);
    }

    function drawBranch() {
      if (!ctx) return;
      ctx.save();
      ctx.strokeStyle = '#5f4029';
      ctx.lineWidth = 16;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(30, 250);
      ctx.lineTo(310, 236);
      ctx.stroke();
      ctx.strokeStyle = '#4a3120';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(60, 246);
      ctx.lineTo(120, 248);
      ctx.moveTo(180, 240);
      ctx.lineTo(250, 243);
      ctx.stroke();

      // Branch leaf details
      ctx.fillStyle = '#658147';
      ctx.beginPath();
      ctx.ellipse(40, 245, 12, 5, -0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(300, 232, 10, 4, 0.3, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    function feltBlob(
      cx: number,
      cy: number,
      rx: number,
      ry: number,
      color: string,
      rot?: number
    ) {
      if (!ctx) return;
      ctx.save();
      ctx.translate(cx, cy);
      if (rot) ctx.rotate(rot);
      ctx.shadowColor = 'rgba(31,43,46,0.22)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetY = 4;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function drawBody() {
      if (!ctx) return;
      // arms wrapped around branch
      feltBlob(108, 232, 34, 16, '#8a5c3b', -0.5);
      feltBlob(232, 232, 34, 16, '#8a5c3b', 0.5);
      // torso
      feltBlob(170, 232, 62, 78, '#96683f');
      // felt stitch line down the belly
      ctx.save();
      ctx.strokeStyle = 'rgba(255,255,255,0.4)';
      ctx.setLineDash([3, 5]);
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(170, 176);
      ctx.quadraticCurveTo(178, 232, 170, 296);
      ctx.stroke();
      ctx.restore();

      // claws
      ['#efe1c9'].forEach((c) => {
        feltBlob(96, 246, 9, 6, c, -0.6);
        feltBlob(120, 250, 9, 6, c, -0.3);
        feltBlob(220, 250, 9, 6, c, 0.3);
        feltBlob(244, 246, 9, 6, c, 0.6);
      });
    }

    function drawHead(angleDeg: number, sleeping: boolean, blinking: boolean, chewing: boolean) {
      if (!ctx) return;
      const rad = (angleDeg * Math.PI) / 180;
      ctx.save();
      ctx.translate(HEAD_CX, HEAD_CY);
      ctx.rotate(rad);

      // fur tufts radiating around head edge
      ctx.strokeStyle = '#7a5030';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      for (let i = 0; i < 22; i++) {
        const a = (i / 22) * Math.PI * 2;
        const x1 = Math.cos(a) * (HEAD_R - 4);
        const y1 = Math.sin(a) * (HEAD_R - 4);
        const x2 = Math.cos(a) * (HEAD_R + 7);
        const y2 = Math.sin(a) * (HEAD_R + 7);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // head base
      ctx.shadowColor = 'rgba(31,43,46,0.22)';
      ctx.shadowBlur = 12;
      ctx.shadowOffsetY = 5;
      ctx.fillStyle = '#8a5c3b';
      ctx.beginPath();
      ctx.ellipse(0, 0, HEAD_R, HEAD_R * 0.94, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowColor = 'transparent';

      // cream face patch
      ctx.fillStyle = '#eee1c8';
      ctx.beginPath();
      ctx.ellipse(0, 8, HEAD_R * 0.72, HEAD_R * 0.66, 0, 0, Math.PI * 2);
      ctx.fill();

      // dark eye masks (sloth markings)
      ctx.fillStyle = '#5f4029';
      ctx.beginPath();
      ctx.ellipse(-19, -2, 13, 17, -0.15, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(19, -2, 13, 17, 0.15, 0, Math.PI * 2);
      ctx.fill();

      // Eyes: sleeping / blinking vs open
      if (sleeping || blinking) {
        // Closed sleepy smiling eye curves
        ctx.strokeStyle = '#201610';
        ctx.lineWidth = 2.4;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(-24, 0);
        ctx.quadraticCurveTo(-19, 4, -14, 0);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(14, 0);
        ctx.quadraticCurveTo(19, 4, 24, 0);
        ctx.stroke();
      } else {
        // Open dark glossy eyes
        ctx.fillStyle = '#201610';
        ctx.beginPath();
        ctx.ellipse(-19, 0, 5, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(19, 0, 5, 6, 0, 0, Math.PI * 2);
        ctx.fill();

        // White catchlights
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.beginPath();
        ctx.ellipse(-21, -2, 1.6, 1.8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(17, -2, 1.6, 1.8, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Snout / nose
      ctx.fillStyle = '#3a281c';
      ctx.beginPath();
      ctx.ellipse(0, 20, 7, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Sleepy smile / mouth
      ctx.strokeStyle = '#3a281c';
      ctx.lineWidth = 2;
      ctx.beginPath();
      if (chewing) {
        // Chewing mouth
        ctx.ellipse(0, 29, 6, 4, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#5f4029';
        ctx.fill();
      } else {
        ctx.moveTo(-9, 30);
        ctx.quadraticCurveTo(0, 36, 9, 30);
        ctx.stroke();
      }

      // Sleepy Zzz symbols floating up if sleeping
      if (sleeping) {
        const time = performance.now() / 1000;
        ctx.fillStyle = '#5f4029';
        ctx.font = 'bold 12px "Space Mono", monospace';
        const z1Offset = (time * 15) % 40;
        const z2Offset = ((time * 15) + 18) % 40;
        ctx.globalAlpha = Math.max(0, 1 - z1Offset / 40);
        ctx.fillText('z', 28 + z1Offset * 0.3, -15 - z1Offset);
        ctx.globalAlpha = Math.max(0, 1 - z2Offset / 40);
        ctx.font = 'bold 16px "Space Mono", monospace';
        ctx.fillText('Z', 36 + z2Offset * 0.4, -25 - z2Offset);
        ctx.globalAlpha = 1.0;
      }

      ctx.restore();
    }

    function render() {
      if (!ctx) return;
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, W, H);
      drawBranch();
      drawBody();

      const { currentFrame, isSleeping, isBlinking, snackLevel } = stateRef.current;
      const chewing = snackLevel > 0;
      drawHead(frameToAngle(currentFrame), isSleeping, isBlinking, chewing);

      // Draw active snack leaf if being eaten
      if (snackLevel > 0) {
        ctx.save();
        ctx.translate(HEAD_CX + 12, HEAD_CY + 32);
        ctx.rotate(0.3);
        ctx.fillStyle = '#527939';
        ctx.beginPath();
        const leafScale = Math.max(0.2, 1 - snackLevel * 0.8);
        ctx.scale(leafScale, leafScale);
        ctx.ellipse(0, 0, 16, 7, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#385623';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(-14, 0);
        ctx.lineTo(14, 0);
        ctx.stroke();
        ctx.restore();
      }

      ctx.restore();
    }

    function angleFromPointer(px: number, py: number) {
      const dx = px - HEAD_CX;
      const dy = py - HEAD_CY;
      const turn = Math.max(-ANGLE_RANGE, Math.min(ANGLE_RANGE, dx / 3.4));
      return turn;
    }

    function angleToFrame(angleDeg: number) {
      const clamped = Math.max(-ANGLE_RANGE, Math.min(ANGLE_RANGE, angleDeg));
      const t = (clamped + ANGLE_RANGE) / (ANGLE_RANGE * 2);
      return Math.round(t * (FRAME_COUNT - 1));
    }

    let animationFrameId: number;

    function tick(now: number) {
      const s = stateRef.current;

      // Handle periodic casual blinking (only when awake)
      if (!s.isSleeping) {
        s.blinkCounter++;
        if (!s.isBlinking && s.blinkCounter > 240 && Math.random() < 0.03) {
          s.isBlinking = true;
          s.blinkCounter = 0;
          setTimeout(() => {
            stateRef.current.isBlinking = false;
          }, 140);
        }
      }

      // Handle snack eating animation
      if (s.snackLevel > 0) {
        const elapsed = now - s.snackStartTime;
        if (elapsed < 1800) {
          s.snackLevel = elapsed / 1800;
        } else {
          s.snackLevel = 0;
          setSnackActive(false);
          setReactionText('Yum! Full of energy.');
          setTimeout(() => setReactionText(''), 2500);
        }
      }

      // If sleeping, target the center frame and breathe softly
      if (s.isSleeping) {
        const breath = Math.sin((now / 1500) * Math.PI) * 4;
        s.targetFrame = angleToFrame(breath);
      } else {
        // Tracking vs wandering
        if (s.mode === 'track' && now - s.lastMoveTime > 8000) {
          s.mode = 'wander';
          s.wanderStart = now;
          setSlothState('wander');
        }

        if (s.mode === 'wander') {
          const t = (now - s.wanderStart) / 1000;
          const period = 7.5;
          const wave = Math.sin((t / period) * Math.PI * 2);
          s.targetFrame = angleToFrame(wave * ANGLE_RANGE * 0.7);
        }
      }

      // Smooth frame interpolation (sloths move at a relaxed, gentle pace)
      if (s.currentFrame !== s.targetFrame) {
        s.currentFrame += s.currentFrame < s.targetFrame ? 1 : -1;
      }

      render();
      animationFrameId = requestAnimationFrame(tick);
    }

    function onPointerMove(e: PointerEvent) {
      if (stateRef.current.isSleeping) return;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const scaleX = W / rect.width;
      const scaleY = H / rect.height;
      const px = (e.clientX - rect.left) * scaleX;
      const py = (e.clientY - rect.top) * scaleY;

      stateRef.current.mode = 'track';
      stateRef.current.lastMoveTime = performance.now();
      stateRef.current.targetFrame = angleToFrame(angleFromPointer(px, py));
      setSlothState('track');
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    render();
    animationFrameId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Click on sloth canvas for playful poke/reaction
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.stopPropagation();
    if (isSleeping) {
      setIsSleeping(false);
      playSound('wake');
      setReactionText('Waking up!');
      setTimeout(() => setReactionText(''), 2000);
      onInteract?.('woke sloth');
      return;
    }

    // Quick blink and wink
    stateRef.current.isBlinking = true;
    playSound('poke');
    setTimeout(() => {
      stateRef.current.isBlinking = false;
    }, 220);

    const responses = [
      "He blinked at you!",
      "Sloth approved!",
      "Hang in there.",
      "Quietly admiring your cursor.",
      "Just chillin' on this branch.",
    ];
    const picked = responses[Math.floor(Math.random() * responses.length)];
    setReactionText(picked);
    setTimeout(() => setReactionText(''), 2400);
    onInteract?.('poked sloth');
  };

  const handleFeedLeaf = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (snackActive) return;
    if (isSleeping) setIsSleeping(false);

    setSnackActive(true);
    stateRef.current.snackLevel = 0.01;
    stateRef.current.snackStartTime = performance.now();
    playSound('snack');
    setReactionText('Munching on a fresh leaf...');
    onInteract?.('fed leaf');
  };

  const toggleSleep = () => {
    const next = !isSleeping;
    setIsSleeping(next);
    playSound(next ? 'sleep' : 'wake');
    setReactionText(next ? 'Taking a quick nap... zzz' : 'Wide awake and watching!');
    setTimeout(() => setReactionText(''), 2500);
    onInteract?.(next ? 'put sloth to sleep' : 'woke sloth');
  };

  const toggleSound = () => {
    setIsSoundEnabled(!isSoundEnabled);
  };

  return (
    <div className="flex flex-col items-center select-none">
      <div className="relative w-[340px] h-[340px] max-w-[82vw] max-h-[82vw] group">
        <canvas
          ref={canvasRef}
          id="sloth"
          onClick={handleCanvasClick}
          aria-label="Interactive animated sloth tracking cursor movement"
          className="w-full h-full block cursor-pointer transition-transform duration-200 active:scale-[0.99] touch-none"
        />

        {/* Reaction speech bubble overlay */}
        {reactionText && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none animate-bounce">
            <div className="bg-[#f4efe4] border border-[#8fa6b1] text-[#1f2b2e] text-xs font-mono px-3 py-1.5 rounded-full shadow-md whitespace-nowrap">
              {reactionText}
            </div>
          </div>
        )}

        {/* Quick hover indicator */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-80 transition-opacity text-[10px] font-mono text-[#5f4029] pointer-events-none whitespace-nowrap">
          click him to interact
        </div>
      </div>

      {/* Sloth Companion Control Bar */}
      <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
        {/* Status Pill */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f4efe4] border border-[#8fa6b1] text-[11px] font-mono text-[#5f4029]">
          <span
            className={`w-2 h-2 rounded-full ${
              isSleeping
                ? 'bg-[#8fa6b1]'
                : slothState === 'track'
                ? 'bg-[#749c5e] animate-pulse'
                : 'bg-[#c07a5f]'
            }`}
          />
          <span className="capitalize">
            {isSleeping ? 'Napping' : slothState === 'track' ? 'Tracking you' : 'Daydreaming'}
          </span>
        </div>

        {/* Sleep / Wake Toggle */}
        <button
          id="toggle-sloth-sleep"
          onClick={toggleSleep}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f4efe4] border border-[#8fa6b1] text-[11px] font-mono text-[#1f2b2e] hover:bg-[#eee1c8] active:scale-95 transition cursor-pointer"
          title={isSleeping ? 'Wake the sloth' : 'Let the sloth sleep'}
        >
          {isSleeping ? (
            <>
              <Sun className="w-3 h-3 text-[#c07a5f]" />
              <span>Wake Up</span>
            </>
          ) : (
            <>
              <Moon className="w-3 h-3 text-[#5f4029]" />
              <span>Nap Mode</span>
            </>
          )}
        </button>

        {/* Feed Leaf Button */}
        <button
          id="feed-sloth-leaf"
          onClick={handleFeedLeaf}
          disabled={snackActive}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f4efe4] border border-[#8fa6b1] text-[11px] font-mono text-[#1f2b2e] hover:bg-[#eee1c8] active:scale-95 disabled:opacity-50 transition cursor-pointer"
          title="Give the sloth a fresh eucalyptus leaf"
        >
          <Sparkles className="w-3 h-3 text-[#749c5e]" />
          <span>Feed Leaf</span>
        </button>

        {/* Mute Audio Toggle */}
        <button
          id="toggle-sloth-sound"
          onClick={toggleSound}
          className="p-1.5 rounded-full bg-[#f4efe4] border border-[#8fa6b1] text-[#5f4029] hover:bg-[#eee1c8] transition cursor-pointer"
          title={isSoundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
          aria-label="Toggle sound"
        >
          {isSoundEnabled ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3 opacity-60" />}
        </button>
      </div>
    </div>
  );
};
