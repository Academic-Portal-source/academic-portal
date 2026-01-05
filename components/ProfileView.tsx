
import React, { useState } from 'react';
import { User } from '../types';

interface ProfileViewProps {
  user: User;
  onLogout?: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, onLogout }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="flex flex-col gap-8 p-8 pt-20 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-[2.5rem] blur-xl animate-pulse"></div>
          <img src={user.avatar} className="relative size-32 rounded-[2.5rem] object-cover border-4 border-white dark:border-slate-800 shadow-premium" alt="Profile" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{user.name}</h2>
          <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mt-1">{user.role}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-soft text-center">
          <p className="text-xl font-bold text-slate-900 dark:text-white">12</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Completed</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-soft text-center">
          <p className="text-xl font-bold text-slate-900 dark:text-white">3.8</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Current GPA</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.2em] ml-2">Digital Identity</h3>
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-soft border border-slate-100 dark:border-slate-700 overflow-hidden divide-y divide-slate-50 dark:divide-slate-700">
          <div className="p-5 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-slate-400">mail</span>
              <div className="flex flex-col">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Email</p>
                <p className="text-sm font-bold truncate max-w-[180px] text-slate-900 dark:text-white">{user.email}</p>
              </div>
            </div>
          </div>
          <div className="p-5 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-slate-400">badge</span>
              <div className="flex flex-col">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">ID Number</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{user.id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={() => setShowConfirm(true)}
        className="w-full py-5 bg-red-500 text-white rounded-3xl font-bold shadow-lg shadow-red-500/20 active:scale-95 transition-all mt-4"
      >
        Secure Logout
      </button>

      {showConfirm && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
           <div className="bg-white dark:bg-slate-800 w-full max-w-sm rounded-[40px] p-10 text-center shadow-premium ring-1 ring-white/20">
              <div className="size-20 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-4xl">logout</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Sign Out?</h3>
              <p className="text-slate-400 text-sm mb-10 font-medium">Your current portal session will be safely terminated.</p>
              <div className="flex flex-col gap-3">
                <button onClick={onLogout} className="w-full py-4 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-2xl font-bold text-sm">Yes, Logout</button>
                <button onClick={() => setShowConfirm(false)} className="w-full py-4 text-slate-400 font-bold text-sm">Keep Browsing</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ProfileView;
