import { useMemo, useState, useEffect, useContext, useCallback, createContext } from 'react';
import {
  signOut,
  signInWithPopup,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { auth } from '../firebase/firebase';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('There is no Auth provider');
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = useCallback(
    (email, password) => signInWithEmailAndPassword(auth, email, password),
    []
  );

  const loginWithGoogle = useCallback(() => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  }, []);

  const logout = useCallback(() => signOut(auth), []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const contextValue = useMemo(
    () => ({
      login,
      user,
      logout,
      loading,
      loginWithGoogle,
    }),
    [user, loading, login, logout, loginWithGoogle]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
