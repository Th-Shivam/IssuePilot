import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../config/supabaseClient';

const AuthContext = createContext({});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signInWithGitHub = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: `${window.location.origin}/explore`
            }
        });
        if (error) console.error('Error signing in:', error);
    };

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.error('Error signing out:', error);
    };

    const value = {
        user,
        loading,
        signInWithGitHub,
        signOut
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
