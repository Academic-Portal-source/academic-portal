
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  role: 'ADMIN' | 'TEACHER' | 'STUDENT';
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange, role }) => {
  const tabs = role === 'ADMIN' 
    ? [
        { id: 'home', icon: 'dashboard', label: 'Overview' },
        { id: 'users', icon: 'group', label: 'Directory' },
        { id: 'courses', icon: 'school', label: 'Curriculum' },
        { id: 'settings', icon: 'settings', label: 'Settings' }
      ]
    : role === 'TEACHER'
    ? [
        { id: 'home', icon: 'school', label: 'Classes' },
        { id: 'schedule', icon: 'calendar_today', label: 'Events' },
        { id: 'chat', icon: 'chat_bubble', label: 'Assistant' },
        { id: 'profile', icon: 'person', label: 'Me' }
      ]
    : [
        { id: 'home', icon: 'house', label: 'Home' },
        { id: 'courses', icon: 'book_2', label: 'Courses' },
        { id: 'chat', icon: 'robot_2', label: 'AI Helper' },
        { id: 'profile', icon: 'person', label: 'Profile' }
      ];

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col max-w-[480px] mx-auto bg-white dark:bg-slate-900 shadow-premium overflow-hidden ring-1 ring-slate-200 dark:ring-slate-800">
      <main className="flex-1 overflow-y-auto no-scrollbar pb-32">
        {children}
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 w-full max-w-[480px] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 pb-safe pt-3 px-8 flex justify-between items-center z-50 h-[90px]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange?.(tab.id)}
            className={`flex flex-col items-center gap-1.5 transition-all duration-300 relative ${
              activeTab === tab.id ? 'text-primary' : 'text-slate-400 dark:text-slate-500'
            }`}
          >
            <span className={`material-symbols-outlined text-[24px] ${activeTab === tab.id ? 'filled scale-110' : ''}`}>
              {tab.icon}
            </span>
            <span className={`text-[10px] font-semibold tracking-wide ${activeTab === tab.id ? 'opacity-100' : 'opacity-70'}`}>
              {tab.label}
            </span>
            {activeTab === tab.id && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_rgba(19,127,236,0.6)]" />
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
