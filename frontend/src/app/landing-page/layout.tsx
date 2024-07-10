'use client';

import { ReactNode } from 'react';

export default function LoginLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <header>
            </header>
            <main>{children}</main>
        </div>
    );
}