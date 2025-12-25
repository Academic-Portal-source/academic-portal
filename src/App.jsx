import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  BookOpen, 
  Users, 
  Settings, 
  LogOut, 
  ChevronRight, 
  FileText, 
  Award,
  Upload,
  ShieldCheck,
  Search,
  CheckCircle2
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  onAuthStateChanged, 
  signInAnonymously, 
  signInWithCustomToken 
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  onSnapshot, 
  addDoc, 
  deleteDoc, 
  query 
} from 'firebase/firestore';

// --- Safe Environment Variable Access ---
// We wrap import.meta in a try-catch/check to prevent esbuild/bundler errors in older target environments
const getEnvVar = (key, fallback = '') => {
  try {
    // Check if import.meta and env exist before accessing
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      return import.meta.env[key] || fallback;
    }
  } catch (e) {
    // Fallback for environments where import.meta is restricted
  }
  return fallback;
};

// --- Firebase Configuration ---
const firebaseConfig = typeof __firebase_config !== 'undefined' 
  ? JSON.parse(__firebase_config) 
  : JSON.parse(getEnvVar('VITE_FIREBASE_CONFIG', '{}'));

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Use your custom App ID from env or the default for this session
const appId = typeof __app_id !== 'undefined' 
  ? __app_id 
  : getEnvVar('VITE_APP_ID', 'academic-portal-v4');

