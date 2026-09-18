import React, { useState } from 'react';
import { FocusCardData } from '../types';
import { ChevronDown, ChevronUp, Code2, ShieldAlert, Cpu, Sparkles } from 'lucide-react';

interface FocusCardProps {
  card: FocusCardData;
}

const ICONS: Record<string, React.ReactNode> = {
  developer: <Code2 className="w-4 h-4 text-[#8a5c3b]" />,
  cybersecurity: <ShieldAlert className="w-4 h-4 text-[#8a5c3b]" />,
  dsa: <Cpu className="w-4 h-4 text-[#8a5c3b]" />,
  projects: <Sparkles className="w-4 h-4 text-[#8a5c3b]" />,
};

export const FocusCard: React.FC<FocusCardProps> = ({ card }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article
      id={`focus-card-${card.id}`}
      className="bg-[#f4efe4] border border-[#8fa6b1] rounded-[4px] p-5 md:p-[22px] transition-all duration-200 hover:shadow-md hover:border-[#5f4029]/50 flex flex-col justify-between group"
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {ICONS[card.id]}
            <h2 className="font-display font-medium text-[19px] text-[#1f2b2e] leading-tight m-0">
              {card.title}
            </h2>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[11px] font-mono text-[#5f4029] opacity-75 hover:opacity-100 flex items-center gap-1 p-1 -mr-1 transition"
            aria-expanded={isExpanded}
            aria-label={`Toggle details for ${card.title}`}
          >
            <span>{isExpanded ? 'Less' : 'More'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        <p className="text-[12px] leading-[1.6] text-[#3c4a4d] m-0">
          {card.summary}
        </p>

        {isExpanded && (
          <div className="mt-4 pt-3.5 border-t border-[#8fa6b1]/40 space-y-3 animate-fadeIn">
            <p className="text-[11px] leading-[1.55] text-[#1f2b2e]/85">
              {card.details}
            </p>

            <div>
              <span className="text-[10px] font-bold tracking-wider text-[#5f4029] uppercase block mb-1.5">
                Core Domains &amp; Skills
              </span>
              <div className="flex flex-wrap gap-1.5">
                {card.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-[#b9c9d1]/40 text-[#1f2b2e] border border-[#8fa6b1]/60"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold tracking-wider text-[#5f4029] uppercase block mb-1.5">
                Key Focus Projects
              </span>
              <ul className="text-[11px] text-[#3c4a4d] space-y-1 pl-4 list-disc marker:text-[#8a5c3b]">
                {card.projects.map((proj) => (
                  <li key={proj}>{proj}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {!isExpanded && (
        <div className="mt-3.5 pt-2 flex flex-wrap gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
          {card.skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#b9c9d1]/30 text-[#5f4029]"
            >
              {skill}
            </span>
          ))}
          {card.skills.length > 3 && (
            <span className="text-[10px] font-mono px-1 py-0.5 text-[#5f4029]/70">
              +{card.skills.length - 3}
            </span>
          )}
        </div>
      )}
    </article>
  );
};
