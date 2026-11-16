import React, { useState } from 'react';
import {
  AlertTriangle,
  Download,
  RotateCcw,
  Volume2,
  VolumeX,
  X,
  ZapOff,
} from 'lucide-react';
import { LearningProgressState, UserPreferences } from '../types/learning';
import { storageService } from '../services/storageService';
import { soundService } from '../services/soundService';

interface SettingsModalProps {
  open: boolean;
  progress: LearningProgressState;
  onClose: () => void;
  onUpdatePreferences: (prefs: Partial<UserPreferences>) => void;
  onConfirmReset: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  open,
  progress,
  onClose,
  onUpdatePreferences,
  onConfirmReset,
}) => {
  const [confirmingReset, setConfirmingReset] = useState(false);

  if (!open) return null;

  const handleDownloadCsv = () => {
    soundService.playClick();
    const csv = storageService.exportCsv(progress);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Progres_Informatika8_${progress.profile.name.replace(/\s+/g, '_')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-modal-title"
    >
      <div className="glass-panel-elevated rounded-3xl w-full max-w-md p-6 space-y-5 border border-violet-400/35">
        <div className="flex items-center justify-between">
          <h2 id="settings-modal-title" className="font-display text-xl font-extrabold text-white">
            Pengaturan Aplikasi
          </h2>
          <button
            type="button"
            onClick={() => {
              soundService.playClick();
              setConfirmingReset(false);
              onClose();
            }}
            aria-label="Tutup pengaturan"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {/* Sound ON/OFF */}
          <div className="flex items-center justify-between rounded-2xl bg-slate-900/85 border border-slate-800 p-4">
            <div className="flex items-center gap-3">
              {progress.preferences.soundEnabled ? (
                <Volume2 className="w-5 h-5 text-cyan-300" />
              ) : (
                <VolumeX className="w-5 h-5 text-slate-400" />
              )}
              <div>
                <div className="text-sm font-bold text-white">Efek Suara (SFX)</div>
                <div className="text-xs text-slate-400">Suara klik, benar, salah & perayaan</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                const nextVal = !progress.preferences.soundEnabled;
                soundService.setEnabled(nextVal);
                if (nextVal) soundService.playClick();
                onUpdatePreferences({ soundEnabled: nextVal });
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold cursor-pointer transition ${
                progress.preferences.soundEnabled
                  ? 'bg-cyan-500 text-slate-950'
                  : 'bg-slate-700 text-slate-300'
              }`}
            >
              {progress.preferences.soundEnabled ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Reduced Motion */}
          <div className="flex items-center justify-between rounded-2xl bg-slate-900/85 border border-slate-800 p-4">
            <div className="flex items-center gap-3">
              <ZapOff className="w-5 h-5 text-violet-300" />
              <div>
                <div className="text-sm font-bold text-white">Kurangi Animasi</div>
                <div className="text-xs text-slate-400">Mode ringan untuk kenyamanan mata</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                soundService.playClick();
                onUpdatePreferences({ reducedMotion: !progress.preferences.reducedMotion });
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold cursor-pointer transition ${
                progress.preferences.reducedMotion
                  ? 'bg-violet-500 text-white'
                  : 'bg-slate-700 text-slate-300'
              }`}
            >
              {progress.preferences.reducedMotion ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Export Report CSV (Google Sheets Ready) */}
          <button
            type="button"
            onClick={handleDownloadCsv}
            className="w-full flex items-center justify-between rounded-2xl bg-slate-900/85 hover:bg-slate-800 border border-slate-700 p-4 text-left cursor-pointer transition"
          >
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5 text-emerald-300" />
              <div>
                <div className="text-sm font-bold text-white">Ekspor Laporan Nilai (CSV)</div>
                <div className="text-xs text-slate-400">Siap dibuka di Spreadsheet / Google Sheets</div>
              </div>
            </div>
          </button>
        </div>

        {/* Reset Progress Section with In-App Confirmation */}
        <div className="pt-2 border-t border-slate-800">
          {!confirmingReset ? (
            <button
              type="button"
              onClick={() => {
                soundService.playClick();
                setConfirmingReset(true);
              }}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/35 text-rose-300 text-xs font-bold cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Semua Progres Belajar
            </button>
          ) : (
            <div className="rounded-2xl bg-rose-950/50 border border-rose-500/50 p-4 space-y-3">
              <div className="flex items-start gap-2.5 text-rose-200 text-xs leading-relaxed">
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
                <span>
                  Yakin ingin menghapus seluruh XP, nilai kuis, dan badge? Tindakan ini tidak bisa dibatalkan.
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    soundService.playClick();
                    setConfirmingReset(false);
                  }}
                  className="py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundService.playClick();
                    setConfirmingReset(false);
                    onConfirmReset();
                    onClose();
                  }}
                  className="py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold cursor-pointer"
                >
                  Ya, Reset Progres
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
