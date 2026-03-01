import React, { useState, useRef, useEffect } from 'react';
import { validarContenidoInput, ValidationType } from '../Scripts/Validations/FormatInput.tsx';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '../lib/utils.ts';
import { Input } from '../Components/input.tsx';
import { LibreriaIconos } from '../Scripts/LibreriaIconos.jsx';

interface RenderInputProps {
    label?: string;
    name: string;
    widthFile?: string;
    heightFile?: string;
    value?: string | number;
    setForm: React.Dispatch<React.SetStateAction<Record<string, any>>>;
    maxLength?: number;
    validation?: ValidationType;
    type?: 'text' | 'file' | 'date' | 'password' | 'datetime-local' | 'time';
    accept?: string;
    showLabel?: boolean;
    className?: string;
    maxSize?: number;
    required?: boolean;
    textColor?: string;
    bgLabelColor?: string;
    defaultURL?: string | null;
    disabled?: boolean;
    autocompleteData?: any[]; // lista de objetos sugeridos
    itemFiltrado?: string; // clave del objeto para filtrar y mostrar
    onAutocompleteSelect?: (item: any) => void; // 
}

export const RenderInput: React.FC<RenderInputProps> = ({
    label,
    name,
    value = '',
    setForm,
    maxLength = 100,
    validation = 'alfanumerico',
    type = 'text',
    accept,
    showLabel = false,
    widthFile,
    heightFile,
    className = '',
    maxSize = 3,
    required = false,
    textColor = 'text-black',
    bgLabelColor = 'bg-white',
    defaultURL,
    disabled = false,
    autocompleteData,
    itemFiltrado,
    onAutocompleteSelect
}) => {
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [previewURL, setPreviewURL] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (!previewURL && defaultURL) {
            const cacheBustedURL = defaultURL + '?t=' + new Date().getTime();
            setPreviewURL(cacheBustedURL);
        }
    }, [defaultURL, previewURL]);

    const handleSuggestionClick = (suggestion: any) => {
        setForm(prev => ({ ...prev, [name]: suggestion[itemFiltrado!] }));
        setShowSuggestions(false);
        onAutocompleteSelect?.(suggestion);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (type === 'file' && e.target.files) {
            const file = e.target.files[0];
            const acceptedTypes = (accept || '').split(',').map(a => a.trim().toLowerCase());

            const fileType = file.type.toLowerCase();
            const fileSizeMB = file.size / (1024 * 1024);

            const isValidType = acceptedTypes.some(accepted => {
                const ext = accepted.replace('.', '');
                return fileType.includes(ext) || file.name.toLowerCase().endsWith(ext);
            });

            if (!isValidType) {
                toast.error(`ARCHIVO NO PERMITIDO. FORMATOS: ${accept}`);
                setPreviewURL(null);
                setForm(prev => ({ ...prev, [name]: null }));
                if (fileInputRef.current) fileInputRef.current.value = '';
                return;
            }

            if ((name === 'img' || name === 'video') && fileSizeMB > maxSize) {
                toast.error(`${name.toUpperCase()} PESADO. HASTA ${maxSize}MB`);
                setPreviewURL(null);
                setForm(prev => ({ ...prev, [name]: null }));
                if (fileInputRef.current) fileInputRef.current.value = '';
                return;
            }

            if (previewURL) URL.revokeObjectURL(previewURL);
            const objectURL = URL.createObjectURL(file);
            setPreviewURL(objectURL);
            setForm(prev => ({ ...prev, [name]: file }));
            return;
        }

        let inputValue = e.target.value;

        if ((type === 'text' || type === 'number') && autocompleteData && itemFiltrado) {
            const filtered = autocompleteData.filter(item =>
                item[itemFiltrado]?.toLowerCase().includes(inputValue.toLowerCase())
            );

            setFilteredSuggestions(filtered.slice(0, 8));
            setShowSuggestions(true);

            const exactMatch = filtered.find(item =>
                item[itemFiltrado]?.toLowerCase() === inputValue.toLowerCase()
            );

            if (exactMatch && onAutocompleteSelect) {
                onAutocompleteSelect(exactMatch);
            }
        }

        inputValue = type === 'text' || type === 'number' || type === 'password' ? validarContenidoInput(inputValue, validation, maxLength) : inputValue;
        setForm(prev => ({ ...prev, [name]: inputValue }));
    };

    const showFloatingLabel = !showLabel && (focused || value !== '');
    const renderInputType = type === 'password' && showPassword ? 'text' : type;
    const labelTexto = name === 'img' ? ' IMAGEN' : name === 'video' ? ' VIDEO' : label || ' ARCHIVO';

    useEffect(() => {
        return () => {
            if (previewURL) URL.revokeObjectURL(previewURL);
        };
    }, [previewURL]);

    useEffect(() => {
        const input = fileInputRef.current;

        if (type === 'file' && input && !input.files?.[0] && previewURL) {
            setPreviewURL(null);
        }
    }, [fileInputRef.current?.files?.length, previewURL]);

    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredSuggestions, setFilteredSuggestions] = useState<any[]>([]);

    return (
        <div className={cn('relative w-full', className)}>
            {showLabel && label && (
                <label className={cn('block mb-1 text-sm font-medium', textColor)}>{label}</label>
            )}
            {!showLabel && type !== 'file' && (
                <span
                    className={cn(
                        '-mt-2 absolute left-2 z-10 top-1 text-xs px-1 transition-all duration-500 ease-in-out transform',
                        textColor,
                        bgLabelColor,
                        showFloatingLabel ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none'
                    )}
                >
                    {label}
                </span>
            )}
            <div>
                {type === 'file' ? (
                    <>
                        <label
                            htmlFor={name}
                            className={cn(
                                'inline-flex items-center justify-center gap-2 w-full rounded-lg border-2 py-2 font-semibold transition',
                                disabled
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-300'
                                    : 'bg-blue-600 hover:bg-blue-500 text-white border-white cursor-pointer'
                            )}
                        >
                            {LibreriaIconos.searsh}
                            {labelTexto}
                        </label>
                        <input
                            id={name}
                            name={name}
                            type="file"
                            ref={fileInputRef}
                            onChange={handleChange}
                            accept={accept}
                            required={required}
                            className="hidden"
                            disabled={disabled}
                        />
                        {previewURL && (
                            <div className="mt-2">
                                {(name === 'img' || name === 'imagen') && (
                                    <img src={previewURL} style={{ width: widthFile, height: heightFile }} alt="Previsualización" className="mx-auto object-fill border rounded" />
                                )}
                                {name === 'video' && (
                                    <video style={{ width: widthFile, height: heightFile }} key={previewURL} controls className="mx-auto object-fill border rounded">
                                        <source src={previewURL} type="video/mp4" />
                                        Tu navegador no soporta el video.
                                    </video>
                                )}
                            </div>
                        )}
                    </>
                ) : (
                    <div className="relative w-full">
                        <Input
                            type={renderInputType}
                            value={value || ''}
                            onChange={handleChange}
                            onFocus={() => {
                                setFocused(true);
                                autocompleteData && setShowSuggestions(true)
                            }}
                            onBlur={() => {
                                setFocused(false)
                                setTimeout(() => setShowSuggestions(false), 100)
                            }}
                            placeholder={!showLabel && !showFloatingLabel ? label : ''}
                            maxLength={type !== 'date' ? maxLength : undefined}
                            required={required}
                            disabled={disabled}
                            className={cn(
                                'font-semibold w-full border rounded p-2 pr-10 placeholder-current focus:outline-none focus:ring-2',
                                type !== 'file' && 'uppercase',
                                disabled
                                    ? 'bg-gray-200 bg-white text-gray-800 cursor-not-allowed border-gray-300'
                                    : required
                                        ? 'border-3 border-yellow-500 text-black focus:ring-blue-500 '
                                        : 'border-black text-black focus:ring-blue-500',
                                textColor
                            )}
                        />

                        {maxLength && type == 'text' && (
                            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500 pointer-events-none">
                                {value ? value.length : 0}/{maxLength}
                            </span>
                        )}
                    </div>

                )}
                {type === 'password' && (
                    <button
                        type="button"
                        className={cn("absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-gray-700", textColor)}
                        onClick={() => setShowPassword(prev => !prev)}
                        tabIndex={-1}
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                )}
            </div>
            {autocompleteData && showSuggestions && filteredSuggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow-md mt-1 max-h-40 overflow-y-auto text-sm">
                    {filteredSuggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onMouseDown={() => handleSuggestionClick(suggestion)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            {suggestion[itemFiltrado!]}
                        </li>
                    ))}
                </ul>
            )}

        </div>
    );
};
