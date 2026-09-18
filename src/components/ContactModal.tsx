import React, { useState } from 'react';
import { Mail, MapPin, Copy, Check, X, ExternalLink, GraduationCap, Phone, Linkedin, FileDown } from 'lucide-react';
import { downloadResumePDF } from '../utils/generateResumePDF';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  if (!isOpen) return null;

  const email = 'd16850926@gmail.com';
  const phoneDisplay = '+91 81059 73843';
  const phoneRaw = '+918105973843';
  const linkedInUrl = 'https://www.linkedin.com/in/deekshith-s-6b8127379?utm_source=share_via&utm_content=profile&utm_medium=member_android';
  const location = 'Bengaluru, Karnataka, India';

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleDownload = () => {
    setIsDownloading(true);
    try {
      downloadResumePDF();
    } catch (err) {
      console.error('Download error:', err);
    }
    setTimeout(() => setIsDownloading(false), 2200);
  };

  return (
    <div
      id="contact-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1f2b2e]/60 backdrop-blur-xs p-4"
      onClick={onClose}
    >
      <div
        id="contact-modal"
        className="w-full max-w-md rounded-lg bg-[#f4efe4] border border-[#8fa6b1] p-6 shadow-2xl text-[#1f2b2e] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="font-display font-medium text-2xl text-[#1f2b2e]">
              Connect with Deekshith
            </h2>
            <p className="text-xs text-[#5f4029] mt-0.5 font-mono">
              B.Tech, Computer Science &amp; Engineering
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#5f4029] hover:text-[#1f2b2e] rounded transition cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 my-5 text-xs font-mono">
          {/* Email */}
          <div className="flex items-center justify-between p-3 rounded bg-[#b9c9d1]/20 border border-[#8fa6b1]">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <Mail className="w-4 h-4 text-[#5f4029] shrink-0" />
              <a
                href={`mailto:${email}`}
                className="truncate hover:underline text-[#1f2b2e] font-medium"
                title={`Send email to ${email}`}
              >
                {email}
              </a>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <a
                href={`mailto:${email}`}
                className="px-2 py-1 rounded bg-[#f4efe4] border border-[#8fa6b1] text-[11px] text-[#5f4029] hover:bg-[#eee1c8] transition"
              >
                Email
              </a>
              <button
                onClick={() => copyToClipboard(email, 'email')}
                className="flex items-center gap-1 px-2 py-1 rounded bg-[#f4efe4] border border-[#8fa6b1] text-[11px] text-[#5f4029] hover:bg-[#eee1c8] transition"
                title="Copy email address"
              >
                {copiedField === 'email' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#749c5e]" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center justify-between p-3 rounded bg-[#b9c9d1]/20 border border-[#8fa6b1]">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <Phone className="w-4 h-4 text-[#5f4029] shrink-0" />
              <a
                href={`tel:${phoneRaw}`}
                className="truncate hover:underline text-[#1f2b2e] font-medium"
                title={`Call ${phoneDisplay}`}
              >
                {phoneDisplay}
              </a>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <a
                href={`tel:${phoneRaw}`}
                className="px-2 py-1 rounded bg-[#f4efe4] border border-[#8fa6b1] text-[11px] text-[#5f4029] hover:bg-[#eee1c8] transition"
              >
                Call
              </a>
              <button
                onClick={() => copyToClipboard(phoneRaw, 'phone')}
                className="flex items-center gap-1 px-2 py-1 rounded bg-[#f4efe4] border border-[#8fa6b1] text-[11px] text-[#5f4029] hover:bg-[#eee1c8] transition"
                title="Copy phone number"
              >
                {copiedField === 'phone' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#749c5e]" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* LinkedIn Profile */}
          <a
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded bg-[#b9c9d1]/20 border border-[#8fa6b1] hover:bg-[#b9c9d1]/35 transition group"
          >
            <div className="flex items-center gap-2.5">
              <Linkedin className="w-4 h-4 text-[#0077b5] shrink-0" />
              <div className="flex flex-col">
                <span className="font-medium text-[#1f2b2e] group-hover:underline">LinkedIn Profile</span>
                <span className="text-[10px] text-[#5f4029] opacity-80">linkedin.com/in/deekshith-s</span>
              </div>
            </div>
            <span className="flex items-center gap-1 text-[11px] text-[#5f4029] bg-[#f4efe4] px-2 py-1 rounded border border-[#8fa6b1]">
              <span>Visit</span>
              <ExternalLink className="w-3 h-3" />
            </span>
          </a>

          {/* Location */}
          <div className="flex items-center justify-between p-3 rounded bg-[#b9c9d1]/20 border border-[#8fa6b1]">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[#5f4029]" />
              <span>{location}</span>
            </div>
            <button
              onClick={() => copyToClipboard(location, 'location')}
              className="p-1 rounded text-[#5f4029] hover:bg-[#eee1c8] transition"
              title="Copy location"
            >
              {copiedField === 'location' ? <Check className="w-4 h-4 text-[#749c5e]" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Education */}
          <div className="flex items-center gap-2.5 p-3 rounded bg-[#b9c9d1]/20 border border-[#8fa6b1]">
            <GraduationCap className="w-4 h-4 text-[#5f4029] shrink-0" />
            <span>Computer Science &amp; Engineering &mdash; Undergraduate</span>
          </div>

          {/* Download Resume Button in Modal */}
          <button
            id="modal-download-resume-button"
            onClick={handleDownload}
            className="w-full flex items-center justify-center gap-2 p-2.5 rounded border border-[#5f4029] bg-[#5f4029] text-xs font-mono font-medium text-[#eee1c8] hover:bg-[#8a5c3b] active:scale-98 transition cursor-pointer shadow-xs"
          >
            {isDownloading ? (
              <>
                <Check className="w-4 h-4 text-[#a3e635]" />
                <span>Downloaded Resume PDF!</span>
              </>
            ) : (
              <>
                <FileDown className="w-4 h-4" />
                <span>Download Resume (PDF)</span>
              </>
            )}
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full rounded bg-[#f4efe4] border border-[#8fa6b1] py-2 text-xs font-mono font-medium text-[#5f4029] hover:bg-[#eee1c8] transition cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};
