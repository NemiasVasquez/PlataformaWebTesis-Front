import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../lib/utils.ts';
import { LibreriaIconos } from '../Scripts/LibreriaIconos.jsx';

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 disabled:bg-gray-500 [&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
    {
        variants: {
            variant: {
                cancelar: 'bg-red-500 hover:bg-red-400 cursor-pointer text-white',
                secondary: 'bg-green-700 text-white shadow-xs hover:bg-green-600',
                optional: 'bg-blue-700 border-2 border-white text-white shadow-xs hover:bg-blue-600 cursor-pointer',
                gray: 'bg-gray-700 text-white shadow-xs hover:bg-gray-600',
                ghost: 'hover:bg-blue-600 hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline',
                success: 'bg-green-600 text-white hover:bg-green-500 border-2 border-white cursor-pointer',
                update: 'bg-green-600 text-white hover:bg-green-500 border-2 border-white cursor-pointer',
                none: '',
            },
            size: {
                default: 'h-9 px-4 py-2 has-[>svg]:px-3',
                sm: 'h-8 rounded-md px-3 has-[>svg]:px-2.5',
                lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
                xl: 'h-12 px-8 py-3 text-lg has-[>svg]:px-6 rounded-lg [&_svg]:w-6 [&_svg]:h-6',
                icon: 'size-9',
            },
        },
        defaultVariants: {
            variant: 'optional',
            size: 'default',
        },
    }
);

function Button({
    className,
    variant = 'optional',
    size = 'default',
    asChild = false,
    children,
    showIcon = true,
    iconName,
    ...props
}: React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
        showIcon?: boolean;
        iconName?: keyof typeof LibreriaIconos;
    }) {
    const Comp = asChild ? Slot : 'button';

    // Revisar si el children ya incluye un ícono
    const containsSVG = React.Children.toArray(children).some(
        child => React.isValidElement(child) && child.type === 'svg'
    );
    const containsPlus = React.Children.toArray(children).some(
        child => typeof child === 'string' && child.includes('+')
    );
    const containsImg = React.Children.toArray(children).some(
        child => React.isValidElement(child) && child.type === 'img'
    );

    const shouldShowSuccessIcon =
        variant === 'success' && !containsSVG && !containsPlus && !containsImg;

    // Obtener ícono de librería por prioridad
    const icon =
        showIcon && (iconName ? LibreriaIconos[iconName] : LibreriaIconos[variant] ?? (shouldShowSuccessIcon ? LibreriaIconos.success : null));

    const content = (
        <span className="inline-flex items-center gap-2">
            {icon}
            {children}
        </span>
    );

    return (
        <Comp
            data-slot="button"
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        >
            {content}
        </Comp>
    );
}

export { Button, buttonVariants };
