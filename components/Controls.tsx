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
    <div className="flex flex-col items-end gap-3">
      {/* Preview Button */}
      <button
        onClick={onTogglePreview}
        className={`flex items-center gap-2 px-4 py-2 backdrop-blur border rounded-lg transition-all text-sm font-medium shadow-lg ${
            isPreviewMode 
            ? 'bg-gold-500/20 border-gold-500 text-gold-400' 
            : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 hover:border-slate-600'
        }`}
        title="Preview Celebration"
      >
        <Sparkles className="w-4 h-4" />
        <span>{isPreviewMode ? 'Stop Preview' : 'Test Fireworks'}</span>
      </button>

      {/* Full Screen Button */}
      <button
        onClick={onFullScreen}
        className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 backdrop-blur border border-slate-700 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 hover:border-slate-600 transition-all text-sm font-medium shadow-lg"
        title="Enter Full Screen Mode"
      >
        <Maximize className="w-4 h-4" />
        <span>Full Screen</span>
      </button>

      {/* Timezone Selector */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          <Globe className="w-4 h-4" />
        </div>
        <select
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          className="appearance-none bg-slate-800/80 backdrop-blur border border-slate-700 text-slate-200 text-sm rounded-lg focus:ring-gold-500 focus:border-gold-500 block w-64 pl-10 pr-8 py-2 hover:bg-slate-700 transition-colors cursor-pointer shadow-lg"
        >
          {supportedTimezones.map((tz: string) => (
            <option key={tz} value={tz}>
              {tz.replace(/_/g, ' ')}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none text-slate-400">
           <span className="text-[10px]">▼</span>
        </div>
      </div>
    </div>
  );
};