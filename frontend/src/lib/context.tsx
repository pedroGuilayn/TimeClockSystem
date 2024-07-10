import { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextProps {
    userId: number | null;
    setUserId: (id: number) => void;
    role: string | null;
    setRole: (role: string) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [userId, setUserId] = useState<number | null>(null);
    const [role, setRole] = useState<string | null>(null);

    return (
        <AppContext.Provider value={{ userId, setUserId, role, setRole }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};