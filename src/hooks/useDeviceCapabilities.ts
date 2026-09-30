import { useState, useEffect } from 'react';

interface DeviceCapabilities {
  particleCount: number;
  dpr: number;
  isMobile: boolean;
  isLowEnd: boolean;
}

/**
 * Detects device capabilities and returns appropriate 3D settings.
 * Reduces particle count and DPR on mobile / low-end devices.
 */
export function useDeviceCapabilities(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    particleCount: 1200,
    dpr: 1.5,
    isMobile: false,
    isLowEnd: false,
  });

  useEffect(() => {
    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ||
      window.innerWidth < 768;

    const hardwareConcurrency = navigator.hardwareConcurrency || 4;
    const isLowEnd = hardwareConcurrency <= 4 || isMobile;

    let particleCount: number;
    let dpr: number;

    if (isLowEnd && isMobile) {
      particleCount = 300;
      dpr = 1.0;
    } else if (isMobile) {
      particleCount = 500;
      dpr = 1.0;
    } else if (isLowEnd) {
      particleCount = 600;
      dpr = 1.25;
    } else {
      particleCount = 1200;
      dpr = Math.min(window.devicePixelRatio, 2.0);
    }

    setCapabilities({ particleCount, dpr, isMobile, isLowEnd });
  }, []);

  return capabilities;
}
