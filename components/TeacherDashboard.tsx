
import React from 'react';

const TeacherDashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 p-6 animate-in fade-in duration-500">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src="https://picsum.photos/seed/sarah/200/200" className="size-12 rounded-2xl ring-4 ring-white dark:ring-slate-800 shadow-premium" alt="Faculty" />
          <div>
            <h2 className="text-xl font-bold tracking-tight">Prof. Jenkins</h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Science Department</p>
          </div>
        </div>
        <button className="size-12 rounded-2xl bg-white dark:bg-slate-800 shadow-soft border border-slate-100 dark:border-slate-700 flex items-center justify-center">
          <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">notifications</span>
        </button>
      </header>

      <section className="grid grid-cols-2 gap-4">
        <div className="p-5 bg-primary text-white rounded-3xl shadow-premium flex flex-col gap-4">
          <span className="material-symbols-outlined text-3xl">task</span>
          <div>
            <p className="text-2xl font-bold">14</p>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Papers to Grade</p>
          </div>
        </div>
        <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-soft flex flex-col gap-4">
          <span className="material-symbols-outlined text-3xl text-primary">groups</span>
          <div>
            <p className="text-2xl font-bold">64</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Students</p>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-5 px-1">
          <h3 className="text-lg font-bold">Today's Classes</h3>
          <button className="text-xs font-bold text-primary px-3 py-1 bg-primary/5 rounded-lg">CALENDAR</button>
        </div>
        <div className="flex flex-col gap-4">
          {[
            { name: 'Physics 101', room: 'Lab 4', time: '10:00 AM', attendance: '24/30' },
            { name: 'Advanced Optics', room: 'R-202', time: '01:30 PM', attendance: '12/15' },
          ].map((cls, i) => (
            <div key={i} className="premium-card p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-50 dark:border-slate-700 shadow-soft">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">{cls.name}</h4>
                  <p className="text-xs text-slate-400 mt-1">{cls.room} • {cls.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-primary">{cls.attendance}</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Attended</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TeacherDashboard;
