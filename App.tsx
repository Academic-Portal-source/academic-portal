
import React, { useState, useCallback } from 'react';
import { Role, Course } from './types';
import { MOCK_ADMIN, MOCK_STUDENT, MOCK_TEACHER, COURSES as INITIAL_COURSES } from './constants';
import Layout from './components/Layout';
import AdminDashboard from './components/AdminDashboard';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import UserDirectory from './components/UserDirectory';
import CourseList from './components/CourseList';
import ScheduleView from './components/ScheduleView';
import ProfileView from './components/ProfileView';
import Settings from './components/Settings';
import ChatBot from './components/ChatBot';

const App: React.FC = () => {
  const [role, setRole] = useState<Role | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [users, setUsers] = useState<any[]>([
    { name: 'Dr. Sarah Jenkins', role: 'Faculty', dept: 'Science', email: 's.jenkins@edu.com', img: 'sarah' },
    { name: 'Prof. Marcus Aurelius', role: 'Faculty', dept: 'History', email: 'm.aurelius@edu.com', img: 'marcus' },
    { name: 'Alex Johnson', role: 'Student', dept: 'Year 3', email: 'a.johnson@edu.com', img: 'alex' },
  ]);

  const handleLogout = useCallback(() => {
    setRole(null);
    setActiveTab('home');
  }, []);

  const addCourse = (newCourse: Course) => setCourses(prev => [newCourse, ...prev]);
  const deleteCourse = (id: string) => setCourses(prev => prev.filter(c => c.id !== id));
  
  const addUser = (newUser: any) => setUsers(prev => [newUser, ...prev]);
  const deleteUser = (email: string) => setUsers(prev => prev.filter(u => u.email !== email));

  if (!role) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-slate-50 dark:bg-slate-950 max-w-[480px] mx-auto transition-all animate-in fade-in">
        <div className="relative group mb-10">
          <div className="absolute inset-0 bg-primary/20 rounded-[2.5rem] blur-2xl"></div>
          <div className="relative w-28 h-28 bg-white dark:bg-slate-800 rounded-[2.5rem] flex items-center justify-center shadow-premium border border-slate-100 dark:border-slate-700">
             <span className="material-symbols-outlined text-primary text-6xl">school</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-3 tracking-tight text-slate-900 dark:text-white">Academic Portal</h1>
        <p className="text-slate-400 mb-12 text-center font-medium max-w-[280px]">Secure multi-role platform for modern educational institutions.</p>
        
        <div className="w-full flex flex-col gap-5">
          {(['ADMIN', 'TEACHER', 'STUDENT'] as Role[]).map((r) => (
            <button 
              key={r}
              onClick={() => { setRole(r); setActiveTab('home'); }}
              className={`group w-full py-5 px-6 rounded-3xl font-bold flex items-center justify-between transition-all active:scale-95 ${
                r === 'ADMIN' 
                ? 'bg-slate-900 text-white shadow-premium' 
                : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-soft text-slate-800 dark:text-slate-100'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-2xl text-primary">
                  {r === 'ADMIN' ? 'admin_panel_settings' : r === 'TEACHER' ? 'co_present' : 'person_search'}
                </span>
                <span className="tracking-tight">{r} Portal</span>
              </div>
              <span className="material-symbols-outlined text-slate-400 text-lg opacity-0 group-hover:opacity-100 transition-all">arrow_forward</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const currentUser = role === 'ADMIN' ? MOCK_ADMIN : role === 'TEACHER' ? MOCK_TEACHER : MOCK_STUDENT;

  const renderScreen = () => {
    switch (activeTab) {
      case 'chat': return <ChatBot role={role} />;
      case 'settings': return <Settings onLogout={handleLogout} />;
      case 'profile': return <ProfileView user={currentUser} onLogout={handleLogout} />;
      case 'users': return <UserDirectory users={users} onAdd={addUser} onDelete={deleteUser} />;
      case 'courses': return <CourseList role={role} courses={courses} onAdd={addCourse} onDelete={deleteCourse} />;
      case 'schedule': return <ScheduleView />;
      case 'home':
        if (role === 'ADMIN') return <AdminDashboard onNavigate={setActiveTab} />;
        if (role === 'TEACHER') return <TeacherDashboard />;
        return <StudentDashboard courses={courses} />;
      default: return null;
    }
  };

  return (
    <Layout role={role} activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="h-full relative">
        {renderScreen()}
        
        {/* Global Action Header */}
        <div className="fixed top-6 left-6 right-6 z-[60] flex items-center justify-between pointer-events-none">
          <div className="flex gap-2 pointer-events-auto">
            <button 
              onClick={handleLogout}
              className="size-10 bg-red-500/10 backdrop-blur-md rounded-2xl shadow-premium flex items-center justify-center border border-red-500/20 text-red-500 active:scale-90 transition-all"
            >
              <span className="material-symbols-outlined text-lg">power_settings_new</span>
            </button>
          </div>
          <div className="flex gap-2 pointer-events-auto">
             <button 
               onClick={() => setActiveTab('profile')}
               className="size-10 rounded-2xl overflow-hidden shadow-premium border border-white/20 active:scale-90 transition-all"
             >
               <img src={currentUser.avatar} className="w-full h-full object-cover" alt="Me" />
             </button>
             <button 
              onClick={() => document.documentElement.classList.toggle('dark')}
              className="size-10 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl shadow-premium flex items-center justify-center border border-white/20 active:scale-90 transition-all"
             >
              <span className="material-symbols-outlined text-lg dark:text-yellow-400">dark_mode</span>
             </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default App;
