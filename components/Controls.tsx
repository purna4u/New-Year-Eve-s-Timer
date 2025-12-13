import React from 'react';
import { Maximize, Globe, Sparkles } from 'lucide-react';

interface ControlsProps {
  timezone: string;
  setTimezone: (tz: string) => void;
  onFullScreen: () => void;
  onTogglePreview: () => void;
  isPreviewMode: boolean;
}

// Get all supported timezones with fallback
const supportedTimezones = (Intl as any).supportedValuesOf 
  ? (Intl as any).supportedValuesOf('timeZone') 
  : ['UTC'];

export const Controls: React.FC<ControlsProps> = ({ timezone, setTimezone, onFullScreen, onTogglePreview, isPreviewMode }) => {
  return (
    <div className="flex flex-row items-center gap-2 p-2 bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl ring-1 ring-white/10">
      
      {/* Timezone Selector */}
      <div className="relative group shrink-0">
        <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none text-slate-400">
          <Globe className="w-4 h-4" />
        </div>
        <select
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          className="appearance-none bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 text-slate-200 text-xs sm:text-sm rounded-xl focus:ring-1 focus:ring-gold-500 focus:border-gold-500 block w-32 sm:w-48 pl-8 pr-6 py-2 transition-colors cursor-pointer outline-none truncate"
        >
          {supportedTimezones.map((tz: string) => (
            <option key={tz} value={tz}>
              {tz.replace(/_/g, ' ')}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none text-slate-400">
           <span className="text-[8px]">▼</span>
        </div>
      </div>

      <div className="w-px h-6 bg-slate-700/50 mx-1"></div>

      {/* Preview Button */}
      <button
        onClick={onTogglePreview}
        className={`flex items-center justify-center gap-2 px-3 py-2 rounded-xl transition-all text-xs sm:text-sm font-medium ${
            isPreviewMode 
            ? 'bg-gold-500/20 text-gold-400 ring-1 ring-gold-500/50' 
            : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
        }`}
        title="Preview Celebration"
      >
        <Sparkles className={`w-4 h-4 ${isPreviewMode ? 'animate-pulse' : ''}`} />
        <span className="hidden sm:inline">{isPreviewMode ? 'Stop' : 'Test'}</span>
      </button>

      {/* Full Screen Button */}
      <button
        onClick={onFullScreen}
        className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-all text-xs sm:text-sm font-medium"
        title="Enter Full Screen Mode"
      >
        <Maximize className="w-4 h-4" />
        <span className="hidden sm:inline">Full Screen</span>
      </button>

    </div>
  );
};