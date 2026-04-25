import React from 'react';
import { Activity, LayoutDashboard, Settings, Sun, Moon } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

interface MainLayoutProps {
    children: React.ReactNode;
    dark: boolean;
    setDark: (val: boolean | ((prev: boolean) => boolean)) => void;
    currentView: 'dashboard' | 'config';
    onChangeView: (view: 'dashboard' | 'config') => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, dark, setDark, currentView, onChangeView }) => {
    return (
        <div className={dark ? 'dark' : ''}>
            <div className="min-h-screen bg-[#fafafa] dark:bg-slate-950 font-sans pb-20 transition-colors duration-300">
                <Toaster position="top-right" />
                
                <nav className="bg-white dark:bg-slate-900 border-b dark:border-slate-800 sticky top-0 z-50 px-6 py-4 transition-colors duration-300">
                    <div className="max-w-6xl mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onChangeView('dashboard')}>
                                <Activity className="text-rose-600" />
                                <span className="font-extrabold text-xl tracking-tight dark:text-white uppercase">
                                    Anemia<span className="text-rose-600 font-black">IA</span>
                                </span>
                            </div>

                            <div className="hidden sm:flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                                <NavButton 
                                    active={currentView === 'dashboard'} 
                                    onClick={() => onChangeView('dashboard')}
                                    icon={<LayoutDashboard className="size-3.5" />}
                                    label="Dashboard"
                                    activeColor="text-rose-600 dark:text-rose-400"
                                />
                                <NavButton 
                                    active={currentView === 'config'} 
                                    onClick={() => onChangeView('config')}
                                    icon={<Settings className="size-3.5" />}
                                    label="Config"
                                    activeColor="text-blue-600 dark:text-blue-400"
                                />
                            </div>
                        </div>

                        <button
                            onClick={() => setDark(prev => !prev)}
                            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors duration-200"
                        >
                            {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
                        </button>
                    </div>
                </nav>

                <main className="max-w-6xl mx-auto px-6 py-10 transition-all duration-500">
                    {children}
                </main>
            </div>
        </div>
    );
};

const NavButton = ({ active, onClick, icon, label, activeColor }: any) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-black transition-all uppercase tracking-tighter ${
            active 
                ? `bg-white dark:bg-slate-700 shadow-sm ${activeColor}` 
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
        }`}
    >
        {icon} {label}
    </button>
);
