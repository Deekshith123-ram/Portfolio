import React, { useEffect, useState } from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { Wifi, WifiOff, CheckCircle2 } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();
  const [justReconnected, setJustReconnected] = useState(false);

  useEffect(() => {
    if (isOnline) {
      setJustReconnected(true);
      const timer = setTimeout(() => setJustReconnected(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline]);

  if (isOnline && !justReconnected) return null;

  return (
    <div
      id="network-status-toast"
      className="fixed bottom-4 left-4 z-50 flex items-center gap-2.5 rounded-lg px-3.5 py-2 text-xs font-mono shadow-md border transition-all duration-300 backdrop-blur-sm"
      style={{
        backgroundColor: isOnline ? '#e2ebd8' : '#eee1c8',
        borderColor: isOnline ? '#749c5e' : '#c07a5f',
        color: isOnline ? '#2a441e' : '#5f4029',
      }}
      role="status"
      aria-live="polite"
    >
      {isOnline ? (
        <>
          <CheckCircle2 className="w-4 h-4 text-[#5a8047]" />
          <span>Back online — synchronization active</span>
        </>
      ) : (
        <>
          <WifiOff className="w-4 h-4 text-[#c07a5f] animate-pulse" />
          <div className="flex flex-col">
            <span className="font-bold">Offline Ready</span>
            <span className="text-[10px] opacity-80">All interactions & assets working locally</span>
          </div>
        </>
      )}
    </div>
  );
};
