
import React, { useState } from 'react';

interface SettingsProps {
  onLogout?: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onLogout }) => {
  const [announcements, setAnnouncements] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(false);

  const Toggle = ({ active, onToggle }: { active: boolean, onToggle: () => void }) => (
    <button 
      onClick={onToggle}
      className={`w-12 h-7 rounded-full transition-all duration-300 relative ${active ? 'bg-primary shadow-[0_0_12px_rgba(19,127,236,0.3)]' : 'bg-slate-200 dark:bg-slate-700'}`}
    >
      <div className={`absolute top-1 size-5 bg-white rounded-full shadow-md transition-all duration-300 transform ${active ? 'left-6' : 'left-1'}`}></div>
    </button>
  );

  return (
    <div className="flex flex-col bg-slate-50 dark:bg-slate-950 min-h-full pb-10">
      <header className="sticky top-0 z-20 glass-header px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Settings</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">V4.2.0 • Preference Center</p>
        </div>
      </header>

      <div className="p-6 space-y-8 animate-in fade-in duration-500">
        <section>
          <h3 className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-4 ml-2">Institution</h3>
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-soft border border-slate-100 dark:border-slate-700 overflow-hidden divide-y divide-slate-50 dark:divide-slate-700">
            <div className="p-5 flex flex-col gap-1.5">
              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Institution Name</label>
              <div className="text-base font-bold text-slate-800 dark:text-slate-100">Springfield University</div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-4 ml-2">Notifications</h3>
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-soft border border-slate-100 dark:border-slate-700 overflow-hidden divide-y divide-slate-50 dark:divide-slate-700">
            <div className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="size-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-500 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">campaign</span>
                </div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Announcements</p>
              </div>
              <Toggle active={announcements} onToggle={() => setAnnouncements(!announcements)} />
            </div>
            <div className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="size-10 rounded-xl bg-orange-50 dark:bg-orange-900/30 text-orange-500 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">alternate_email</span>
                </div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Email Alerts</p>
              </div>
              <Toggle active={emailAlerts} onToggle={() => setEmailAlerts(!emailAlerts)} />
            </div>
          </div>
        </section>

        <div className="pt-4 flex flex-col gap-4">
          <button className="w-full py-4 bg-white dark:bg-slate-800 text-slate-400 font-bold text-sm rounded-2xl shadow-soft border border-slate-100 dark:border-slate-700 active:scale-[0.98] transition-all">
            System Diagnostics
          </button>
          <button 
            onClick={onLogout}
            className="w-full py-4 bg-red-50 text-red-500 font-bold text-sm rounded-2xl active:scale-[0.98] transition-all"
          >
            Logout from Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
