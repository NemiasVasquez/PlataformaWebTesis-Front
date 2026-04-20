import React, { useState, useRef, useEffect } from 'react';
import { validarContenidoInput, ValidationType } from '../Scripts/Validations/FormatInput';
import toast from 'react-hot-toast';
import { cn } from '../lib/utils';
import { FileInput } from './InputFields/FileInput';
import { TextInput } from './InputFields/TextInput';
import { AutocompleteList } from './InputFields/AutocompleteList';

interface RenderInputProps {
    label?: string; name: string; widthFile?: string; heightFile?: string; value?: string | number;
    setForm: React.Dispatch<React.SetStateAction<Record<string, any>>>; maxLength?: number;
    validation?: ValidationType; type?: 'text' | 'file' | 'date' | 'password' | 'datetime-local' | 'time' | 'number';
    accept?: string; showLabel?: boolean; className?: string; maxSize?: number; required?: boolean;
    textColor?: string; bgLabelColor?: string; defaultURL?: string | null; disabled?: boolean;
    autocompleteData?: any[]; itemFiltrado?: string; onAutocompleteSelect?: (item: any) => void;
}

export const RenderInput: React.FC<RenderInputProps> = (props) => {
    const { label, name, value = '', setForm, maxLength = 100, validation = 'alfanumerico', type = 'text', accept, showLabel = false, widthFile, heightFile, className = '', maxSize = 3, required = false, textColor = 'text-black', bgLabelColor = 'bg-white', defaultURL, disabled = false, autocompleteData, itemFiltrado, onAutocompleteSelect } = props;
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [previewURL, setPreviewURL] = useState<string | null>(null);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredSuggestions, setFilteredSuggestions] = useState<any[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => { if (!previewURL && defaultURL) setPreviewURL(defaultURL + '?t=' + Date.now()); }, [defaultURL, previewURL]);
    useEffect(() => () => { if (previewURL) URL.revokeObjectURL(previewURL); }, [previewURL]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (type === 'file' && e.target.files?.[0]) {
            const file = e.target.files[0];
            const isValid = (accept || '').toLowerCase().split(',').some(a => file.type.includes(a.trim().replace('.','')) || file.name.toLowerCase().endsWith(a.trim()));
            if (!isValid) return toast.error('FORMATO NO PERMITIDO');
            if (file.size / 1024 / 1024 > maxSize) return toast.error('ARCHIVO MUY PESADO');
            setPreviewURL(URL.createObjectURL(file));
            setForm(p => ({ ...p, [name]: file }));
            return;
        }
        let val = e.target.value;
        if (autocompleteData && itemFiltrado) {
            const filt = autocompleteData.filter(i => i[itemFiltrado]?.toLowerCase().includes(val.toLowerCase()));
            setFilteredSuggestions(filt.slice(0, 8));
            setShowSuggestions(true);
            const match = filt.find(i => i[itemFiltrado]?.toLowerCase() === val.toLowerCase());
            if (match) onAutocompleteSelect?.(match);
        }
        val = (type === 'text' || type === 'password' || type === 'number') ? validarContenidoInput(val, validation, maxLength) : val;
        setForm(p => ({ ...p, [name]: val }));
    };

    const labelTexto = name === 'img' ? ' IMAGEN' : name === 'video' ? ' VIDEO' : label || ' ARCHIVO';

    return (
        <div className={cn('relative w-full', className)}>
            {showLabel && label && <label className={cn('block mb-1 text-sm font-medium', textColor)}>{label}</label>}
            {!showLabel && type !== 'file' && (
                <span className={cn('-mt-2 absolute left-2 z-10 top-1 text-xs px-1 transition-all', textColor, bgLabelColor, (focused || value !== '') ? 'opacity-100' : 'opacity-0')}>
                    {label}
                </span>
            )}
            {type === 'file' ? (
                <FileInput {...{ name, accept, required, disabled, labelTexto, fileInputRef, onChange: handleChange, previewURL, widthFile, heightFile }} />
            ) : (
                <TextInput {...{ type, value, onChange: handleChange, onFocus: () => { setFocused(true); if (autocompleteData) setShowSuggestions(true); }, onBlur: () => { setFocused(false); setTimeout(() => setShowSuggestions(false), 100); }, placeholder: (!showLabel && !focused && !value) ? label || '' : '', maxLength, required, disabled, textColor, showPassword, setShowPassword }} />
            )}
            {autocompleteData && showSuggestions && filteredSuggestions.length > 0 && (
                <AutocompleteList suggestions={filteredSuggestions} itemFiltrado={itemFiltrado!} onSelect={(s) => { setForm(p => ({ ...p, [name]: s[itemFiltrado!] })); setShowSuggestions(false); onAutocompleteSelect?.(s); }} />
            )}
        </div>
    );
};
