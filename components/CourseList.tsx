
import React, { useState } from 'react';
import { Course, Role } from '../types';

interface CourseListProps {
  role: Role;
  courses: Course[];
  onAdd: (course: Course) => void;
  onDelete: (id: string) => void;
}

const CourseList: React.FC<CourseListProps> = ({ role, courses, onAdd, onDelete }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [newCourseName, setNewCourseName] = useState('');
  const [newCourseCode, setNewCourseCode] = useState('');

  const isAdmin = role === 'ADMIN';

  const handleAdd = () => {
    if (!newCourseName || !newCourseCode) return;
    onAdd({
      id: Math.random().toString(36).substr(2, 9),
      name: newCourseName,
      code: newCourseCode,
      schedule: 'TBD',
      room: 'TBD',
      progress: 0,
      status: 'started',
      studentsCount: 0,
      capacity: 30,
      icon: 'book'
    });
    setNewCourseName('');
    setNewCourseCode('');
    setShowAddModal(false);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      onAdd({
        id: 'imported-' + Date.now(),
        name: 'Quantum Mechanics',
        code: 'PHYS-401',
        schedule: 'MWF 11:00 AM',
        room: 'Lab 2',
        progress: 0,
        status: 'started',
        studentsCount: 15,
        capacity: 20,
        icon: 'science'
      });
      setShowImportModal(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 pt-20 animate-in fade-in slide-in-from-right-4 duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Curriculum</h2>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Management Engine</p>
        </div>
        {isAdmin && (
          <div className="flex gap-2">
            <button 
              onClick={() => setShowImportModal(true)}
              className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 size-10 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-700"
            >
              <span className="material-symbols-outlined">upload_file</span>
            </button>
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-primary text-white size-10 rounded-xl flex items-center justify-center shadow-lg"
            >
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
        )}
      </header>

      <div className="grid gap-4">
        {courses.map((course) => (
          <div key={course.id} className="premium-card bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-soft">
            <div className="p-5 flex gap-4">
              <div className="size-14 rounded-2xl bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-3xl">{course.icon || 'book'}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h4 className="text-base font-bold truncate pr-2">{course.name}</h4>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-500 uppercase">{course.code}</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">{course.instructor || 'TBA'} • {course.room}</p>
                
                {isAdmin && (
                  <div className="mt-4 flex justify-end gap-2">
                     <button 
                        onClick={() => onDelete(course.id)}
                        className="text-[10px] font-bold text-red-500 px-3 py-1.5 bg-red-50 dark:bg-red-900/10 rounded-lg"
                     >
                       DELETE
                     </button>
                     <button className="text-[10px] font-bold text-primary px-3 py-1.5 bg-primary/5 rounded-lg">EDIT</button>
                  </div>
                )}
              </div>
            </div>
            <div className="h-1 bg-slate-100 dark:bg-slate-700 w-full">
              <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: `${(course.studentsCount / course.capacity) * 100}%` }}></div>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in zoom-in duration-200">
          <div className="bg-white dark:bg-slate-800 w-full max-w-sm rounded-[32px] p-8 shadow-premium border border-white/20">
            <h3 className="text-xl font-bold mb-6">New Course</h3>
            <div className="space-y-4">
              <input value={newCourseName} onChange={e => setNewCourseName(e.target.value)} type="text" placeholder="Course Name" className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl h-12 px-4 text-sm focus:ring-2 focus:ring-primary" />
              <input value={newCourseCode} onChange={e => setNewCourseCode(e.target.value)} type="text" placeholder="Course Code" className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl h-12 px-4 text-sm focus:ring-2 focus:ring-primary" />
              <div className="flex gap-4 pt-2">
                <button onClick={() => setShowAddModal(false)} className="flex-1 py-4 text-slate-400 font-bold">Cancel</button>
                <button onClick={handleAdd} className="flex-1 py-4 bg-primary text-white rounded-2xl font-bold shadow-lg">Create</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showImportModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-800 w-full max-w-sm rounded-[32px] p-8 shadow-premium border border-white/20">
            <h3 className="text-xl font-bold mb-4 text-center">Batch Import</h3>
            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
              <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">cloud_upload</span>
              <span className="text-xs font-bold text-slate-400 uppercase">Select Curriculum Data</span>
              <input type="file" className="hidden" accept=".csv,.json" onChange={handleImport} />
            </label>
            <button onClick={() => setShowImportModal(false)} className="w-full mt-6 py-4 text-slate-400 font-bold text-sm">Dismiss</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseList;
