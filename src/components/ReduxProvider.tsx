"use client"

import { Provider } from 'react-redux';
import { store } from '../store/store';
export default function ReduxProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <Provider store={store} >
                <body>
                    {children}
                </body>
            </Provider>
        </html>
    );
}
