import React from 'react';
import { cn } from '../../lib/utils';
import { LibreriaIconos } from '../../Scripts/LibreriaIconos';

interface FileInputProps {
    name: string;
    accept?: string;
    required?: boolean;
    disabled?: boolean;
    labelTexto: string;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    previewURL: string | null;
    widthFile?: string;
    heightFile?: string;
}

export const FileInput: React.FC<FileInputProps> = ({
    name, accept, required, disabled, labelTexto, fileInputRef, onChange, previewURL, widthFile, heightFile
}) => (
    <>
        <label
            htmlFor={name}
            className={cn(
                'inline-flex items-center justify-center gap-2 w-full rounded-lg border-2 py-2 font-semibold transition cursor-pointer',
                disabled ? 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-300' : 'bg-blue-600 hover:bg-blue-500 text-white border-white'
            )}
        >
            {LibreriaIconos.searsh}
            {labelTexto}
        </label>
        <input id={name} name={name} type="file" ref={fileInputRef} onChange={onChange} accept={accept} required={required} className="hidden" disabled={disabled} />
        {previewURL && (
            <div className="mt-2">
                {(name === 'img' || name === 'imagen') && (
                    <img src={previewURL} style={{ width: widthFile, height: heightFile }} alt="Previsualización" className="mx-auto object-fill border rounded" />
                )}
                {name === 'video' && (
                    <video style={{ width: widthFile, height: heightFile }} key={previewURL} controls className="mx-auto object-fill border rounded">
                        <source src={previewURL} type="video/mp4" />
                    </video>
                )}
            </div>
        )}
    </>
);
