import React from 'react';
import { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
    title: string;
    subtitle: string;
    icon: LucideIcon;
    iconBgColor?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, icon: Icon, iconBgColor = "bg-blue-600" }) => {
    return (
        <header className="flex items-center gap-3 mb-8 animate-in fade-in slide-in-from-left-4 duration-500">
            <div className={`p-3 ${iconBgColor} rounded-2xl shadow-lg shadow-blue-200 dark:shadow-none`}>
                <Icon className="text-white size-6" />
            </div>
            <div>
                <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none">
                    {title}
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                    {subtitle}
                </p>
            </div>
        </header>
    );
};
