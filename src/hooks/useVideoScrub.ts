import { useRef, useEffect, useState, useCallback, type RefObject } from "react";
import { type MotionValue, useSpring, useTransform } from "motion/react";

interface UseVideoScrubOptions {
  /** URL to the video file */
  src: string;
  /** Framer Motion scroll progress (0-1) */
  scrollProgress: MotionValue<number>;
  /** Video duration in seconds */
  duration?: number;
}

interface UseVideoScrubReturn {
  /** Ref to attach to your <canvas> element */
  canvasRef: RefObject<HTMLCanvasElement | null>;
  /** Whether the video has been fully pre-loaded */
  isLoaded: boolean;
  /** Loading progress (0-1) for the pre-fetch */
  loadProgress: number;
}

export function useVideoScrub({
  src,
  scrollProgress,
  duration = 5,
}: UseVideoScrubOptions): UseVideoScrubReturn {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const rafRef = useRef<number>(0);
  const blobUrlRef = useRef<string>("");
  const lastTimeRef = useRef<number>(-1);
  const isSeeking = useRef(false);

  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Apply spring physics: stiffness 80, damping 35 for "heavy, premium" feel
  const smoothProgress = useSpring(scrollProgress, {
    stiffness: 80,
    damping: 35,
  });

  // Map 0-1 spring progress to 0-duration seconds
  const currentTime = useTransform(smoothProgress, [0, 1], [0, duration]);

  // Pre-fetch the entire video as a blob for instant scrubbing
  useEffect(() => {
    const controller = new AbortController();

    async function prefetch() {
      try {
        const response = await fetch(src, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Failed to fetch video: ${response.status}`);
        }

        const reader = response.body?.getReader();
        const contentLength = Number(response.headers.get("Content-Length")) || 0;

        if (!reader) {
          throw new Error("No reader available");
        }

        const chunks: Uint8Array[] = [];
        let receivedLength = 0;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
          receivedLength += value.length;

          if (contentLength > 0) {
            setLoadProgress(receivedLength / contentLength);
          }
        }

        if (controller.signal.aborted) return;

        const blob = new Blob(chunks as unknown as BlobPart[], { type: "video/webm" });
        const blobUrl = URL.createObjectURL(blob);
        blobUrlRef.current = blobUrl;

        // Create video element
        const video = document.createElement("video");
        video.src = blobUrl;
        video.muted = true;
        video.playsInline = true;
        video.preload = "auto";

        // Wait for metadata + enough data to seek
        await new Promise<void>((resolve, reject) => {
          video.onloadeddata = () => resolve();
          video.onerror = () => reject(new Error("Video load error"));
        });

        if (controller.signal.aborted) {
          URL.revokeObjectURL(blobUrl);
          return;
        }

        videoRef.current = video;
        setIsLoaded(true);
        setLoadProgress(1);

        // Draw initial frame
        drawFrame(video);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Video prefetch failed:", err);
        }
      }
    }

    prefetch();

    return () => {
      controller.abort();
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
    };
  }, [src]);

  // Draw a single frame from the video onto the canvas
  const drawFrame = useCallback((video: HTMLVideoElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Match canvas internal resolution to display size (retina-aware)
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const w = rect.width * dpr;
    const h = rect.height * dpr;

    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }

    // Fill with site background before drawing to prevent flash
    ctx.fillStyle = "#05070a";
    ctx.fillRect(0, 0, w, h);

    // Calculate cover-fit dimensions
    const videoAspect = video.videoWidth / video.videoHeight;
    const canvasAspect = w / h;

    let drawW: number, drawH: number, drawX: number, drawY: number;

    if (canvasAspect > videoAspect) {
      // Canvas is wider — fit to width
      drawW = w;
      drawH = w / videoAspect;
      drawX = 0;
      drawY = (h - drawH) / 2;
    } else {
      // Canvas is taller — fit to height
      drawH = h;
      drawW = h * videoAspect;
      drawX = (w - drawW) / 2;
      drawY = 0;
    }

    ctx.drawImage(video, drawX, drawY, drawW, drawH);
  }, []);

  // Scrub loop: listen to spring-smoothed currentTime and seek video
  useEffect(() => {
    if (!isLoaded) return;

    const video = videoRef.current;
    if (!video) return;

    // Handle seeked event — draw the frame when seek completes
    const onSeeked = () => {
      isSeeking.current = false;
      drawFrame(video);
    };

    video.addEventListener("seeked", onSeeked);

    // Subscribe to the spring-driven time changes
    const unsubscribe = currentTime.on("change", (time: number) => {
      // Clamp to valid range
      const clampedTime = Math.max(0, Math.min(time, duration));

      // Only seek if time has meaningfully changed (avoid sub-frame noise)
      if (Math.abs(clampedTime - lastTimeRef.current) < 0.01) return;

      lastTimeRef.current = clampedTime;

      if (!isSeeking.current) {
        isSeeking.current = true;
        video.currentTime = clampedTime;
      }
    });

    return () => {
      video.removeEventListener("seeked", onSeeked);
      unsubscribe();
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isLoaded, currentTime, duration, drawFrame]);

  // Handle resize — redraw current frame when window resizes
  useEffect(() => {
    if (!isLoaded || !videoRef.current) return;

    const video = videoRef.current;

    const handleResize = () => {
      drawFrame(video);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isLoaded, drawFrame]);

  return { canvasRef, isLoaded, loadProgress };
}
