import * as React from 'react';

import { cn } from '../lib/utils.ts';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
    return (
        <input
            type={type}
            data-slot="input"
            className={cn(
                'font-semibold border-input file:text-foreground placeholder:text-muted-foreground flex h-9 w-full min-w-0 rounded-md border bg-white px-3 py-1 text-base text-black shadow-xs transition-[color,box-shadow] outline-none selection:text-black file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus:border-blue-500 disabled:cursor-not-allowed md:text-sm',
                '',
                'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
                className,
            )}
            {...props}
        />
    );
}

export { Input };
