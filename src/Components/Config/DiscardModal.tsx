import React from 'react';

interface DiscardModalProps {
    open: boolean;
    onClose: () => void;
    onDiscard: (razon: string) => void;
}

export const DiscardModal: React.FC<DiscardModalProps> = ({ open, onClose, onDiscard }) => {
    if (!open) return null;

    const razonesRechazo = [
        "Ojo cerrado", "Sin conjuntiva", "Efecto Blur", "Tamaño insuficiente",
        "Sin esclerotica", "Area insuficiente", "Posicion incorrecta", "Bloqueo pestanas"
    ];

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in zoom-in-95 duration-200">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl max-w-md w-full border dark:border-slate-800">
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4 uppercase italic">¿Por qué desterrar esta mancha?</h3>
                
                <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-2 
                    scrollbar-thin scrollbar-thumb-rose-500 scrollbar-track-slate-100 dark:scrollbar-track-slate-800">
                    {razonesRechazo.map(razon => (
                        <button
                            key={razon}
                            onClick={() => onDiscard(razon)}
                            className="w-full p-4 text-left text-xs font-bold bg-slate-100 dark:text-white dark:bg-slate-800 hover:bg-rose-100 dark:hover:bg-rose-900/30 hover:text-rose-600 dark:hover:text-rose-400 rounded-2xl border border-transparent hover:border-rose-300 transition-all uppercase tracking-wide"
                        >
                            {razon}
                        </button>
                    ))}
                </div>
                
                <div className="mt-6 flex justify-end">
                    <button 
                        onClick={onClose}
                        className="text-xs font-bold text-slate-400 hover:text-slate-600 uppercase"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};
