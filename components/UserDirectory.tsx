
import React, { useState } from 'react';

interface UserDirectoryProps {
  users: any[];
  onAdd?: (user: any) => void;
  onDelete?: (email: string) => void;
}

const UserDirectory: React.FC<UserDirectoryProps> = ({ users, onAdd, onDelete }) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'All' | 'Faculty' | 'Student'>('All');
  const [showImport, setShowImport] = useState(false);

  const filteredUsers = users.filter(u => 
    (filter === 'All' || u.role === filter) && 
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSimulatedImport = () => {
    onAdd?.({ name: 'Dr. New Professor', role: 'Faculty', dept: 'Math', email: `new${Date.now()}@edu.com`, img: 'new' });
    setShowImport(false);
  };

  return (
    <div className="flex flex-col gap-6 p-6 pt-20 animate-in fade-in slide-in-from-right-4 duration-500">
      <header className="flex justify-between items-start mb-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Directory</h2>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Identity Management</p>
        </div>
        <button 
          onClick={() => setShowImport(true)}
          className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 shadow-sm"
        >
          IMPORT
        </button>
      </header>

      <div className="relative group">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
        <input 
          type="text" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or role..." 
          className="w-full bg-white dark:bg-slate-800 border-none rounded-2xl pl-12 h-12 text-sm shadow-soft focus:ring-2 focus:ring-primary/20 transition-all text-slate-900 dark:text-white"
        />
      </div>

      <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
        {['All', 'Faculty', 'Student'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${
              filter === f ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' : 'text-slate-400'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {filteredUsers.map((user, i) => (
          <div key={i} className="premium-card flex items-center p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-50 dark:border-slate-700 shadow-sm">
            <img src={`https://picsum.photos/seed/${user.img}/100/100`} className="size-12 rounded-xl mr-4 object-cover" alt="" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 dark:text-white">{user.name}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{user.dept || 'Academic'} • {user.role}</p>
            </div>
            <button 
                onClick={() => onDelete?.(user.email)}
                className="size-10 flex items-center justify-center rounded-xl bg-red-50 dark:bg-red-900/10 text-red-400 hover:text-red-500 transition-colors"
              >
              <span className="material-symbols-outlined text-xl">delete</span>
            </button>
          </div>
        ))}
      </div>

      {showImport && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-800 w-full max-w-sm rounded-[32px] p-8 shadow-premium border border-white/20">
            <h3 className="text-xl font-bold mb-2">User Import</h3>
            <p className="text-xs text-slate-400 mb-6 font-medium">Batch upload via centralized data engine.</p>
            <div className="space-y-4">
              <div onClick={handleSimulatedImport} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center gap-2 cursor-pointer hover:border-primary transition-all">
                <span className="material-symbols-outlined text-3xl text-slate-300">file_upload</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Drop CSV Data</span>
              </div>
              <button onClick={() => setShowImport(false)} className="w-full py-2 text-slate-400 font-bold text-sm">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDirectory;
