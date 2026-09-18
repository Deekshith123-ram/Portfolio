import React, { useState } from 'react';
import { SlothCanvas } from './components/SlothCanvas';
import { FocusCard } from './components/FocusCard';
import { PWAInstallButton } from './components/PWAInstallButton';
import { OfflineIndicator } from './components/OfflineIndicator';
import { ContactModal } from './components/ContactModal';
import { FOCUS_AREAS } from './data';
import { Mail, Phone, Linkedin, ShieldCheck, Heart, FileDown, Check } from 'lucide-react';
import { downloadResumePDF } from './utils/generateResumePDF';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [interactLog, setInteractLog] = useState<string | null>(null);
  const [isDownloadingResume, setIsDownloadingResume] = useState(false);

  const handleSlothInteract = (action: string) => {
    setInteractLog(action);
    setTimeout(() => setInteractLog(null), 3000);
  };

  const handleDownloadResume = () => {
    setIsDownloadingResume(true);
    try {
      downloadResumePDF();
    } catch (err) {
      console.error('Error downloading resume:', err);
    }
    setTimeout(() => {
      setIsDownloadingResume(false);
    }, 2200);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#b9c9d1] text-[#1f2b2e] font-mono selection:bg-[#5f4029] selection:text-[#eee1c8]">
      {/* ---------- Top Bar ---------- */}
      <header className="flex justify-between items-center px-6 py-6 md:px-8 border-b border-[#8fa6b1]/30 max-w-5xl w-full mx-auto">
        <div className="flex items-center gap-3">
          <div
            className="font-display font-medium text-xl tracking-tight cursor-pointer hover:opacity-80 transition"
            title="Deekshith S"
          >
            DS
          </div>
          <span className="hidden sm:inline-block text-[10px] uppercase tracking-widest text-[#5f4029] bg-[#f4efe4] px-2 py-0.5 rounded border border-[#8fa6b1]">
            Portfolio &bull; Offline Ready
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-2.5">
          <button
            id="download-resume-header-button"
            onClick={handleDownloadResume}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#5f4029] bg-[#5f4029] text-xs text-[#eee1c8] hover:bg-[#8a5c3b] active:scale-95 transition shadow-xs cursor-pointer font-mono font-medium"
            title="Download PDF copy of Deekshith's professional resume"
          >
            {isDownloadingResume ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#a3e635]" />
                <span>Downloaded!</span>
              </>
            ) : (
              <>
                <FileDown className="w-3.5 h-3.5" />
                <span>Download Resume</span>
              </>
            )}
          </button>

          <PWAInstallButton />

          <a
            href="https://www.linkedin.com/in/deekshith-s-6b8127379?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded border border-[#8fa6b1] bg-[#f4efe4] text-xs text-[#0077b5] hover:bg-[#eee1c8] active:scale-95 transition shadow-xs cursor-pointer"
            title="Open LinkedIn Profile"
          >
            <Linkedin className="w-3.5 h-3.5 fill-[#0077b5]" />
            <span className="hidden md:inline text-[#1f2b2e]">LinkedIn</span>
          </a>

          <button
            id="open-contact-button"
            onClick={() => setIsContactOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#8fa6b1] bg-[#f4efe4] text-xs text-[#1f2b2e] hover:bg-[#eee1c8] active:scale-95 transition shadow-xs cursor-pointer"
            title="Get in touch"
          >
            <Mail className="w-3.5 h-3.5 text-[#5f4029]" />
            <span className="hidden xs:inline">Contact</span>
          </button>

          <div className="text-[11px] leading-tight tracking-[0.03em] text-[#1f2b2e] opacity-75 text-right hidden lg:block">
            Bengaluru, Karnataka
            <br />
            India
          </div>
        </div>
      </header>

      {/* ---------- Main Content ---------- */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6">
        {/* ---------- Hero Section ---------- */}
        <section className="relative flex flex-col items-center pt-2 pb-10 sm:pb-12 text-center">
          {/* Sloth Companion Canvas */}
          <div className="stageWrap my-1">
            <SlothCanvas onInteract={handleSlothInteract} />
          </div>

          <h1 className="font-display font-medium text-[34px] sm:text-[46px] md:text-[54px] my-3 sm:my-4 leading-tight tracking-tight text-[#1f2b2e]">
            Deekshith S
          </h1>

          <p className="font-display italic font-normal text-[16px] sm:text-[19px] md:text-[20px] text-[#5f4029] m-0 mb-1.5">
            B.Tech, Computer Science &amp; Engineering
          </p>

          <p className="text-[12px] tracking-[0.03em] opacity-75 m-0 font-mono flex items-center justify-center gap-1.5">
            <span>move your cursor — he&apos;s watching</span>
          </p>

          {interactLog && (
            <div className="mt-2 text-[10px] text-[#5f4029] bg-[#f4efe4]/80 px-2.5 py-0.5 rounded-full border border-[#8fa6b1] animate-fadeIn">
              Last interaction: {interactLog}
            </div>
          )}
        </section>

        {/* Felt stitch accent separator */}
        <div className="w-full max-w-xs mx-auto felt-stitch my-2 opacity-50" />

        {/* ---------- Focus Grid ---------- */}
        <section className="py-6 sm:py-8" aria-label="Core Focus Areas">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {FOCUS_AREAS.map((card) => (
              <FocusCard key={card.id} card={card} />
            ))}
          </div>
        </section>

        {/* ---------- Offline & Performance Highlights ---------- */}
        <section className="my-6 p-4 rounded bg-[#f4efe4]/70 border border-[#8fa6b1] text-xs text-[#3c4a4d]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start sm:items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#5f4029] shrink-0 mt-0.5 sm:mt-0" />
              <div>
                <span className="font-bold text-[#1f2b2e]">Progressive Web Application (PWA)</span>
                <p className="text-[11px] opacity-85 m-0">
                  Cached via Service Worker with CacheFirst strategy. Zero network required after initial load.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsContactOpen(true)}
              className="text-[11px] underline underline-offset-2 text-[#5f4029] hover:text-[#1f2b2e] self-start sm:self-auto cursor-pointer"
            >
              View Full Profile &rarr;
            </button>
          </div>
        </section>
      </main>

      {/* ---------- Footer ---------- */}
      <footer className="py-7 px-6 text-center text-[11px] tracking-[0.02em] border-t border-[#8fa6b1]/30 mt-8 space-y-2">
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[#1f2b2e]">
          <a
            href="mailto:d16850926@gmail.com"
            className="flex items-center gap-1.5 hover:text-[#5f4029] hover:underline"
            title="Send email"
          >
            <Mail className="w-3.5 h-3.5 text-[#5f4029]" />
            <span>d16850926@gmail.com</span>
          </a>
          <span className="hidden sm:inline opacity-40">&bull;</span>
          <a
            href="tel:+918105973843"
            className="flex items-center gap-1.5 hover:text-[#5f4029] hover:underline"
            title="Call phone"
          >
            <Phone className="w-3.5 h-3.5 text-[#5f4029]" />
            <span>+91 81059 73843</span>
          </a>
          <span className="hidden sm:inline opacity-40">&bull;</span>
          <a
            href="https://www.linkedin.com/in/deekshith-s-6b8127379?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-[#0077b5] hover:underline"
            title="Visit LinkedIn Profile"
          >
            <Linkedin className="w-3.5 h-3.5 text-[#0077b5]" />
            <span>LinkedIn Profile</span>
          </a>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4 opacity-70">
          <span>Deekshith S &mdash; Bengaluru, Karnataka, India</span>
          <span className="hidden sm:inline opacity-40">&bull;</span>
          <span className="inline-flex items-center gap-1">
            Engineered with <Heart className="w-3 h-3 text-[#c07a5f] fill-[#c07a5f]" /> &amp; felt cloth art
          </span>
        </div>
      </footer>

      {/* Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* Connectivity & Offline Notification */}
      <OfflineIndicator />
    </div>
  );
}
