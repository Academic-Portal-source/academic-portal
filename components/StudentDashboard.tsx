
import React from 'react';
import { ASSESSMENTS } from '../constants';
import { Course } from '../types';

interface StudentDashboardProps {
  courses: Course[];
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ courses }) => {
  return (
    <div className="flex flex-col gap-8 p-6 pt-20 animate-in fade-in duration-500">
      <header className="flex items-center justify-between py-2">
        <div className="flex items-center gap-4">
          <img src="https://picsum.photos/seed/alex/200/200" className="size-12 rounded-2xl ring-4 ring-white dark:ring-slate-800 shadow-premium" alt="Profile" />
          <div>
            <h2 className="text-xl font-bold tracking-tight">Hey Alex, 👋</h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Junior Year • 3.8 GPA</p>
          </div>
        </div>
      </header>

      <section className="rounded-[32px] bg-primary text-white p-6 shadow-premium relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl transition-all group-hover:bg-white/20"></div>
        <div className="relative z-10 flex flex-col gap-6">
          <div className="flex justify-between items-start">
            <span className="px-3 py-1 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm">Up Next</span>
            <div className="flex items-center gap-1.5 text-blue-100 text-xs font-bold">
              <span className="material-symbols-outlined text-sm animate-pulse">timer</span>
              <span>IN 12 MIN</span>
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold leading-tight">Advanced Mathematics</p>
            <p className="text-blue-100/80 text-sm font-medium mt-1">Room 302 • Prof. Miller</p>
          </div>
          <button className="flex items-center justify-center gap-3 rounded-2xl h-11 bg-white text-primary text-sm font-bold shadow-lg active:scale-95 transition-all">
            <span>Check In</span>
            <span className="material-symbols-outlined text-[20px]">qr_code_scanner</span>
          </button>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-5 px-1">
          <h3 className="text-lg font-bold">Current Courses</h3>
          <span className="text-xs font-bold text-primary px-3 py-1 bg-primary/5 rounded-lg">{courses.length} ACTIVE</span>
        </div>
        <div className="flex overflow-x-auto gap-5 no-scrollbar snap-x pb-2">
          {courses.map((course) => (
            <div key={course.id} className="min-w-[260px] snap-center rounded-[28px] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-soft overflow-hidden premium-card">
              <div className="h-28 w-full relative">
                <img src={`https://picsum.photos/seed/${course.id}/400/200`} className="w-full h-full object-cover" alt="" />
                <div className="absolute top-3 left-3">
                  <span className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-900 dark:text-slate-100 text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm border border-black/5 uppercase tracking-tighter">
                    {course.code}
                  </span>
                </div>
              </div>
              <div className="p-5 flex flex-col gap-4">
                <h4 className="text-base font-bold truncate leading-none">{course.name}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span>Progress</span>
                    <span className="text-primary">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-primary h-full rounded-full transition-all duration-1000 ease-out" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold mb-5 px-1">Upcoming Tasks</h3>
        <div className="flex flex-col gap-3">
          {ASSESSMENTS.map((a) => (
            <div key={a.id} className="flex items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-50 dark:border-slate-700 shadow-sm premium-card">
              <div className="shrink-0 size-12 rounded-xl bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-primary transition-transform">
                <span className="material-symbols-outlined text-2xl">{a.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold truncate">{a.title}</h4>
                <p className="text-[11px] font-medium text-slate-400 truncate">{a.dueDate} • {a.course}</p>
              </div>
              <div className={`px-2.5 py-1 rounded-lg text-[9px] font-bold tracking-widest ${
                a.status === 'pending' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'
              }`}>
                {a.status.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StudentDashboard;
