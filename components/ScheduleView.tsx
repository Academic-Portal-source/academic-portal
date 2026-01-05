
import React from 'react';

const ScheduleView: React.FC = () => {
  const events = [
    { time: '09:00 AM', title: 'Advanced Mathematics', type: 'Lecture', room: 'R-302', color: 'bg-blue-500' },
    { time: '11:30 AM', title: 'Physics Lab', type: 'Laboratory', room: 'L-004', color: 'bg-purple-500' },
    { time: '01:00 PM', title: 'Faculty Lunch', type: 'Meeting', room: 'Lounge', color: 'bg-slate-400' },
    { time: '02:30 PM', title: 'History of Art', type: 'Seminar', room: 'A-204', color: 'bg-orange-500' },
  ];

  return (
    <div className="flex flex-col gap-6 p-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Schedule</h2>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Monday, Oct 24</p>
        </div>
        <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <button className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 shadow-sm text-[10px] font-bold text-primary">DAY</button>
          <button className="px-3 py-1.5 rounded-lg text-[10px] font-bold text-slate-400">WEEK</button>
        </div>
      </header>

      <div className="relative pl-14 space-y-8 before:absolute before:left-[1.65rem] before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">
        {events.map((ev, i) => (
          <div key={i} className="relative group">
            <div className={`absolute -left-[1.85rem] top-1 size-4 rounded-full border-2 border-white dark:border-slate-900 shadow-sm z-10 ${ev.color}`}></div>
            <div className="absolute -left-14 top-0.5 text-[10px] font-bold text-slate-400 text-right w-10">
              {ev.time.split(' ')[0]}
              <br />
              <span className="opacity-50 font-medium">{ev.time.split(' ')[1]}</span>
            </div>
            <div className="premium-card p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-soft">
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{ev.title}</h4>
                <span className="text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md bg-slate-50 dark:bg-slate-900 text-slate-500 border border-slate-100 dark:border-slate-700">{ev.type}</span>
              </div>
              <p className="text-[10px] font-medium text-slate-400 mt-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">location_on</span>
                {ev.room}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleView;
