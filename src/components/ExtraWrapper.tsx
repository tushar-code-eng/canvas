"use client"

import { Provider } from 'react-redux';
import { store } from '../store/store';
import { SessionProvider } from 'next-auth/react';
export default function ReduxProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <SessionProvider>
                <Provider store={store} >
                    <body>
                        {children}
                    </body>
                </Provider>
            </SessionProvider>
        </html>
    );
}