export default function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('landing'); // landing, student-login, faculty-login, dashboard, quiz, admin
  const [studentId, setStudentId] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  
  // Database State
  const [roster, setRoster] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [modules, setModules] = useState([]);
  const [results, setResults] = useState([]);
  
  // Loading & Auth
  const [isLoading, setIsLoading] = useState(true);

  // 1. Initialize Authentication
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (err) {
        console.error("Auth initialization failed", err);
      }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. Sync Real-time Data
  useEffect(() => {
    if (!user) return;

    const syncCollection = (name, setter) => {
      // Use the strictly structured paths required by the environment
      const q = collection(db, 'artifacts', appId, 'public', 'data', name);
      return onSnapshot(q, (snap) => {
        const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setter(data);
      }, (err) => console.error(`Error syncing ${name}:`, err));
    };

    const unsubs = [
      syncCollection('roster', setRoster),
      syncCollection('questions', setQuestions),
      syncCollection('modules', setModules),
      syncCollection('results', setResults)
    ];

    return () => unsubs.forEach(fn => fn());
  }, [user, appId]);

  // Actions
  const handleStudentLogin = () => {
    const found = roster.find(s => s.studentId?.trim().toUpperCase() === studentId.trim().toUpperCase());
    if (found) {
      setCurrentUser(found);
      setView('dashboard');
    } else {
      alert("ID not found. Please contact your instructor.");
    }
  };

  if (isLoading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('landing')}>
            <div className="bg-indigo-600 p-2 rounded-lg">
              <BookOpen className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">Portal<span className="text-indigo-600">Plus</span></span>
          </div>
          
          {currentUser ? (
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Student</p>
                <p className="text-sm font-semibold">{currentUser.studentId}</p>
              </div>
              <button 
                onClick={() => {setCurrentUser(null); setView('landing'); setStudentId('');}}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-400"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setView('faculty-login')}
              className="text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors"
            >
              Faculty Portal
            </button>
          )}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6">
        {view === 'landing' && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h1 className="text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
              Academic Excellence Starts Here.
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl mb-12">
              Access your assessments, learning modules, and progress tracking in one secure environment.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
              <button 
                onClick={() => setView('student-login')}
                className="bg-white border-2 border-slate-200 p-8 rounded-3xl hover:border-indigo-500 hover:shadow-xl transition-all group text-left"
              >
                <div className="bg-indigo-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-indigo-600 transition-colors">
                  <Users className="text-indigo-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold mb-1">Student Login</h3>
                <p className="text-slate-500 text-sm">Access your assigned classwork and exams.</p>
              </button>
              
              <button 
                onClick={() => setView('faculty-login')}
                className="bg-white border-2 border-slate-200 p-8 rounded-3xl hover:border-slate-900 hover:shadow-xl transition-all group text-left"
              >
                <div className="bg-slate-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-slate-900 transition-colors">
                  <ShieldCheck className="text-slate-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold mb-1">Faculty Access</h3>
                <p className="text-slate-500 text-sm">Manage curriculum and track performance.</p>
              </button>
            </div>
          </div>
        )}

        {view === 'student-login' && (
          <div className="max-w-md mx-auto py-20">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200 text-center">
              <h2 className="text-2xl font-bold mb-6">Enter Admission ID</h2>
              <input 
                autoFocus
                type="text"
                placeholder="Ex: STU-101"
                className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white p-4 rounded-2xl text-center text-xl font-bold uppercase tracking-widest transition-all mb-4 outline-none"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleStudentLogin()}
              />
              <button 
                onClick={handleStudentLogin}
                className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl hover:bg-indigo-700 transition-all"
              >
                Launch Portal
              </button>
              <button 
                onClick={() => setView('landing')}
                className="mt-6 text-sm text-slate-400 font-medium"
              >
                Go Back
              </button>
            </div>
          </div>
        )}

        {view === 'faculty-login' && (
          <div className="max-w-md mx-auto py-20">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200 text-center">
              <h2 className="text-2xl font-bold mb-2">Faculty Security</h2>
              <p className="text-slate-400 text-sm mb-6">Enter master authorization key</p>
              <input 
                autoFocus
                type="password"
                placeholder="••••••••"
                className="w-full bg-slate-50 border-2 border-transparent focus:border-slate-900 focus:bg-white p-4 rounded-2xl text-center text-xl transition-all mb-4 outline-none"
                onKeyPress={(e) => {
                  if(e.key === 'Enter' && e.target.value === 'admin123') setView('admin');
                  else if(e.key === 'Enter') alert('Access Denied');
                }}
              />
              <p className="text-[10px] text-slate-300 font-bold uppercase tracking-tighter">Default Key: admin123</p>
              <button 
                onClick={() => setView('landing')}
                className="mt-6 text-sm text-slate-400 font-medium"
              >
                Go Back
              </button>
            </div>
          </div>
        )}

        {view === 'dashboard' && currentUser && (
          <div className="space-y-12">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block">
                  Class Tier {currentUser.class}
                </span>
                <h1 className="text-4xl font-extrabold tracking-tight">Welcome, {currentUser.studentId}</h1>
              </div>
              <div className="flex gap-4">
                <div className="bg-white px-6 py-3 rounded-2xl border border-slate-200">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Assessments Done</p>
                  <p className="text-xl font-bold text-indigo-600">
                    {results.filter(r => r.studentId === currentUser.studentId).length}
                  </p>
                </div>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div 
                onClick={() => setView('quiz')}
                className="bg-white p-8 rounded-[2.5rem] border border-slate-200 hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer group"
              >
                <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mb-6">
                  <FileText className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Main Assessment</h3>
                <p className="text-slate-500 mb-6">Complete your evaluation for Class {currentUser.class}.</p>
                <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                  Start Assessment <ChevronRight className="w-4 h-4" />
                </div>
              </div>

              {modules.filter(m => m.classTier === currentUser.class).map(m => (
                <div 
                  key={m.id}
                  className="bg-white p-8 rounded-[2.5rem] border border-slate-200 hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer group"
                >
                  <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center text-white mb-6">
                    <BookOpen className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 truncate">{m.title}</h3>
                  <p className="text-slate-500 mb-6">Learning Resource</p>
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                    Open Module <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'quiz' && (
          <QuizUI 
            questions={questions.filter(q => q.classTier === currentUser.class)}
            currentUser={currentUser}
            onComplete={async (scoreData) => {
              await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'results'), {
                ...scoreData,
                timestamp: new Date().toISOString()
              });
              setView('dashboard');
            }}
            onCancel={() => setView('dashboard')}
          />
        )}

        {view === 'admin' && (
          <AdminPanel 
            roster={roster}
            questions={questions}
            modules={modules}
            results={results}
            onExit={() => setView('landing')}
            appId={appId}
          />
        )}
      </main>
    </div>
  );
}

