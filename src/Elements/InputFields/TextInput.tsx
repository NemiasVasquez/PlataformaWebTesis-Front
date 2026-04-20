import React from 'react';
import { cn } from '../../lib/utils';
import { Input } from '../../Components/input';
import { Eye, EyeOff } from 'lucide-react';

interface TextInputProps {
    type: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus: () => void;
    onBlur: () => void;
    placeholder: string;
    maxLength?: number;
    required?: boolean;
    disabled?: boolean;
    textColor?: string;
    showPassword?: boolean;
    setShowPassword?: (v: boolean | ((prev: boolean) => boolean)) => void;
}

export const TextInput: React.FC<TextInputProps> = ({
    type, value, onChange, onFocus, onBlur, placeholder, maxLength, required, disabled, textColor, showPassword, setShowPassword
}) => {
    const renderType = type === 'password' && showPassword ? 'text' : type;
    
    return (
        <div className="relative w-full">
            <Input
                type={renderType} value={value || ''} onChange={onChange} onFocus={onFocus} onBlur={onBlur}
                placeholder={placeholder} maxLength={type !== 'date' ? maxLength : undefined}
                required={required} disabled={disabled}
                className={cn(
                    'font-semibold w-full border rounded p-2 pr-10 placeholder-current focus:outline-none focus:ring-2 uppercase',
                    disabled ? 'bg-gray-200 text-gray-800 cursor-not-allowed border-gray-300' : 
                    required ? 'border-3 border-yellow-500 text-black focus:ring-blue-500' : 'border-black text-black focus:ring-blue-500',
                    textColor
                )}
            />
            {maxLength && type === 'text' && (
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500 pointer-events-none">
                    {(value as string)?.length || 0}/{maxLength}
                </span>
            )}
            {type === 'password' && setShowPassword && (
                <button
                    type="button" onClick={() => setShowPassword(p => !p)}
                    className={cn("absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-700", textColor)}
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            )}
        </div>
    );
};
