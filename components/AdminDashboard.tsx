
import React from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts';

interface AdminDashboardProps {
  onNavigate: (tab: string) => void;
}

const data = [
  { name: 'Mon', value: 40 },
  { name: 'Tue', value: 65 },
  { name: 'Wed', value: 85 },
  { name: 'Thu', value: 50 },
  { name: 'Fri', value: 75 },
  { name: 'Sat', value: 30 },
  { name: 'Sun', value: 20 },
];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col gap-8 p-6 pt-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-md animate-pulse"></div>
            <img src="https://picsum.photos/seed/admin-p/200/200" className="relative size-12 rounded-2xl object-cover ring-2 ring-white dark:ring-slate-800 shadow-premium" alt="Admin" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight">System Admin</h2>
            <div className="flex items-center gap-1.5">
              <span className="size-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-xs text-slate-500 font-medium">Platform Stable</span>
            </div>
          </div>
        </div>
      </header>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Management Hub</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => onNavigate('courses')}
            className="premium-card flex flex-col justify-between items-start gap-6 rounded-3xl p-5 bg-slate-900 text-white shadow-premium text-left"
          >
            <span className="material-symbols-outlined text-primary text-3xl">upload_file</span>
            <div>
              <p className="text-sm font-bold leading-none tracking-tight">Manage Curriculum</p>
              <p className="text-[10px] font-medium text-slate-400 mt-2">Courses & Imports</p>
            </div>
          </button>
          <button 
            onClick={() => onNavigate('users')}
            className="premium-card flex flex-col justify-between items-start gap-6 rounded-3xl p-5 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-soft text-left"
          >
            <span className="material-symbols-outlined text-purple-500 text-3xl">group</span>
            <div>
              <p className="text-sm font-bold leading-none tracking-tight">User Directory</p>
              <p className="text-[10px] font-medium text-slate-500 mt-2">Manage Identities</p>
            </div>
          </button>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-800 p-6 rounded-[32px] border border-slate-100 dark:border-slate-700 shadow-soft">
        <h3 className="text-lg font-bold mb-1">Enrollment Trends</h3>
        <p className="text-xs text-slate-500 mb-8">Activity over the last 7 days</p>
        <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <Tooltip cursor={{fill: 'transparent'}} content={() => null} />
              <Bar dataKey="value" radius={[6, 6, 6, 6]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 2 ? '#137fec' : '#137fec33'} />
                ))}
              </Bar>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8', fontWeight: 600}} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="text-lg font-bold">New Registrations</h3>
          <button onClick={() => onNavigate('users')} className="text-xs font-bold text-primary">REVIEW ALL</button>
        </div>
        <div className="flex flex-col gap-3">
          {[
            { name: 'Dr. Sarah Jenkins', role: 'Faculty • Science', time: '2h ago', img: 'sarah' },
            { name: 'Michael Chen', role: 'Student • Sophomore', time: '5h ago', img: 'michael' },
          ].map((item, i) => (
            <div key={i} className="premium-card flex items-center p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-50 dark:border-slate-700 shadow-sm">
              <img src={`https://picsum.photos/seed/${item.img}/100/100`} className="size-11 rounded-xl mr-4 grayscale-[0.2]" alt="" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{item.name}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{item.role}</p>
              </div>
              <div className="flex gap-2">
                <button className="size-8 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500">
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
                <button className="size-8 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <span className="material-symbols-outlined text-[18px]">check</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