function QuizUI({ questions, currentUser, onComplete, onCancel }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});

  if (questions.length === 0) return (
    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
      <h3 className="text-xl font-bold mb-2">No Questions Found</h3>
      <p className="text-slate-500 mb-6">Your instructor hasn't uploaded questions for Class {currentUser.class} yet.</p>
      <button onClick={onCancel} className="text-indigo-600 font-bold">Return to Dashboard</button>
    </div>
  );

  const currentQ = questions[currentIdx];

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      calculateScore();
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) correctCount++;
    });
    
    onComplete({
      studentId: currentUser.studentId,
      classTier: currentUser.class,
      score: correctCount,
      total: questions.length,
      percentage: Math.round((correctCount / questions.length) * 100)
    });
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100">
        <div className="flex justify-between items-center mb-8">
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">
            Question {currentIdx + 1} of {questions.length}
          </span>
          <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-600 transition-all" 
              style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-8">{currentQ.text}</h2>

        <div className="space-y-4 mb-10">
          {currentQ.options?.map((opt, i) => (
            <button 
              key={i}
              onClick={() => setAnswers({...answers, [currentIdx]: opt})}
              className={`w-full text-left p-5 rounded-2xl border-2 transition-all font-semibold flex items-center justify-between ${
                answers[currentIdx] === opt 
                ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                : 'border-slate-50 hover:bg-slate-50'
              }`}
            >
              {opt}
              {answers[currentIdx] === opt && <CheckCircle2 className="w-5 h-5" />}
            </button>
          ))}
        </div>

        <div className="flex justify-between">
          <button 
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx(currentIdx - 1)}
            className="px-6 py-3 rounded-xl font-bold text-slate-400 disabled:opacity-30"
          >
            Previous
          </button>
          <button 
            onClick={handleNext}
            disabled={!answers[currentIdx]}
            className="bg-slate-900 text-white px-10 py-3 rounded-xl font-bold hover:bg-indigo-600 disabled:bg-slate-200 transition-all"
          >
            {currentIdx === questions.length - 1 ? 'Finish' : 'Next Question'}
          </button>
        </div>
      </div>
    </div>
  );
}

