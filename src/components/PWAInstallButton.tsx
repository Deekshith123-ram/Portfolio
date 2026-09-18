import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Share, PlusSquare, X, Check } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

  // If already running as an installed standalone PWA
  if (isInstalled) {
    return (
      <div className="flex items-center gap-1.5 px-3 py-1 rounded border border-[#8fa6b1] bg-[#f4efe4]/60 text-[11px] font-mono text-[#5f4029]">
        <Check className="w-3.5 h-3.5 text-[#5f4029]" />
        <span>Installed</span>
      </div>
    );
  }

  const handleInstall = async () => {
    const success = await install();
    if (success) {
      setInstallSuccess(true);
      setTimeout(() => setInstallSuccess(false), 3000);
    }
  };

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        id="pwa-install-button"
        onClick={handleInstall}
        className="flex items-center gap-2 rounded border border-[#5f4029] bg-[#5f4029] px-3.5 py-1.5 text-xs font-mono text-[#eee1c8] hover:bg-[#8a5c3b] active:scale-95 transition-all shadow-sm cursor-pointer"
        title="Install this portfolio as an offline app on your device"
      >
        <Download className="w-3.5 h-3.5" />
        <span>{installSuccess ? 'Installed!' : 'Install App'}</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          id="pwa-ios-install-button"
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-2 rounded border border-[#8fa6b1] bg-[#f4efe4] px-3 py-1.5 text-xs font-mono text-[#1f2b2e] hover:bg-[#eee1c8] transition-all shadow-sm cursor-pointer"
        >
          <Share className="w-3.5 h-3.5 text-[#5f4029]" />
          <span>Install on iOS</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1f2b2e]/60 backdrop-blur-xs p-4">
            <div className="w-full max-w-sm rounded-lg bg-[#f4efe4] border border-[#8fa6b1] p-6 shadow-xl text-[#1f2b2e]">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-display font-medium text-lg text-[#1f2b2e]">
                  Install on iPhone / iPad
                </h3>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 text-[#5f4029] hover:text-[#1f2b2e] rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs leading-relaxed text-[#3c4a4d] mb-4">
                This app is 100% offline-ready. You can install it straight to your home screen:
              </p>
              <div className="space-y-3 text-xs bg-[#b9c9d1]/30 p-3.5 rounded border border-[#8fa6b1]">
                <div className="flex items-start gap-2.5">
                  <div className="p-1 rounded bg-[#f4efe4] text-[#5f4029]">
                    <Share className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold">Step 1:</span> Tap the{' '}
                    <strong>Share</strong> icon in the Safari toolbar.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="p-1 rounded bg-[#f4efe4] text-[#5f4029]">
                    <PlusSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold">Step 2:</span> Scroll down and tap{' '}
                    <strong>Add to Home Screen</strong>.
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded bg-[#5f4029] py-2 text-xs font-mono font-medium text-[#eee1c8] hover:bg-[#8a5c3b] transition"
              >
                Got It
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Fallback for browsers that don't trigger beforeinstallprompt yet or when offline
  return (
    <button
      id="pwa-offline-ready-badge"
      onClick={() => alert('This web application is fully cached and works offline anytime in your browser! Add it to your bookmarks or home screen for quick access.')}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#8fa6b1] bg-[#f4efe4] text-xs font-mono text-[#5f4029] hover:bg-[#eee1c8] transition cursor-pointer"
      title="Offline Enabled"
    >
      <span className="w-2 h-2 rounded-full bg-[#749c5e]" />
      <span>Offline Ready</span>
    </button>
  );
};
