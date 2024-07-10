'use client';

import { ReactNode } from 'react';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/client';
import client from '../lib/apollo-client';
import { AppProvider } from '@/lib/context';
import './styles/globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
        <body>
        <ApolloHooksProvider client={client}>
            <AppProvider>
                <html lang="en">
                <body>
                {children}
                </body>
                </html>
            </AppProvider>
        </ApolloHooksProvider>
        </body>
        </html>
    );
}