function AdminPanel({ roster, questions, modules, results, onExit, appId }) {
  const [activeTab, setActiveTab] = useState('roster');
  const [newStudent, setNewStudent] = useState({ id: '', class: '1' });
  const [newQ, setNewQ] = useState({ text: '', options: ['', '', '', ''], correct: '', class: '1' });

  const addStudent = async () => {
    if (!newStudent.id) return;
    await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'roster'), {
      studentId: newStudent.id.toUpperCase(),
      class: newStudent.class
    });
    setNewStudent({ id: '', class: '1' });
  };

  const addQuestion = async () => {
    if (!newQ.text || !newQ.correct) return;
    await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'questions'), {
      text: newQ.text,
      options: newQ.options.filter(o => o.trim()),
      correctAnswer: newQ.correct,
      classTier: newQ.class
    });
    setNewQ({ text: '', options: ['', '', '', ''], correct: '', class: '1' });
  };

  const deleteItem = async (col, id) => {
    if (window.confirm("Permanently delete this item?")) {
      await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', col, id));
    }
  };

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
      <div className="flex border-b border-slate-100 bg-slate-50/50 overflow-x-auto">
        {[
          { id: 'roster', label: 'Roster', icon: Users },
          { id: 'curriculum', label: 'Curriculum', icon: BookOpen },
          { id: 'results', label: 'Results', icon: Award },
          { id: 'settings', label: 'Global', icon: Settings }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 sm:px-8 py-5 text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === tab.id ? 'bg-white text-indigo-600 border-t-2 border-indigo-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
        <button onClick={onExit} className="ml-auto px-6 sm:px-8 py-5 text-red-500 font-bold text-xs uppercase hover:bg-red-50">Exit</button>
      </div>

      <div className="p-4 sm:p-10">
        {activeTab === 'roster' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-xl font-bold mb-6">Active Student Roster</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roster.map(s => (
                  <div key={s.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div>
                      <p className="font-bold">{s.studentId}</p>
                      <p className="text-[10px] text-slate-400 font-black uppercase">Class {s.class}</p>
                    </div>
                    <button onClick={() => deleteItem('roster', s.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4">
              <h4 className="font-bold">Enroll Student</h4>
              <input 
                placeholder="Admission No" 
                className="w-full p-3 rounded-xl border-2 border-transparent focus:border-indigo-600 outline-none font-bold uppercase"
                value={newStudent.id}
                onChange={e => setNewStudent({...newStudent, id: e.target.value})}
              />
              <select 
                className="w-full p-3 rounded-xl border-2 border-transparent outline-none appearance-none bg-white font-semibold"
                value={newStudent.class}
                onChange={e => setNewStudent({...newStudent, class: e.target.value})}
              >
                {[1,2,3,4,5,6,7,8].map(c => <option key={c} value={String(c)}>Class {c}</option>)}
              </select>
              <button onClick={addStudent} className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all">
                Add to Roster
              </button>
            </div>
          </div>
        )}

        {activeTab === 'curriculum' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-4 max-h-[600px] overflow-y-auto pr-2">
              <h3 className="text-xl font-bold mb-6">Assessment Questions</h3>
              {questions.map(q => (
                <div key={q.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 relative group">
                  <span className="inline-block px-2 py-1 bg-white rounded-lg text-[10px] font-black text-indigo-600 uppercase mb-2">Class {q.classTier}</span>
                  <p className="font-bold text-lg pr-10">{q.text}</p>
                  <p className="text-emerald-600 text-xs font-bold mt-2 uppercase tracking-widest">Ans: {q.correctAnswer}</p>
                  <button onClick={() => deleteItem('questions', q.id)} className="absolute top-6 right-6 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 space-y-4 sticky top-0">
              <h4 className="font-bold">New Assessment Item</h4>
              <select 
                className="w-full p-3 rounded-xl border-2 border-transparent outline-none bg-white font-semibold text-sm"
                value={newQ.class}
                onChange={e => setNewQ({...newQ, class: e.target.value})}
              >
                {[1,2,3,4,5,6,7,8].map(c => <option key={c} value={String(c)}>Target Class {c}</option>)}
              </select>
              <textarea 
                placeholder="Question text..." 
                className="w-full p-4 rounded-xl border-2 border-transparent focus:border-indigo-600 outline-none font-medium h-32"
                value={newQ.text}
                onChange={e => setNewQ({...newQ, text: e.target.value})}
              />
              {newQ.options.map((opt, i) => (
                <input 
                  key={i}
                  placeholder={`Option ${i+1}`}
                  className="w-full p-2 text-sm rounded-lg border-2 border-transparent outline-none font-medium"
                  value={opt}
                  onChange={e => {
                    const next = [...newQ.options];
                    next[i] = e.target.value;
                    setNewQ({...newQ, options: next});
                  }}
                />
              ))}
              <input 
                placeholder="Correct Answer (Exact Match)" 
                className="w-full p-3 rounded-xl border-2 border-indigo-200 outline-none font-bold text-sm bg-indigo-50"
                value={newQ.correct}
                onChange={e => setNewQ({...newQ, correct: e.target.value})}
              />
              <button onClick={addQuestion} className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-indigo-600 transition-all">
                Publish Question
              </button>
            </div>
          </div>
        )}

        {activeTab === 'results' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Latest Performance Metrics</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">
                    <th className="py-4 px-2">Student ID</th>
                    <th className="py-4 px-2">Tier</th>
                    <th className="py-4 px-2">Score</th>
                    <th className="py-4 px-2">Percentage</th>
                    <th className="py-4 px-2">Date</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-semibold">
                  {results.sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp)).map(r => (
                    <tr key={r.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-2">{r.studentId}</td>
                      <td className="py-4 px-2">Class {r.classTier}</td>
                      <td className="py-4 px-2">{r.score}/{r.total}</td>
                      <td className={`py-4 px-2 ${r.percentage > 70 ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {r.percentage}%
                      </td>
                      <td className="py-4 px-2 text-slate-400 font-normal">
                        {new Date(r.timestamp).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-md space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-2">Cloud Status</h3>
              <p className="text-slate-500 text-sm mb-4">Instance: {appId}</p>
              <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                Live Database Connected
              </div>
            </div>
            
            <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100">
              <h4 className="font-bold text-amber-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> Danger Zone
              </h4>
              <p className="text-xs text-amber-700 mt-2 mb-6 leading-relaxed">
                Clearing data will remove all students and curriculum. Ensure you have backups.
              </p>
              <button 
                onClick={() => {
                  if(window.confirm("Are you sure? This deletes ALL data in this environment.")) {
                    roster.forEach(item => deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'roster', item.id)));
                    questions.forEach(item => deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'questions', item.id)));
                    results.forEach(item => deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'results', item.id)));
                  }
                }}
                className="text-[10px] font-black uppercase text-amber-900 bg-amber-200/50 px-4 py-2 rounded-lg hover:bg-amber-200"
              >
                Hard Reset Environment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}